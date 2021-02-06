---
path: "/docker-commands"
date: "Feb '21"
title: "Docker Commands"
author: "jhahspu"
category: "docker"
---



### Containers

+ ` docker container run --publish 80:80 nginx `
  - run in foreground
+ ` docker container run --publish 80:80 --detach nginx `
  - run in background
  - Ctrl+C won't stop the container
  - to use a specific version use nginx:VER-NO
+ ` docker container run --publish 80:80 --detach --name webhost nginx `
  - named container 'webhost'

+ ` docker container ls -a `
  - list containers

+ ` docker container stop ID `
  - stop container with id (starting chars of id)

+ ` docker container logs CONTAINER_NAME `
  - view logs for named container
+ ` docker container top CONTAINER_NAME `
  - see running processes of a container

+ ` docker container rm ID ID ID `
  - remove containers multiple containers
+ ` docker container rm ID -f `
  - running container won't be removed unless using '-f' (force)

+ ` docker container restart ID `
  - restarts one or more containers

+ ` docker container prune ID `
  - removes container with ID
  
+ `  `
  - 
  - 
  - 
  
+ `  `
  - 
  - 
  - 


#####


### Images

+ ` docker build -t IMAGE_NAME:TAG . `
  - ` -t ` tag
  - ` IMAGE_NAME ` name
  - ` :TAG ` TAG or build-no, eg: '1.0'
  - ` . ` path of the docker file

+ ` docker run -d --name CONTAINER_NAME -p X:Y \`
  - '-d' will Run container in background and print container ID
  - Docker run on image in port X - HOST
  - EXPOSE Y from Docker file
+ ` -e REACT_APP_SOME_ENVIRONMENT = someEnv \ `
  - Set some environment variable
+ ` IMAGE_NAME:BUILD_NUMBER `
  - Your image with build number
  
+ ` docker images ls`
  - list all local images
+ ` docker images `
  - view local images

+ ` docker exec -it CONTAINER_NAME sh `
  - enter command in the container
+ ` Exit `
  - get out from the docker Container

+ ` docker image rm IMAGE_ID `
  - remove specific image
+ ` docker image rm -f IMAGE_ID `
  - force remove including dependent child images

+ ` docker image inspect ID`
  - show image details for ID
+ ` docker image push HUB_USER/IMAGE_NAME:TAG `
  - push image to docker hub

+ ` docker pull IMAGE_NAME:TAG `
  - pull image

+ ` docker save IMAGE_NAME > IMAGE_NAME.tar `
  - save a local copy of a pulled, commited or built
+ ` docker load --input IMAGE_NAME.tar `
  - load that Docker container from the archived tar file in the future

+ `  `
  - 
  - 
  - 
+ `  `
  - 
  - 
  - 

#####


### System

+ ` docker system prune -a `
  - remove all containers from system
+ `  `
  - 
  - 
  - 
+ `  `
  - 
  - 
  - 