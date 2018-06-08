#!/usr/bin/env bash

cp -f backend/requirements.txt tools/docker/requirements.txt
cd tools/docker/
docker-compose stop
docker-compose rm
docker-compose build
docker-compose up
