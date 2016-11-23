# restapi-FCamara
This is a Restful API, made using NodeJS and MongoDB.
It has two endpoints, to authenticate the user (with JWT) and to retrieve a simple list of products.

# Pre reqs
  npm installed
  MongoDB installed and running
  NodeJS installed

#To install
  npm install

#To seed the database
  node seed.js<br>
  This will create a few prodcuts on the mongoDB and one user (name: FCamara, password: FCamara)  
  
#To start
  node server.js

#Using
This application run at http://localhost:8080

#Endpoints
 - Authentication (with JWT): http://localhost:8080/api/auth
 - List of products: http://localhost:8080/api/products

  
