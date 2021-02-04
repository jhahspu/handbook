---
path: "/angular-ngrx-basics"
date: "Feb '21"
title: "NgRx Basics"
author: "jhahspu"
category: "angular"
---

### What is Redux

+ manage the application state in a predictable way
+ built on top of Flux arhitecture
+ decoupled architecture
+ useful when working with multiple independent views that work with the same data and don't have parent - child relationship
+ data can be updated by:
  - multiple users
  - multiple actors
+ pure functions
+ testable
+ redux developer extension
+ undo/redo


#####


### Bulding Blocks

+ Store
  - single JS objects that contains the state of the application
  - like a local DB
+ Actions
  - plain JS objects that represent that something happened - actions / events
+ Reducers
  - function that specifies how the state changes in response to an action
  - __does not modify the state__ --> it __returns a new state__
  - the __store will update the state__
  - pure functions
+ Effects
  - make async API calls
  - __always needed when making API calls__


#####


### Pure Functions

+ same input --> same output
+ no side effects
+ time travel debugging
+ easy testability
+ undo/redo

#### impure functions

```javascript

function increment(input) {
  input.count++;                // mutating arguments
}

function increment(input) {
  service.addMessage(...);      // making backend calls
}

function increment(input) {
  input.count += Math.random(); // the output is diff every time
}
```

#### pure functions

```javascript

function increment(input) {
  return { count: input.count + 1 };
}
```

#### reducer function

```javascript

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    
  }
}
```


#####


### Angular Setup

+ __ngrx__ https://github.com/ngrx/platform

```powershell

# angular cli
ng add @ngrx/store@latest
ng add @ngrx/store-devtools@latest
ng add @ngrx/entity@latest
ng add @ngrx/effects@latest
ng add @ngrx/router-store@latest

# npm
npm install @ngrx/store@latest @ngrx/store-devtools @ngrx/entity @ngrx/effects @ngrx/router-store --save
```


#####


### 
