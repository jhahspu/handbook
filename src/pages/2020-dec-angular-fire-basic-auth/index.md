---
path: "/angular-fire-basic-auth"
date: "Dec '20"
title: "Angular & Firebase Basic Auth"
author: "jhahspu"
category: "angular"
---



### Initialize new angular app
```powershell
# If not working then update cli & core
ng update @angular/cli
ng update @angular/core

# init angular app
ng new [prj_name]

# add angular fire
ng add @angular/fire

# add auth service
ng g s services/auth

# add a component
ng g c components/home

# add a guard
ng g guard guards/auth
```


#####


### Setup Firebase Project
- (Create new Firebase Project)[https://console.firebase.google.com/]
- Project Overview: Register App & have firebaseConfig prepared for Step 3 (to be regitered in the app env)
- Authentication -> Enable Sign-in Provider (eg Google)


#####


### Firebase Hosting
#### Powershell:
```powershell

# check version
firebase --version

# install firebase-tools
npm install -g firebase-tools

# login to firebase
firebase login

# init firebase
firebase init

# build app
ng build --prod

# CHECK firebase.json, should be:
"public": "dist/[app_name]"

# deploy app to firebase
firebase deploy
```


#####


### Setup Env variables
#### environmnets/environment.ts | environment.prod.ts
```javascript
export const environment = {
  ...

  firebaseConfig : {
    apiKey: ...,
    authDomain: ...,
    databaseURL: ...,
    projectId: ...,
    storageBucket: ...,
    messagingSenderId: ...,
    appId: ...
  }
};
```


#####


### Initialize app
#### app.module.ts
```javascript
...
// Fire
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  imports: [
    ...
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    ...
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```


#####


### Setup Routes
#### app-routing.module.ts
```javascript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```


#####


### Create User Interface
#### interfaces/user.model.ts
```javascript
export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}
```


#####


### Auth Service
#### services/auth.service.ts
```javascript
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user.model';

import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })

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


### Using Auth Service
#### components/home/home.component.ts
```javascript
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public auth: AuthService) { }

}
```


#####


### HTML sample for handling login/logout
#### components/home/home.component.html
```html
<h1>Home Page</h1>

<!-- template will replace this div -->
<div *ngIf="auth.user$ | async; then authenticated else guest">
  
</div>

<!-- User NOT logged in -->
<ng-template #guest>
<h3>Howdy, GUEST</h3>
<p>Login to get started...</p>

<button (click)="auth.googleSignin()">
  Connect Google
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


#####


### Protecting Routes
#### app-routing.module.ts
```javascript
...
import { AuthGuard } from './auth.guard';
...

{ path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
```


#####


### Setup Guard
#### guards/auth.quard.ts
```javascript
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { tap, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('access denied')
          this.router.navigate(['/login']);
        }
      })
    )
  }
  
}
```


#####


###  Firebase Database Rules:
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