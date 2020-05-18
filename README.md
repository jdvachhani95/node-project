# node-project

This is a nodeJs based project with Apollo GraphQL server using Typescript and Webpack.

---
## Requirements

For development, you will only need Node.js and a node global package installed in your environement.

Download Docker and just go on and follow steps [Docker Installation Guide](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04).

---
## Steps to Run node-project on local machine

#### Install dependencies
  
    $ npm i
    
#### Simple build for development
    
    $ NODE_ENV=development npm run build

#### Simple build for production

    $ NODE_ENV=production npm run build
    
#### Running the project

    $ npm run start:env
    
#### Run unit testing

    $ npm run test
    
---
## Steps to Dockerize node-project
Check the Docker desktop is up and running.

#### Compose docker container
  
    $ docker build -t node-project .
    
#### Run docker container in your local machine
    
    $ docker run -p 127.0.0.1:2000:2000 node-project

    
