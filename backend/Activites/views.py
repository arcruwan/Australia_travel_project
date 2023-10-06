from django.shortcuts import render

from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http import JsonResponse
import uuid
from Activites.models import Destination,DestinationImages,DestinationTag,DestinationActivities,ActivityImages,ActivitytTag,Activity
from Activites.api.serializers import DestinationSerializer,DestinationImageSerializer,DestinationTagSerializer,DestinationActivitiesSerializer,ActivitiesSerializer,ActivitiesImageSerializer,ActivitytTagSerializer
from django.core.files.storage import default_storage
from rest_framework.status import HTTP_200_OK, HTTP_404_NOT_FOUND,HTTP_400_BAD_REQUEST

@csrf_exempt
def DestinationsApi(request, id=0):
    if request.method == 'GET':
        if id == 0:
            destinations = Destination.objects.prefetch_related('destinationimages_set', 'destinationtag_set', 'destinationactivities_set').all()
            response_data = []
            for destination in destinations:
                destination_serializer = DestinationSerializer(destination)
                images_serializer = DestinationImageSerializer(destination.destinationimages_set.all(), many=True)
                tags_serializer = DestinationTagSerializer(destination.destinationtag_set.all(), many=True)
                Activites_serializer = DestinationActivitiesSerializer(destination.destinationactivities_set.all(), many=True)

                response_data.append({
                    'destination': destination_serializer.data,
                    'images': images_serializer.data,
                    'tags': tags_serializer.data,
                    'Activites': Activites_serializer.data,
                 # Corrected field name
                })

            return JsonResponse(response_data, safe=False)
        else:
            try:
                destination = Destination.objects.get(DestinationtId=id)
            except Destination.DoesNotExist:
                return JsonResponse({'error': 'Destination not found'}, status=404)

            destination_serializer = DestinationSerializer(destination)
            destination_images = destination.destinationimages_set.all()
            images_serializer = DestinationImageSerializer(destination_images, many=True)
            destination_tags = destination.destinationtag_set.all()
            tags_serializer = DestinationTagSerializer(destination_tags, many=True)
            destination_Activities = destination.destinationactivities_set.all()
            Activities_serializer = DestinationActivitiesSerializer(destination_Activities, many=True)


            response_data = {
                'destination': destination_serializer.data,
                'images': images_serializer.data,
                'tags': tags_serializer.data,
                'Activities': Activities_serializer.data,   
 
            }

            return JsonResponse(response_data, safe=False)
    elif request.method == 'POST':
        # Get form data
        destination_data = {
            'DestinationTitle': request.POST.get('DestinationTitle'),
            'DestinationLocation': request.POST.get('DestinationLocation'),
            'DestinationDescription': request.POST.get('DestinationDescription'),
            'DestinationDays': request.POST.get('DestinationDays'),
            'DestinationHours': request.POST.get('DestinationHours'),

        }
        destination_serializer = DestinationSerializer(data=destination_data)
        if destination_serializer.is_valid():
            # Save the Destination model
            destination_instance = destination_serializer.save()

            # Get the uploaded files
            files = request.FILES.getlist('file')
            if files:
                for file in files:
                    # Generate a unique filename using UUID and the original file extension
                    unique_filename = f"{uuid.uuid4().hex}{file.name[file.name.rfind('.'):]}"
                    file_name = default_storage.save(f"destinations/{unique_filename}", file)

                    # Create an instance of the DestinationImages model to save each image
                    instance = DestinationImages(DestinationImagesName=file_name, DestinationtId=destination_instance)
                    instance.save()

            tag_list = request.POST.getlist('DestinationTagName')  # Assuming 'tags' is a list of tag IDs
            if tag_list:
                for tag_name in tag_list:
                    tag_instance = DestinationTag(DestinationTagName=tag_name, DestinationtId=destination_instance)
                    tag_instance.save()

            Activities_list = request.POST.getlist('DestinationActivitiesName')  # Assuming 'tags' is a list of tag IDs
            if Activities_list:
                for Activities_name in Activities_list:
                    Activities_instance = DestinationActivities(DestinationActivitiesName=Activities_name, DestinationtId=destination_instance)
                    Activities_instance.save()

     

            return JsonResponse({"message": "Data saved successfully"}, status=201)

        # If the form data is not valid, return the validation errors
        return JsonResponse(destination_serializer.errors, status=400)
    
    elif request.method == 'DELETE':
        Destinations = Destination.objects.get(DestinationtId=id)
        Destinations.delete()
        return JsonResponse({"message": "Data Delete successfully"}, status=201)


