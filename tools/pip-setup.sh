#!/bin/sh
cd ../
virtualenv --no-site-packages --distribute -p /usr/bin/python3 .venv
source .venv/bin/activate
pip install --upgrade pip
pip install --upgrade setuptools
pip install -r backend/requirements.txt

# pip freeze --local | grep -v '^\-e' | cut -d = -f 1  | xargs pip install -U

echo "after this you can switch to venv:"
echo " source .venv/bin/activate"
echo " cd backend/"
echo "then init database:"
echo " python manage.py migrate"
echo "then run server:"
echo " python manage.py runserver"
