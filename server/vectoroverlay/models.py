from django.db import models
from usermanager.models import UserAccount

class UploadedData(models.Model):
    videoFile = models.FileField(upload_to='uploads/', null=True)
    textFile = models.FileField(upload_to='uploads/', null=True)
    bodyWeight = models.DecimalField(max_digits=6,decimal_places=2, default=100)
    bodyWeightPerMeter = models.DecimalField(max_digits=5, decimal_places=2)
    flips = models.JSONField(default=list)
    forcePlateNames = models.JSONField(default=list)
    widthOfPlate = models.DecimalField(max_digits=5, decimal_places=2)
    lengthOfPlate = models.DecimalField(max_digits=5, decimal_places=2)
    samplingRate = models.DecimalField(max_digits=5, decimal_places=2)
    contactFrame = models.IntegerField(default=100)
    mode = models.CharField(max_length=10, default='combime')
    userID = models.ForeignKey(UserAccount, on_delete=models.CASCADE)

