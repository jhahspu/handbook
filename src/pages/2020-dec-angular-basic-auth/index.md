---
path: "/angular-fire-basic-auth"
date: "Dec '20"
title: "Angular+Firebase"
author: "jhahspu"
category: "AngularJS"
---


## 13: Firebase Database Rules:
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

## 12: Protecting Routes in app-routing.module.ts
```javascript
...
import { AuthGuard } from './auth.guard';
...

{ path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
```

## 11: Setup Guard with: ng g guard auth
### app/auth.quard.ts
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

## 10: Firebase Hosting
### Terminal:
```javascript
// deploy app to firebase
firebase deploy

// CHECK firebase.json, should be:
"public": "dist/[app_name]",

// build app
ng build --prod

// init firebase
firebase init

// login to firebase
firebase login

// check version
firebase --version

// install firebase-tools
npm install -g firebase-tools
```


## 9: HTML sample for handling login/logout
### components/home/home.component.html
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

## 8: Using Auth Service in components/home/home.component.ts
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

## 7: Auth Service services/auth.service.ts
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

## 6: Create User Interface interfaces/user.model.ts
```javascript
export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}
```

## 5: Setup Routes in app-routing.module.ts
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

## 4: Initialize app in app.module.ts
```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

// Services
import { AuthService } from './services/auth.service';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

// Fire
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## 3: Setup Env variables
### environmnets/environment.ts | environment.prod.ts
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

## 2: Initialize new angular app
```javascript
// init angular app
ng new [prj_name]

// add fire
ng add @angular/fire

// add auth service
ng g s services/auth

// add a component
ng g c components/home

// If not working then update cli & core
ng update @angular/cli
ng update @angular/core
```

## 1: Setup Firebase Project
- (Create new Firebase Project)[https://console.firebase.google.com/]
- Project Overview: Register App & have firebaseConfig prepared for Step 3 (to be regitered in the app env)
- Authentication -> Enable Sign-in Provider (eg Google)
