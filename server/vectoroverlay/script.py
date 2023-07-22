import os
import sys
sys.path.append('C:\\USC_______2022-24\\BRL\\website\\server\\labcodes\\labcodes')

from ImportForce_TXT import ImportForce_TXT
from FindContactIntervals import FindContactIntervals
from findplate import findplate
from pixelratios import pix2m_fromplate, bw2pix
from dataconversion_force import convertdata
from VectorOverlay.vectoroverlay import vectoroverlay


file1_force = 'C:\\USC_______2022-24\\BRL\\website\\server\\labcodes\\labcodes\\sampleData\\5.5min_120Hz_SSRun_Fa19_Force.txt' 
file1_video = 'C:\\USC_______2022-24\\BRL\\website\\server\\labcodes\\labcodes\\sampleData\\5.5min_120Hz_SSRun_Fa19.MP4'
file1_vid_new = file1_video[:-4]+ '_OL.mp4'
fp1 = 'Attila49'
fp2 = 'Ryan52'
sampvid_f1 = 120
contactframe_f1 = 163-1 
data_f1_raw, samp, bw = ImportForce_TXT(file1_force)
ci_f1 = FindContactIntervals((data_f1_raw['Attila49 9286BA_Fz'] +data_f1_raw['Ryan52 9286BA_Fz']),samp,thresh=16)
data_f1 = {0: data_f1_raw.filter(regex = fp1).iloc[ci_f1['Start'][0]:ci_f1['End'][0],:],
        1: data_f1_raw.filter(regex = fp2).iloc[ci_f1['Start'][0]:ci_f1['End'][0],:]}
plate_area = findplate(file1_video ,framestart=0, label = 'Insert image here')
print("plate area:", type(plate_area.get(0)))
# print("type", type(plate_area))

# pix2m = pix2m_fromplate(plate_area, (0.9,0.6))
# mag2pix = bw2pix(pix2m['x'], bw, bwpermeter=2)

# flip = {0: ['fy', 'ax'],
#         1: ['fy', 'ax']}

# transform_data = convertdata(data_f1, mag2pix, pix2m, view='fy', mode='combined', platelocs=plate_area, flip=flip)

# transform_data.data2pix()

# data_pix_f1 = transform_data.data_fp

# vectoroverlay(file1_video, file1_vid_new, data_pix_f1, contactframe_f1, samp_force=samp, samp_video=sampvid_f1, dispthresh=2)

