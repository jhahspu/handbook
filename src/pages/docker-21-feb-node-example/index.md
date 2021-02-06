---
path: "/docker-node-eg"
date: "Feb '21"
title: "Docker NodeJS EG"
author: "jhahspu"
category: "docker"
---


[Docker NodeJS](https://docs.docker.com/language/nodejs/)




### Basics


+ __Dockerfile__
  - blueprint for building an image
+ __Image__
  - template for running docker containers
+ __Container__
  - running process



### Dockerfile

+ __Dockerfile__
  - in the root of the project
+ __.dockerignore__
  - ignore local files and folders
  - eg: node_modules

```javascript

const app = require('express')();

app.get('/', (req, res) => 
  res.json({message: 'docker running'})
);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`app listening on port ${port}`) );
```

```javascript

/**
*   Layers are cached for effieciency
*     - install dependencies first for them to be cached
*/

/**
*   Layer 1
*     FROM
*     - specific base image
*/
FROM node:12

/**
*   Layer 2
*     WORKDIR
*     - working directory of the app
*     - next steps will start from this app dir
*/
WORKDIR /app

/**
*   Layer 3
*     COPY - 2 args
*     - local 'package.json' location
*     - './' destination path in the container
*/
COPY package*.json ./

/**
*   Layer 4
*     RUN
*     - like opening a terminal and running a command
*     - when it's finished the results are are commited to the docker image as a layer 
*     - shell command
*/
RUN npm install

/**
*   Layer 5
*     COPY
*     - copy all local files to working directory
*/
COPY . .

/**
*   Layer 6
*     ENV
*     - in order to run the code we use an ENV var
*/
ENV PORT=8080

/**
*   Layer 7
*     EXPOSE
*     - network port that this container will listen on at runtime
*/
EXPOSE 8080

/**
*   Layer 8
*     CMD
*     - exec command, doesn't start up a shell session
*     - only one per dockerfile
*     - tells the container how to run the actual application
*/
CMD [ "npm", "start" ]
```


#####


### Image

+ `docker build -t jhashspu/demoapp:1.0 .`
  - `-t`: tag
  - `jhashpu/`: username on hub
  - `demoapp:1.0`: name of project & version
  - ` .`: path of the dockerfile
+ successfully built image `id`
  - base image to create other images
  - use it to run containers
+ `docker push`
  - push it to a container registry: dockerhub or etc
+ `docker pull`
  - pull an image


#####


### Container
+ `docker run -p 5000:8080 img_id`
  - run image locally on port HOST(5000):CONTAINER(8080)


#####


### VOLUMES
+ share data accross multiple containers
+ dedicated folder on the host machine
+ container can create files
  - can be remounted into feature containers or multiple containers at the same time
+ `docker volume create shared-stuff`
  - in the working dir

```powershell

docker volume create shared-stuff

docker run \
--mount source=shared-stuff,target=/stuff
```


#####


### Debugging

+ inspect logs from docker desctop running container

```powershell

# foreground
docker container run --publish 80:80 nginx

# background -- Ctrl+C won't stop the container 
# to use a specific version use nginx:VER-NO
docker container run --publish 80:80 --detach nginx

# named container
docker container run --publish 80:80 --detach --name webhost nginx

# list containers -- option a for all
docker container ls -a

# stop container -- type the first few unique digits
docker container stop 453

# view logs
docker container logs [name]

# running processes of a container
docker container top [name]

# remove containers
docker container rm 543 432 654
  # running container won't be removed unless using '-f' (force)
docker container rm 654 -f
```


#####


### Docker Compose

+ tool for running multiple docker containers at the same time
+ `docker-compose.yml`
  - in the root of the prj
  - manage all containers at once
+ `docker-compose up`
  - finds the `docker-compose.yml` file and runs all containers together
+ `docker-compose down`
  - shutdown all containers together

```javascript

version: '3'
// each key in services represent a container
services: 
  // nodejs app
  web:
    // point it to current working dir where the Dockerfile is located
    build: .
    // Port forwarding config
    ports: 
      - "8080:8080"
  // second container - mysql
  db:
    image: "mysql"
    environment:
      MYSQL_ROOT_PASSWORD: password
    volumes:
      - db-data:/foo
// store data
volumes:
  db-data:
```
