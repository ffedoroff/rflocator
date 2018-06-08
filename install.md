## How to use:

#### 1. Clone repository
```
git clone git@gitlab.renderedsource.com:rfedorov/rflocator.git && cd rflocator
```

#### 2. install docker and docker-compose

[install docker](https://docs.docker.com/engine/installation/)

[install docker-compose](https://docs.docker.com/compose/install/)

#### 3. run docker containers
```
cd tools/docker
docker-compose up
```
Now you can open local site:
 - [reactjs http://127.0.0.1:8000/](http://127.0.0.1:8000/) 
 - [angular http://127.0.0.1:8000/angular/](http://127.0.0.1:8000/angular/)
 - login: `Guest` 
 - password: `934tt5kedr3245Ger45%4334`

#### 4. start or stop existing containers 
```
cd tools/docker
docker-compose start
docker-compose stop
```

#### 5. remove docker containers
```
cd tools/docker
docker-compose stop
docker-compose rm
```

optional, you can clear all docker cache and images
```
docker rm -f -l -v $(docker ps -a -q)
docker rmi -f $(docker images -q -f dangling=true)
docker rmi -f $(docker images -q -a)
```