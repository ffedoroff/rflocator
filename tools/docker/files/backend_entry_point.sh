#!/bin/bash
set -e

if [ ! -f /files/etc/first-run.flag ]; then
    echo "this is first run, so do migrations and load sample data"
    sleep 15
    python manage.py collectstatic --noinput
    python manage.py flush --noinput
    python manage.py migrate
    python manage.py loaddata fixture/users.json
    python manage.py loaddata fixture/rflocator.json
else
    echo "this is NOT first run"
fi
touch /files/etc/first-run.flag

echo "run django dev server"
python manage.py runserver 0.0.0.0:8000
