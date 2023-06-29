from rest_framework import generics
from .serializers import DataUploadSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status


from .models import *

class DataUploader_Viweset(viewsets.ModelViewSet):
    serializer_class = DataUploadSerializer
    queryset = UploadedData.objects.all()
    # Use this if filtering of data is required
    # filterset_fields = ['samplingRate','userID']   

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        print(serializer.data.get('videoFile'))
        video_file_url = serializer.data.get('videoFile')
        return Response({'videoFile': video_file_url}, status=status.HTTP_201_CREATED, headers=headers)