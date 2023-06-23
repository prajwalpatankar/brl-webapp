from rest_framework import serializers
from .models import *

class DataUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedData
        fields = '__all__'