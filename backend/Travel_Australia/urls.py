
from django.contrib import admin
from django.urls import path, include,re_path



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('Activites.api.urls')),
    # re_path(r'^api/', include('Activites.api.urls')),
    
]
