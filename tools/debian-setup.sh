#!/bin/sh
sudo apt-get update
sudo apt-get install tor python3-dev python-virtualenv libpq-dev tor libxml2-dev libxslt1-dev postgresql postgresql-contrib libcurl4-openssl-dev
echo "optionally you can setup:"
echo "sudo apt-get install uwsgi-core uwsgi-plugin-python nginx zabbix-agent supervisor s3cmd"
echo "don't forget to add into /etc/postgresql/9.x/main/pg_hba.conf:"
echo "local   all             all                                     trust"
echo "host    all             all             127.0.0.1/32            trust"
echo "then call:"
echo "sudo -u postgres createuser root -s"
echo "sudo -u postgres createuser www-data -s"
echo "psql postgres -c \"create database \\\"rflocator\\\"\""
echo "bash pip-setup.sh"
