# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-28 13:24
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ClientData',
            fields=[
                ('id', models.AutoField(
                    auto_created=True, primary_key=True,
                    serialize=False, verbose_name='ID')),
                ('ip', models.GenericIPAddressField()),
                ('loc_lat', models.FloatField(blank=True, null=True,
                                              verbose_name='GPS Latitude')),
                ('loc_lon', models.FloatField(blank=True, null=True,
                                              verbose_name='GPS Longitude')),
                ('loc_acc', models.FloatField(blank=True, null=True,
                                              verbose_name='GPS Accuracy')),
                ('loc_tms', models.IntegerField(blank=True, null=True,
                                                verbose_name='GPS Fix Time')),
                ('loc_spd', models.FloatField(blank=True, null=True,
                                              verbose_name='GPS Speed')),
                ('loc_alt', models.FloatField(blank=True, null=True,
                                              verbose_name='GPS Altitude')),
                ('loc_network_lat', models.FloatField(
                    blank=True, null=True, verbose_name='Network Latitude')),
                ('loc_network_lon', models.FloatField(
                    blank=True, null=True, verbose_name='Network Longitude')),
                ('loc_network_acc', models.FloatField(
                    blank=True, null=True, verbose_name='Network Accuracy')),
                ('loc_network_tms', models.IntegerField(
                    blank=True, null=True, verbose_name='Network Fix Time')),
                ('cellid', models.CharField(
                    blank=True, max_length=200,
                    verbose_name='Network Cell Id')),
                ('cellsig', models.IntegerField(
                    blank=True, null=True,
                    verbose_name='Network Cell Signal')),
                ('times', models.IntegerField(
                    blank=True, null=True,
                    verbose_name='Device Time')),
                ('devid', models.CharField(
                    blank=True, max_length=200,
                    null=True, verbose_name='Device Id')),
                ('ups', models.IntegerField(
                    blank=True, null=True, verbose_name='Device Uptime')),
                ('batt', models.SmallIntegerField(
                    blank=True, null=True, verbose_name='Battery')),
                ('cpufreq', models.IntegerField(
                    blank=True, null=True, verbose_name='Cpu Freq')),
                ('qtime', models.IntegerField(
                    blank=True, null=True, verbose_name='Queue time')),
                ('source', models.CharField(
                    blank=True, max_length=100,
                    null=True, verbose_name='Source')),
                ('modified', models.DateTimeField(auto_now=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('log', models.TextField(blank=True, null=True)),
            ],
        ),
    ]
