# Generated by Django 4.1.10 on 2023-08-10 08:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Activites', '0005_delete_destinationactivities'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='destination',
            name='DestinationDays',
        ),
        migrations.RemoveField(
            model_name='destination',
            name='DestinationHours',
        ),
    ]