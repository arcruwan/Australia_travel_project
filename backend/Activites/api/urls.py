from django.contrib import admin
from django.urls import path, include,re_path
from Activites import views
from django.conf import settings
from django.conf.urls.static import static
# from .views import YourModelView

urlpatterns = [
    path('destination/', views.DestinationsApi),
    path('destination/<int:id>/', views.DestinationsApi),
    path('destination/Update/<int:id>/', views.DestinationUpdateApi),
    #  path('destinationsapi/', YourModelView.as_view(), name='destinations'),

    path('Activity/', views.ActivitiesApi),
    path('Activity/<int:id>/', views.ActivitiesApi),
    # path('saveImage/', views.saveFile),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


