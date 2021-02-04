---
path: "/rxjs-take"
date: "Feb '21"
title: "RxJS Take"
author: "jhahspu"
category: "rxjs"
---

[RxJS Operators](https://www.learnrxjs.io/learn-rxjs/operators)

### Take 1 value from source

```javascript
// RxJS v6+
import { of } from 'rxjs';
import { take } from 'rxjs/operators';

//emit 1,2,3,4,5
const source = of(1, 2, 3, 4, 5);
//take the first emitted value then complete
const example = source.pipe(take(1));
//output: 1
const subscribe = example.subscribe(val => console.log(val));
```

#####


### Take the first 5 values from source

```javascript
// RxJS v6+
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

//emit value every 1s
const interval$ = interval(1000);
//take the first 5 emitted values
const example = interval$.pipe(take(5));
//output: 0,1,2,3,4
const subscribe = example.subscribe(val => console.log(val));
```

#####


### Taking first click location

```javascript
`<div id="locationDisplay">
  Where would you click first?
</div>`
// RxJS v6+
import { fromEvent } from 'rxjs';
import { take, tap } from 'rxjs/operators';

const oneClickEvent = fromEvent(document, 'click').pipe(
  take(1),
  tap(v => {
    document.getElementById(
      'locationDisplay'
    ).innerHTML = `Your first click was on location ${v.screenX}:${v.screenY}`;
  })
);

const subscribe = oneClickEvent.subscribe();
```