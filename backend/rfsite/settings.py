import inspect
import os
import os.path
from os.path import join

import sys

BASE_DIR = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))

FIXTURE_DIRS = [os.path.join(BASE_DIR, "fixture")]

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'ma6y7@2c1j@o6_6r&cf8kh-&kk*atexngo2vzkt%pva)u6kb(g'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["rflocator.rfedorov.ru", "127.0.0.1"]
CORS_ORIGIN_WHITELIST = (
    "rflocator.rfedorov.ru",
    "127.0.0.1:8000",
    '127.0.0.1:3000'
)

# Application definition
INSTALLED_APPS = (
    'corsheaders',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.humanize',
    'raven.contrib.django.raven_compat',
    'django_extensions',
    'rest_framework',
    'rest_framework_swagger',
    'tz_detect',
    'rflocator',
)

MIDDLEWARE_CLASSES = (
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'tz_detect.middleware.TimezoneMiddleware',
)

ROOT_URLCONF = 'rfsite.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [join(BASE_DIR, 'templates'), ],
        'APP_DIRS': True,
        'OPTIONS': {
            'debug': DEBUG,
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'rfsite.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'rflocator',
    }
}

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'
# TIME_ZONE = 'Asia/Omsk'
TZ_DETECT_COUNTRIES = ("RU",)

USE_I18N = False

USE_L10N = True

USE_TZ = True

REST_FRAMEWORK = {
    'PAGE_SIZE': 50,
    'DEFAULT_PAGINATION_CLASS':
        'rest_framework.pagination.LimitOffsetPagination',
    'DEFAULT_FILTER_BACKENDS':
        ('rest_framework.filters.DjangoFilterBackend', ),
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES':
        ['rest_framework.permissions.DjangoModelPermissions']
}

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.8/howto/static-files/

STATIC_URL = '/static/'

STATIC_ROOT = join(BASE_DIR, "static")

if os.environ.get('POSTGRES_DB', None):
    # load docker config, if postgres container available
    from .settings_docker import *  # noqa
