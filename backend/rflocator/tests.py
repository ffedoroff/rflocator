import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "rfsite.settings_tests")

from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase
# from rfsite.settings_tests import * # noqa
from django.contrib.auth.models import User


class ClientDataTest(APITestCase):
    def setUp(self):
        self.superuser = User.objects.\
            create_superuser('john', 'john@snow.com', 'johnpassword')
        self.client.login(username='john', password='johnpassword')
        self.superuser_data = {
            'username': 'mike',
            'first_name': 'Mike',
            'last_name': 'Tyson'
        }
        print("test setup complete")

    def test_upload(self):
        response = self.client.post(
            reverse('api_clientdata_upload'),
            {
                "ip": "213.87.123.108",
                "qtime": 11,
                "batt": 100,
                "loc_network_tms": 1487680683,
                "loc_tms": 1487680692,
                "loc_alt": 90.9000015258789,
                "DEVID": "34DFG",
                "source": "TIMER",
                "loc_lon": 73.44711073,
                "loc_spd": 3.25,
                "cellsig": 8,
                "loc_acc": 5.0,
                "loc_network_acc": 52.0,
                "cellid": "GSM:1005.127437151",
                "times": 1487680692,
                "loc_network_lat": 54.969629,
                "created": "2017-02-21T12:38:14.986Z",
                "modified": "2017-02-21T12:38:14.986Z",
                "loc_lat": 54.96993852,
                "cpufreq": 600000,
                "loc_network_lon": 73.4461753,
                "UPS": 426715
            })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
