# Generated by Django 4.1.10 on 2023-08-11 12:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Activites', '0008_destinationactivities'),
    ]

    operations = [
        migrations.CreateModel(
            name='Activity',
            fields=[
                ('ActivitytId', models.AutoField(primary_key=True, serialize=False)),
                ('ActivityTitle', models.CharField(max_length=500)),
                ('ActivityLocation', models.CharField(max_length=500)),
                ('ActivityCategory', models.CharField(blank=True, max_length=500, null=True)),
                ('ActivityPaymentDetails', models.CharField(blank=True, max_length=500, null=True)),
                ('ActivityDays', models.IntegerField(blank=True, null=True)),
                ('ActivityHours', models.IntegerField(blank=True, null=True)),
                ('DestinationDescription', models.TextField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='ActivitytTag',
            fields=[
                ('ActivitytTagId', models.AutoField(primary_key=True, serialize=False)),
                ('ActivitytTagName', models.CharField(max_length=500)),
                ('ActivitytId', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='Activites.activity')),
            ],
        ),
        migrations.CreateModel(
            name='ActivityImages',
            fields=[
                ('ActivityImagetId', models.AutoField(primary_key=True, serialize=False)),
                ('ActivityImagesName', models.ImageField(blank=True, null=True, upload_to='Activity/')),
                ('ActivitytId', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='Activites.activity')),
            ],
        ),
    ]
