# Generated by Django 3.2.20 on 2023-08-01 19:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vectoroverlay', '0009_alter_uploadeddata_forceplatenames'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='uploadeddata',
            name='heightOfPlate',
        ),
        migrations.AddField(
            model_name='uploadeddata',
            name='contactFrame',
            field=models.IntegerField(default=100),
        ),
    ]
