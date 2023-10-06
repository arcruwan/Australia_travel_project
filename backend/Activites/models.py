from django.db import models

class Destination(models.Model):
    DestinationtId = models.AutoField(primary_key=True)
    DestinationTitle = models.CharField(max_length=500)
    DestinationLocation = models.CharField(max_length=500)
    DestinationDays = models.IntegerField(null=True, blank=True) 
    DestinationHours= models.IntegerField(null=True, blank=True) 
    DestinationDescription = models.TextField(null=True)


class DestinationImages(models.Model):
    DestinationImagetId = models.AutoField(primary_key=True)
    DestinationImagesName = models.ImageField(null=True, blank=True, upload_to='destinations/' )
    DestinationtId = models.ForeignKey(Destination, on_delete=models.CASCADE, to_field='DestinationtId', default=0)

class DestinationTag(models.Model):
    DestinationTagId = models.AutoField(primary_key=True)
    DestinationTagName = models.CharField(max_length=500)
    DestinationtId = models.ForeignKey(Destination, on_delete=models.CASCADE, to_field='DestinationtId', default=0)


class DestinationActivities(models.Model):
    DestinationActivitiesId = models.AutoField(primary_key=True)
    DestinationActivitiesName = models.CharField(max_length=500)
    DestinationtId = models.ForeignKey(Destination, on_delete=models.CASCADE, to_field='DestinationtId', default=0)


class Activity(models.Model):
    ActivitytId = models.AutoField(primary_key=True)
    ActivityTitle = models.CharField(max_length=500)
    ActivityLocation = models.CharField(max_length=500)
    ActivityCategory = models.CharField(max_length=500, null=True, blank=True) 
    ActivityType = models.CharField(max_length=500, null=True, blank=True) 
    ActivityPaymentDetails= models.CharField(max_length=500, null=True, blank=True) 
    ActivityPrice= models.CharField(max_length=500, null=True, blank=True) 
    ActivityDays = models.IntegerField(null=True, blank=True) 
    ActivityHours= models.IntegerField(null=True, blank=True) 
    ActivityDescription = models.TextField(null=True)


class ActivityImages(models.Model):
    ActivityImagetId = models.AutoField(primary_key=True)
    ActivityImagesName = models.ImageField(null=True, blank=True, upload_to='Activity/' )
    ActivitytId = models.ForeignKey(Activity, on_delete=models.CASCADE, to_field='ActivitytId', default=0)

class ActivitytTag(models.Model):
    ActivitytTagId = models.AutoField(primary_key=True)
    ActivitytTagName = models.CharField(max_length=500)
    ActivitytId = models.ForeignKey(Activity, on_delete=models.CASCADE, to_field='ActivitytId', default=0)