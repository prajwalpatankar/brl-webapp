# Generated by Django 4.2.2 on 2023-06-26 19:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vectoroverlay', '0005_alter_uploadeddata_forceplatenames'),
    ]

    operations = [
        migrations.AlterField(
            model_name='uploadeddata',
            name='textFile',
            field=models.FileField(null=True, upload_to='uploads/'),
        ),
        migrations.AlterField(
            model_name='uploadeddata',
            name='videoFile',
            field=models.FileField(null=True, upload_to='uploads/'),
        ),
    ]