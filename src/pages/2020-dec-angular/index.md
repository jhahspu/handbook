---
path: "/angularjs"
date: "Dec '20"
title: "AngularJS"
author: "jhahspu"
category: "JS"
---


# Setup Angular CLI
```javascript
npm i -g @angular/cli

// create new app
ng new [project_name]

// serve on default port 4200
ng serve

// if ERRORs out add to 'package.json':
"scripts": {
    ...
    "postinstall": "ngcc"
}

// run:
npm install

// serve again and it should work
```