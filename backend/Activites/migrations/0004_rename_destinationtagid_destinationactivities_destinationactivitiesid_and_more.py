# Generated by Django 4.1.10 on 2023-08-10 08:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Activites', '0003_destination_destinationdays_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='destinationactivities',
            old_name='DestinationTagId',
            new_name='DestinationActivitiesId',
        ),
        migrations.RemoveField(
            model_name='destinationactivities',
            name='DestinationActivities',
        ),
        migrations.AddField(
            model_name='destinationactivities',
            name='DestinationActivitiesName',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
