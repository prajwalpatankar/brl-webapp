from rest_framework import generics
from .serializers import DataUploadSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import *
# from .script import create_vector_overlay

import pandas as pd
import os
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent
MEDIA = os.path.join(BASE_DIR, 'media')
UPLOADS = os.path.join(MEDIA, 'uploads')

from ImportForce_TXT import ImportForce_TXT
from FindContactIntervals import FindContactIntervals
from findplate import findplate
from pixelratios import pix2m_fromplate, bw2pix
from dataconversion_force import convertdata
from VectorOverlay.vectoroverlay import vectoroverlay


class DataUploader_Viweset(viewsets.ModelViewSet):
     serializer_class = DataUploadSerializer
     queryset = UploadedData.objects.all()
     # Use this if filtering of data is required
     # filterset_fields = ['samplingRate','userID']   

     def create(self, request, *args, **kwargs):
          # set up headers and other parameters to send back a response
          serializer = self.get_serializer(data=request.data)
          serializer.is_valid(raise_exception=True)
          self.perform_create(serializer)
          headers = self.get_success_headers(serializer.data)
     
          # # Alternate / easier method to get video url
          # video_file_post = request.POST.get('videoFile')

          # Set video paths
          file1_force = serializer.data.get('textFile')
          file1_video = serializer.data.get('videoFile')

          # Initilize number of force plates
          number_of_force_plates = 0
          # Get force plate data and update number of force plates
          forcePlateList = request.POST.getlist('forcePlateNames[]', [])
          if(forcePlateList == None):
               forcePlateList = request.POST.get('forcePlateNames', "")
               number_of_force_plates = 1
          else:
               number_of_force_plates = len(forcePlateList)

          # Get Sampling Rate
          sampvid_f1 = int(float(serializer.data.get('samplingRate')))
          
          # Get contact frame
          contactframe_f1 = serializer.data.get('contactFrame')

          # Import Force TXT
          data_f1_raw, samp, bw = ImportForce_TXT(file1_force)

          # Initialize input to FindContactInterval
          #    data_input_fci = data_f1_raw[ forcePlateList[0] + ' 9286BA_Fz' ]
          data_input_fci = data_f1_raw[ forcePlateList[0] + '_Fz']
          for i in range(1,number_of_force_plates):
               #    data_input_fci = data_input_fci + data_f1_raw[ forcePlateList[i] + ' 9286BA_Fz' ]
               data_input_fci = data_input_fci + data_f1_raw[ forcePlateList[i] +'_Fz']

          #  Call FindContactIntervals
          ci_f1 = FindContactIntervals(data_input_fci,samp,thresh=16)     
          
          # plate_area = findplate(file1_video ,framestart=0, label = 'Insert image here')
          # Below code replaces the need to call findplate()
          x = request.POST.getlist('endPointsX[]', [])
          y = request.POST.getlist('endPointsY[]', [])

          endPoints_x = []
          endPoints_y = []

          for val in x:
               endPoints_x.append(int(float(val)))

          for val in y:
               endPoints_y.append(int(float(val)))

          # Create a dataframe to add to dictionary
          plate_temp = pd.DataFrame((endPoints_x,endPoints_y)).rename(index={0: 'x', 1: 'y'})
          plate_area = {}
          # loop through number of plates
          for cnt in range(int(len(plate_temp.columns)/4)):
               plate_area[cnt] = plate_temp.iloc[:, (cnt*4):4*(cnt+1)]

          lengthOfPlate = float(serializer.data.get('lengthOfPlate'))
          widthOfPlate= float(serializer.data.get('widthOfPlate'))

          pix2m = pix2m_fromplate(plate_area, (lengthOfPlate,widthOfPlate))

          # Get Body Weight Per Meter
          bwpermeter = float(serializer.data.get('bodyWeightPerMeter'))

          mag2pix = bw2pix(pix2m['x'], bw, bwpermeter=bwpermeter)

          flip = {0: ['fy', 'ax'],
                    1: ['fy', 'ax']}

          # calculate data_f1 to pass to convertdata
          data_f1 = {}
          for i in range(number_of_force_plates):
               data_f1[i] = data_f1_raw.filter(regex = forcePlateList[i]).iloc[ci_f1['Start'][0]:ci_f1['End'][0],:]
          
          transform_data = convertdata(data_f1, mag2pix, pix2m, view='fy', mode='combined', platelocs=plate_area, flip=flip)

          transform_data.data2pix()

          data_pix_f1 = transform_data.data_fp

          # Set output path
          file1_vid_return = file1_video[:-4]+ '_OL.mp4'
          trunc_len = int(os.environ.get('TRUNCATE_LEN'))
          file1_vid_op = file1_vid_return[trunc_len:]
          file1_vid_op = os.path.join(UPLOADS, file1_vid_op)

          # Call vector Overlay
          vectoroverlay(file1_video, file1_vid_op, data_pix_f1, contactframe_f1, samp_force=samp, samp_video=sampvid_f1, dispthresh=2)
          
          return Response({'videoFileInput': file1_video, 'videoFileOutput': file1_vid_return}, status=status.HTTP_201_CREATED, headers=headers)