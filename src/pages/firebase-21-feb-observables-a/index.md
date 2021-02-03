---
path: "/firebase-observables-a"
date: "Feb '21"
title: "Firebase Observables (a)"
author: "jhahspu"
category: "firebase"
---




### Observable

```javascript
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';

let hello = Observable.of('hello');
let world = Observable.of('world');
hello.combineLatest(world)

import 'rxjs/add/observable/combineLatest';
Observable.combineLatest(hello, world);
```


#####


### Subscriptions

#### component

```javascript
cats: FirebaseListObservable<any[]>

dogs: Array<any[]>;
subscription: Subscription;

ngOnInit() {
  this.cats = this.db.list('/cats');

  this.subscription = this.db.list('/dogs').subscribe(dogs => {
    this.dogs = dogs;
  });
}

ngOnDestroy() {
  this.subscription.unsubscribe();
}
```

#### html

```html
<div *ngFor="let cat of cats | async">{{cat.name}}</div>

<div *ngFor="let dog of dogs">{{dog.name}}</div>
```


#####



### Map Observables
#### Component

```javascript
catCount: Observable<number>;
dogName: Observable<string>;

ngOnInit() {
  this.catCount = this.db.list('/cats')
                  .map(cats => {
                    return cats.length
                  })

  this.dogName = this.db.object('/dogs/dRSsdfSDFSwS')
                  .map(dog => {
                    return dog.name
                  })
}
```

#### HTML

```html
there are {{catCount | async}} cats in this list

the dog's name is {{dogName | async}}
```


#####



### switchMap

#### Component

```javascript
human: FirebaseObjectObservable<any>;
dogs: Observable<any[]>;

ngOnInit() {
  this.human = this.db.object('/humans/jeff')
  this.dogs = this.human.switchMap(human => {
    return this.db.list('/dogs', {
      query: {
        orderByChild: 'owner',
        equalTo: human.name
      }
    })
  })
}
```

#### HTML

```html
<div *ngFor="let dog of dogs | async">{{dog.name}}</div>
```


#####



### Combine Observables

#### Component

```javascript
dog: FirebaseObjectObservable<any>;
cat: FirebaseObjectObservable<any>;

animals: Observable<any[]>

ngOnInit() {
  this.cat = this.db.object('/cats/asdddSHGHfghfghf');
  this.dog = this.db.object('/dogs/TsdfsSHGHfghfghf');

  this.animals = Observable.combineLatest(this.cat, this.dog);
}
```

#### HTML

```html
<div *ngFor="let animal of animals | async">{{animal.name}}</div>
```


#####




### Behavior Subject

#### Component

```javascript
dog: FirebaseListObservable<any>;

currentDog = new BehaviorSubjet(null);

ngOnInit() {
  this.dogs = this.db.list('/dogs');
}

changeDog(dog) {
  this.currentDog.next(dog)
}
```

#### HTML

```html
<div *ngFor="let dog of dogs | async" (click)="changeDog(dog)">{{dog.name}}</div>


<h2>Current Dog</h2>
<div>{{ (curentDog | async)?.name }}</div>
```
