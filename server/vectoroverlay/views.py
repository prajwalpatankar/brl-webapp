from rest_framework import generics
from .serializers import DataUploadSerializer
from rest_framework import viewsets


from .models import *

class DataUploader_Viweset(viewsets.ModelViewSet):
    serializer_class = DataUploadSerializer
    queryset = UploadedData.objects.all()
    # Use this if filtering of data is required
    # filterset_fields = ['samplingRate','userID']   