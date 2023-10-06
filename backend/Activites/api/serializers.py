from rest_framework import serializers
from Activites.models import Destination,DestinationImages,DestinationTag,DestinationActivities,Activity,ActivityImages,ActivitytTag

class DestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = ('DestinationtId','DestinationTitle','DestinationLocation','DestinationDescription','DestinationDays','DestinationHours')


class DestinationImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = DestinationImages
        fields = ('DestinationImagetId','DestinationImagesName','DestinationtId')


class DestinationTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = DestinationTag
        fields = ('DestinationTagId','DestinationTagName','DestinationtId')


class DestinationActivitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = DestinationActivities
        fields = ('DestinationActivitiesId','DestinationActivitiesName','DestinationtId')


class ActivitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ('ActivitytId','ActivityTitle','ActivityLocation','ActivityCategory','ActivityType','ActivityPaymentDetails','ActivityPrice','ActivityDays','ActivityHours','ActivityDescription')


class ActivitiesImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityImages
        fields = ('ActivityImagetId','ActivityImagesName','ActivitytId')       


class ActivitytTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivitytTag
        fields = ('ActivitytTagId','ActivitytTagName','ActivitytId')      