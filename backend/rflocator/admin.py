from django.contrib import admin

from .model.clientdata import ClientData


class ClientDataAdmin(admin.ModelAdmin):
    list_display = ['ip', 'loc_lat', 'loc_acc', 'batt',
                    'ups', 'log', 'created']
    search_fields = ['ip', 'loc_lat', 'loc_lon', 'log']


admin.site.register(ClientData, ClientDataAdmin)
