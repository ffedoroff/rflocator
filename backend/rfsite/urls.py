from django.conf.urls import include, url
from django.contrib import admin
from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='rflocator API')

urlpatterns = [
    url(r'^api-auth/',
        include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/docs/', schema_view),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^tz_detect/', include('tz_detect.urls')),
    url(r'^', include('rflocator.urls')),
]
