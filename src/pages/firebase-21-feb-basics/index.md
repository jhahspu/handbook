---
path: "/firebase-basics"
date: "Feb '21"
title: "Firebase Basics"
author: "jhahspu"
category: "firebase"
---



### Setup

```powershell

ng new [app_name]

npm i --save firebase

ng add @angular/fire

npm i --save bootstrap
```


#####


### Deploying app to firebase

```powershell

npm i -g firebase-tools

firebase --version

firebase login

firebase init
  -> select "hosting"
  -> select [app_name] from list
  -> public = dist/[app_name]

ng build --prod

firebase deploy
```


#####


### firebase.json

```json
{
  "hosting": {
    "public": "dist/[app_name]",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```


#####


### Firestore Rules

```javascript
service cloud.firestore {
  match /databases/{database}/documents {

    match /users/{userId} {
        allow write, read: if isOwner(userId);
    }

    // Reusable function to determine document ownership
    function isOwner(userId) {
        return request.auth.uid == userId
    }
  }
}
```

#####



### Configure Firebase & copy firebaseConfig to environments

#### app.module.ts

```javascript
// Fire
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```

#####



### Auth Service

```javascript
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/interfaces/user';

import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({  providedIn: 'root' })

export class AuthService {

  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {

    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )

  }

  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData({ uid, email, displayName, photoURL }: User) {
    // sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);

    const data = {
      uid,
      email,
      displayName,
      photoURL
    }

    return userRef.set(data, { merge: true });
  }

  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['/']);
  }
}
```


#####



### Login Component

```javascript
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(public auth: AuthService) { }

}
```

#####


### Login HTML

```html
<!-- template will replace this div -->
<div *ngIf="auth.user$ | async; then authenticated else guest">
  
</div>

<!-- User NOT logged in -->
<ng-template #guest>
<h3>Howdy, GUEST</h3>
<p>Login to get started...</p>

<button
  (click)="auth.googleSignin()"
  class="btn btn-primary">
  Login with Google
</button>

</ng-template>


<!-- User logged in -->
<ng-template #authenticated>
<div *ngIf="auth.user$ | async as user">
  <h3>Howdy, {{ user.displayName }}</h3>
  <img  [src]="user.photoURL">
  <p>UID: {{ user.uid }}</p>
  <button (click)="auth.signOut()">Logout</button>
</div>
</ng-template>
```