@csrf_exempt
def DestinationUpdateApi(request, id=0):
    if request.method == 'POST':
        try:
            destination = Destination.objects.get(DestinationtId=id)
        except Destination.DoesNotExist:
            return JsonResponse({'error': 'Destination not found'}, status=HTTP_404_NOT_FOUND)

        destination_data = {
            'DestinationTitle': request.POST.get('DestinationTitle', destination.DestinationTitle),
            'DestinationLocation': request.POST.get('DestinationLocation', destination.DestinationLocation),
            'DestinationDescription': request.POST.get('DestinationDescription', destination.DestinationDescription),
            'DestinationDays': request.POST.get('DestinationDays', destination.DestinationDays),
            'DestinationHours': request.POST.get('DestinationHours', destination.DestinationHours),
        }

        destination_serializer = DestinationSerializer(destination, data=destination_data)
        if destination_serializer.is_valid():
            destination_instance = destination_serializer.save()

            files = request.FILES.getlist('file')
            if files:
                for file in files:
                    unique_filename = f"{uuid.uuid4().hex}{file.name[file.name.rfind('.'):]}"
                    file_name = default_storage.save(f"destinations/{unique_filename}", file)
                    instance = DestinationImages(DestinationImagesName=file_name, DestinationtId=destination_instance)
                    instance.save()

            tag_list = request.POST.getlist('DestinationTagName')
            if tag_list:
                destination.destinationtag_set.all().delete()
                for tag_name in tag_list:
                    tag_instance = DestinationTag(DestinationTagName=tag_name, DestinationtId=destination_instance)
                    tag_instance.save()

            activities_list = request.POST.getlist('DestinationActivitiesName')
            if activities_list:
                destination.destinationactivities_set.all().delete()
                for activities_name in activities_list:
                    activities_instance = DestinationActivities(DestinationActivitiesName=activities_name, DestinationtId=destination_instance)
                    activities_instance.save()

            return JsonResponse({"message": "Data updated successfully"}, status=HTTP_200_OK)
        else:
            return JsonResponse(destination_serializer.errors, status=HTTP_400_BAD_REQUEST)





