from rest_framework import serializers
from .models import *

class DataUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedData
        fields = '__all__'

    # def create(self, validated_data):
    #     # print(validated_data)
    #     videoFile = validated_data['videoFile']
    #     textFile = validated_data['textFile']

    #     videoFile = None
    #     textFile = None

    #     validated_data['videoFile'] = videoFile
    #     validated_data['textFile'] = textFile
    #     # validated_data['samplingRate'] = modified_sampling_rate
    #     # Call the superclass create method to save the data
    #     # validated_data['v']
    #     return super().create(validated_data)