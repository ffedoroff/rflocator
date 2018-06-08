from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from rflocator.views import api_upload, clientdata
from rfsite.settings import DEBUG

router = DefaultRouter()
router.register(r'clientdata', clientdata.ClientDataViewSet)

urlpatterns = [
    url(r'^api/clientdata/upload/$',
        api_upload.api_clientdata_upload,
        name='api_clientdata_upload'),
    url(r'^api/', include(router.urls)),
]

if DEBUG:
    # for development mode, we should server static files
    # directly from frontend folder
    from rflocator.views.dev_server import dev_static_files

    urlpatterns += [
        url('', dev_static_files),
        # url(r'static', dev_static_files),
    ]