@csrf_exempt
def ActivitiesApi(request, id=0):
    if request.method == 'GET':
        if id == 0:
            Activities = Activity.objects.prefetch_related('activityimages_set', 'activityttag_set').all()
            response_data = []
            for activity in Activities:
                Activities_serializer = ActivitiesSerializer(activity)
                images_serializer = ActivitiesImageSerializer(activity.activityimages_set.all(), many=True)
                tags_serializer = ActivitytTagSerializer(activity.activityttag_set.all(), many=True)
                response_data.append({
                    'Activities': Activities_serializer.data,
                    'images': images_serializer.data,
                    'tags': tags_serializer.data,
                 # Corrected field name
                })

            return JsonResponse(response_data, safe=False)
        else:
            try:
                Activities = Activity.objects.get(ActivitytId=id)
            except Activities.DoesNotExist:
                return JsonResponse({'error': 'Destination not found'}, status=404)

            Activities_serializer = ActivitiesSerializer(Activities)
            Activities_images = Activities.activityimages_set.all()
            images_serializer = ActivitiesImageSerializer(Activities_images, many=True)
            Activities_tags = Activities.activityttag_set.all()
            tags_serializer = ActivitytTagSerializer(Activities_tags, many=True)



            response_data = {
                'Activities': Activities_serializer.data,
                'images': images_serializer.data,
                'tags': tags_serializer.data,
 
            }

            return JsonResponse(response_data, safe=False)
    
    if request.method == 'POST':
        # Get form data
        Activity_data = {
            'ActivityTitle': request.POST.get('ActivityTitle'),
            'ActivityLocation': request.POST.get('ActivityLocation'),
            'ActivityCategory': request.POST.get('ActivityCategory'),
            'ActivityType': request.POST.get('ActivityType'),
            'ActivityPaymentDetails': request.POST.get('ActivityPaymentDetails'),
            'ActivityPrice': request.POST.get('ActivityPrice'),           
            'ActivityDays': request.POST.get('ActivityDays'),
            'ActivityHours': request.POST.get('ActivityHours'),
            'ActivityDescription': request.POST.get('ActivityDescription'),
        }
        Activity_serializer = ActivitiesSerializer(data=Activity_data)
        if Activity_serializer.is_valid():
            # Save the Destination model
            Activity_instance = Activity_serializer.save()

            # Get the uploaded files
            files = request.FILES.getlist('file')
            if files:
                for file in files:
                    # Generate a unique filename using UUID and the original file extension
                    unique_filename = f"{uuid.uuid4().hex}{file.name[file.name.rfind('.'):]}"
                    file_name = default_storage.save(f"Activity/{unique_filename}", file)

                    # Create an instance of the DestinationImages model to save each image
                    instance = ActivityImages(ActivityImagesName=file_name, ActivitytId=Activity_instance)
                    instance.save()

            tag_list = request.POST.getlist('ActivitytTagName')  # Assuming 'tags' is a list of tag IDs
            if tag_list:
                for tag_name in tag_list:
                    tag_instance = ActivitytTag(ActivitytTagName=tag_name, ActivitytId=Activity_instance)
                    tag_instance.save()
    
            return JsonResponse({"message": "Data saved successfully"}, status=201)

        # If the form data is not valid, return the validation errors
        return JsonResponse(Activity_serializer.errors, status=400)



# def DestinationsApi(request, id=0):
#     if request.method == 'GET':
#         if id == 0:
#             Destinations = Destination.objects.all()
#         else:
#             try:
#                 Destinations = Destination.objects.get(DestinationtId=id)
#             except Destination.DoesNotExist:
#                 return JsonResponse({'error': 'Destination not found'}, status=404)
        
#         Destination_serializer = DestinationSerializer(Destinations, many=not isinstance(Destinations, Destination))
#         return JsonResponse(Destination_serializer.data, safe=False)
#     elif request.method == 'POST':
#         Destination_data = JSONParser().parse(request)
#         Destination_serializer = DestinationSerializer(data=Destination_data)
#         if Destination_serializer.is_valid():
#             Destination_serializer.save()
#             return JsonResponse({"message": "Data saved successfully"}, status=201)
#         return JsonResponse(Destination_serializer.errors, status=400)
#     elif request.method == 'DELETE':
#         Destinations = Destination.objects.get(DestinationtId=id)
#         Destinations.delete()
#         return JsonResponse({"message": "Data Delete successfully"}, status=201)
    

# @csrf_exempt

# def saveFile(request):
#     file = request.FILES.get('file')
#     if file:
#         # Generate a unique filename using UUID and the original file extension
#         unique_filename = f"{uuid.uuid4().hex}{file.name[file.name.rfind('.'):]}"
#         file_name = default_storage.save(f"destinations/{unique_filename}", file)
#         instance = DestinationImages(DestinationImagesName=file_name)
#         instance.save()
#         return JsonResponse({'status': 'success', 'file_name': file_name})
#     else:
#         return JsonResponse({'status': 'failure', 'message': 'No file found in the request'}, status=400)