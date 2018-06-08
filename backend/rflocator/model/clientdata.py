from django.contrib.auth.models import User
from django.db import models
from django.db.models import DateTimeField, GenericIPAddressField


class ClientData(models.Model):
    class Meta:
        app_label = "rflocator"

    ip = GenericIPAddressField()
    user = models.ForeignKey(User)
    loc_lat = models.FloatField('GPS Latitude', blank=True, null=True)
    loc_lon = models.FloatField('GPS Longitude', blank=True, null=True)
    loc_acc = models.FloatField('GPS Accuracy', blank=True, null=True)
    loc_tms = models.IntegerField('GPS Fix Time', blank=True, null=True)
    loc_spd = models.FloatField('GPS Speed', blank=True, null=True)
    loc_alt = models.FloatField('GPS Altitude', blank=True, null=True)

    loc_network_lat = models.FloatField('Network Latitude', blank=True, null=True)
    loc_network_lon = models.FloatField('Network Longitude', blank=True, null=True)
    loc_network_acc = models.FloatField('Network Accuracy', blank=True, null=True)
    loc_network_tms = models.IntegerField('Network Fix Time', blank=True, null=True)

    cellid = models.CharField('Network Cell Id', blank=True, null=True, max_length=200)
    cellsig = models.IntegerField('Network Cell Signal', blank=True, null=True)
    times = models.IntegerField('Device Time', blank=True, null=True)
    devid = models.CharField('Device Id', max_length=200)
    ups = models.IntegerField('Device Uptime')
    batt = models.SmallIntegerField('Battery', blank=True, null=True)
    cpufreq = models.IntegerField('Cpu Freq', blank=True, null=True)
    qtime = models.IntegerField('Queue time', blank=True, null=True)
    source = models.CharField('Source', max_length=100)

    modified = DateTimeField(auto_now=True)
    created = DateTimeField(auto_now_add=True)
    log = models.TextField(null=True, blank=True)

    def __str__(self):
        return u"{0.created} {0.ip}".format(self)
