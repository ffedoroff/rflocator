from rest_framework import serializers

from .model.clientdata import ClientData


class ClientDataSerializerShort(serializers.ModelSerializer):
    class Meta:
        model = ClientData
        fields = ('id', 'created', 'loc_lat', 'loc_lon', 'loc_acc', 'loc_spd',
                  'source', 'ups', 'batt')


class ClientDataSerializerFull(serializers.ModelSerializer):
    class Meta:
        model = ClientData
        fields = '__all__'
