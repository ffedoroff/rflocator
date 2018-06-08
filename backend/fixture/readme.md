
### Dump all
```
python manage.py dumpdata -a --indent 4 -e "admin.logentry" -e "sessions.session" > fixture/users.json
python manage.py dumpdata "rflocator.clientdata" --indent 4 > fixture/rflocator.json
```

### load all
```
source .venv/bin/activate
cd backend
python manage.py flush --noinput
python manage.py migrate
python manage.py loaddata fixture/users.json 
python manage.py loaddata fixture/rflocator.json
```
