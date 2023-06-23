from django.db import models
from usermanager.models import UserAccount

class UploadedData(models.Model):
    videoFile = models.FileField(upload_to='uploads/')
    textFile = models.FileField(upload_to='uploads/')
    bodyWeightPerMeter = models.DecimalField(max_digits=5, decimal_places=2)
    forcePlateNames = models.JSONField(default=list)
    heightOfPlate = models.DecimalField(max_digits=5, decimal_places=2)
    lengthOfPlate = models.DecimalField(max_digits=5, decimal_places=2)
    samplingRate = models.DecimalField(max_digits=5, decimal_places=2)
    userID = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    widthOfPlate = models.DecimalField(max_digits=5, decimal_places=2)

