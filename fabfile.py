import inspect
import os
from contextlib import contextmanager as _contextmanager

from fabric.api import cd, env, prefix, local, run, lcd, get, put, settings

env.hosts = ['name@server.com:port']
base_path = '/var/www/rflocator'
backend_path = base_path + "/backend"
frontend_path = base_path + "/frontend"
db_name = 'rflocator'
local_path = os.path.dirname(os.path.abspath(
    inspect.getfile(inspect.currentframe())))


@_contextmanager
def virtualenv():
    venv_path = base_path + "/.venv"
    with cd(base_path):
        with prefix('source ' + venv_path + '/bin/activate'):
            yield


def get_db():
    with lcd(local_path):
        local('rm -f {0} {0}.gz'.format(db_name))
    with cd(base_path):
        run('rm -f {0}.gz'.format(db_name))
        run('pg_dump -Fc --no-owner {0} | gzip > {0}.gz'.format(db_name))
        run('ls -lh {0}.gz'.format(db_name))
        get('{0}.gz'.format(db_name), '{0}/{1}.gz'.format(local_path, db_name))
        run('rm -f {0}.gz'.format(db_name))
    with lcd(local_path):
        local('gunzip {0}.gz'.format(db_name))
        local('psql postgres -c "SELECT pg_terminate_backend(pid) '
              'FROM pg_stat_activity WHERE datname=\'{0}\'"'.format(db_name))
        local('psql postgres -c "'
              'drop database IF EXISTS \\"{0}\\""'.format(db_name))
        local('psql postgres -c "'
              'create database \\"{0}\\""'.format(db_name))
        local('pg_restore -Fc --no-owner --dbname {0} {0}'.format(db_name))
        local('rm -f {0} {0}.gz'.format(db_name))


def commit():
    with settings(warn_only=True):
        with cd(backend_path):
            local('python manage.py makemigrations')
            local("git add -N .")
            local("git add -p")
            local("git commit")


def push():
    local("git push")


def prepare_deploy():
    commit()
    push()


def setup():
    prepare_deploy()
    setup_only()


def setup_only():
    with virtualenv():
        run("git pull")
        run("pip install -r requirements.txt")
        print("pip freeze --local")


def deploy_only():
    deploy_frontend()
    with virtualenv():
        run("git pull")
        run("find . -name '*.pyc' -delete")
        with cd(backend_path):
            run('python -V')
            run('python manage.py migrate')
            run('python manage.py collectstatic --noinput')
            run("touch rfsite/touch-reload.wsgi")
            run("git status")
        print("deployed")


def deploy_frontend():
    local("npm run build")
    run("mkdir -p " + frontend_path + "/build")
    run("rm " + frontend_path + "/build/*")
    put(local_path=local_path + "/frontend/build",
        remote_path=frontend_path)


def deploy():
    prepare_deploy()
    deploy_only()
