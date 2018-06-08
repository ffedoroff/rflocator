from rest_framework import viewsets, filters
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny

from rflocator.model.clientdata import ClientData
from rflocator.serializers import ClientDataSerializerFull, \
    ClientDataSerializerShort


@permission_classes((AllowAny, ))
class ClientDataViewSet(viewsets.ModelViewSet):
    queryset = ClientData.objects.all()
    serializer_class = ClientDataSerializerShort
    filter_backends = (filters.DjangoFilterBackend, filters.OrderingFilter,)
    ordering_fields = '__all__'
    filter_fields = ('created', 'devid')
