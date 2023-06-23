# Generated by Django 4.2.2 on 2023-06-23 21:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('vectoroverlay', '0002_delete_useraccount'),
    ]

    operations = [
        migrations.CreateModel(
            name='DataUploader',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('videoFile', models.FileField(upload_to='uploads/')),
                ('textFile', models.FileField(upload_to='uploads/')),
                ('bodyWeightPerMeter', models.DecimalField(decimal_places=2, max_digits=5)),
                ('forcePlateNames', models.JSONField(default=list)),
                ('heightOfPlate', models.DecimalField(decimal_places=2, max_digits=5)),
                ('lengthOfPlate', models.DecimalField(decimal_places=2, max_digits=5)),
                ('samplingRate', models.DecimalField(decimal_places=2, max_digits=5)),
                ('widthOfPlate', models.DecimalField(decimal_places=2, max_digits=5)),
                ('userID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
