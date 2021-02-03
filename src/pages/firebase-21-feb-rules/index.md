---
path: "/firebase-rules"
date: "Feb '21"
title: "Firebase Rules"
author: "jhahspu"
category: "firebase"
---


### Cloud Firestore Rules

```javascript
service cloud.firestore {
  match /databases/{database}/documents {

    match /users/{userId} {
      allow write, read: if isOwner(userId);
    }
    
    match /categories/{category} {
      allow read: if true;
    }
    
    match /products/{products} {
      allow read: if true;
      allow write, create, update, delete: if isAdmin();
    }

    // Reusable function to determine document ownership
    function isOwner(userId) {
      return request.auth.uid == userId
    }
    
    // If User is Admin
    function isAdmin() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
  }

```


#####


## Realtime Database Rules

+ __.read__
  - Describes if and when data is allowed to be read by users.
+ __.write__
  - Describes if and when data is allowed to be written.
+ __.validate__
  - Defines what a correctly formatted value will look like, whether it has child attributes, and the data type.
+ __.indexOn__
  - Specifies a child to index to support ordering and querying.


[Firebase Security](https://firebase.google.com/docs/database/security/)


#####


### No Security

```javascript
// No Security
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```


#####


### Full Security

- data accessible only from [Firestore console](https://console.firebase.google.com/)

```javascript
// No Security
{
  "rules": {
    ".read": false,
    ".write": false
  }
}
```


#####



### Only authenticated
```javascript
// Only authenticated users can access/write data
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```


#####



### User Authentication From a Particular Domain
```javascript
// Only authenticated users from a particular domain (example.com) can access/write data
{
  "rules": {
    ".read": "auth.token.email.endsWith('@example.com')",
    ".write": "auth.token.email.endsWith('@example.com')"
  }
}
```


#####


### User Data Only

- gives each authenticated user a personal node at `/post/$user_id` where `$user_id` is the ID of the user obtained through __authentication__

```javascript
// These rules grant access to a node matching the authenticated
// user's ID from the Firebase auth token
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```


#####


### Validates User is Moderator From Different Database Location

```javascript
// Validates user is moderator from different database location
{
  "rules": {
    "posts": {
      "$uid": {
        ".write": "root.child('users').child('moderator').val() === true"
      }
    }
  }
}
```


#####



### Validates String Datatype and Length Range

```javascript
// Validates string datatype and length range
{
  "rules": {
    "posts": {
      "$uid": {
        ".validate": "newData.isString() 
          && newData.val().length > 0,
          && newData.val().length <= 140"
      }
    }
  }
}
```


#####



### Checks Presence of Child Attributes

```javascript
// Checks presence of child attributes
{
  "rules": {
    "posts": {
      "$uid": {
        ".validate": "newData.hasChildren(['username', 'timestamp'])"
      }
    }
  }
}
```


#####


### Validates Timestamp

```javascript
// Validates timestamp is not a future value
{
  "rules": {
    "posts": {
      "$uid": {
        "timestamp": { 
          ".validate": "newData.val() <= now" 
        }
      }
    }
  }
}
```


#####


### Prevents Delete or Update

```javascript
// Prevents Delete or Update
{
  "rules": {
    "posts": {
      "$uid": {
        ".write": "!data.exists()"
      }
    }
  }
}
```


#####


### Prevents Only Delete

```javascript
// Prevents only Delete
{
  "rules": {
    "posts": {
      "$uid": {
        ".write": "newData.exists()"
      }
    }
  }
}
```


#####



### Prevents Only Delete

```javascript
// Prevents only Update
{
  "rules": {
    "posts": {
      "$uid": {
        ".write": "!data.exists() || !newData.exists()"
      }
    }
  }
}
```


#####



### Prevents Create and Delete
```javascript
// Prevents Create and Delete
{
  "rules": {
    "posts": {
      "$uid": {
        ".write": "data.exists() && newData.exists()"
      }
    }
  }
}
```
