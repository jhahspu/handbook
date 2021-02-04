---
path: "/other-json-server"
date: "Feb '21"
title: "JSON Server"
author: "jhahspu"
category: "other"
---


[JSON-Server](https://github.com/typicode/json-server)


### Setup

```powershell

# init
npm init

# install json-server
npm install -g json-server

# angular
# add db.json whereever, eg: assets/db.json
# run json-server --watch .\db.json
json-server --watch .\db.json

# when scripts are set in package.json run the following for localy created db.json
npm run json:server

# OR work with placeholder data
# "scripts": {
#    "json:server": "json-server --watch db.json",
#    "json:server:remote": "json-server http://jsonplaceholder.typicode.com/db"
npm run json:server:remote
```

#### package.json
```json
{
  "name": "test",
  "version": "1.0.0",
  "description": "test json server fake api",
  "main": "index.js",
  "scripts": {
    "json:server": "json-server --watch db.json",
    "json:server:remote": "json-server http://jsonplaceholder.typicode.com/db"
  },
  "author": "author",
  "license": "ISC"
}
```


#####


### Endpoints

+ GET
  - http://localhost:3000/users
  - http://localhost:3000/companies
  - http://localhost:3000/companies/1/users
+ GET: FILTER
  - http://localhost:3000/companies?name=Microsoft
  - http://localhost:3000/companies?name=Microsoft&name=Apple
+ GET: PAGINATION & LIMIT
  - http://localhost:3000/companies?_page=1&_limit=2
+ GET: SORTING
  - http://localhost:3000/companies?_sort=name&_order=asc
  - http://localhost:3000/companies?_sort=name&_order=desc
+ GET: USERS AGE RANGE
  - http://localhost:3000/users?age_gte=30
  - http://localhost:3000/users?age_gte=30&age_lte=40
+ GET: TEXT SEARCH
  - http://localhost:3000/users?q=John
+ POST w POSTMAN 
  - headers: content-type application/json 
  - body: raw json
+ POST: NEW USER
  - http://localhost:3000/users
  - { "firstName": "First", "lastName": "Last", "age": 22, "email": "first.last@mail.com" "companyId": "1" }
+ DELETE: EXISTING USER
  - http://localhost:3000/users/4
+ PATCH: EXISTING USER
  - http://localhost:3000/users/3
  - { "companyId": "3" }

