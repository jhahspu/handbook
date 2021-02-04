---
path: "/rxjs-map"
date: "Feb '21"
title: "RxJS Map"
author: "jhahspu"
category: "rxjs"
---

[RxJS Operators](https://www.learnrxjs.io/learn-rxjs/operators)

### Number operations

```javascript
const numbers = [1, 2, 3, 4, 5];
const numbersTimesTen = numbers.map(number => number * 10);
// [10,20,30,40,50]
console.log(numbersTimesTen);
// [1,2,3,4,5]
console.log(numbers);
```

#####


### Array of Objects

```javascript
const people = [
  { firstName: 'Brian', lastName: 'Troncone' },
  { firstName: 'Todd', lastName: 'Motto' }
];
const peopleWithFullName = people.map(person => ({
  ...person,
  fullName: `${person.firstName} ${person.lastName}`
}));
// [{ firstName: 'Brian', lastName: 'Troncone', fullName: 'Brian Troncone' }, {firstName: 'Todd', lastName: 'Motto', fullName: 'Todd Motto' }]
console.log(peopleWithFullName);
const lastNames = people.map(person => person.lastName);
// [ 'Troncone', 'Motto' ]
console.log(lastNames);
```

#####


### Create observable from array and map it

```javascript
import { from } from 'rxjs';
const numbers = [1, 2, 3, 4, 5];
const number$ = from(numbers);
const numbersMultipliedByTen$ = number$.pipe(map(number => number * 10));
/*
 * 10
 * 20
 * 30
 * 40
 * 50
 */
numbersMultipliedByTen$.subscribe(console.log);
```

#####


### Map Event

```javascript
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
const click$ = fromEvent(document, 'click');
click$
  .pipe(
    map(event => ({
      x: event.clientX,
      y: event.clientY
    }))
    // { x: 12, y: 45 }, { x: 23, y: 132 }
  )
  .subscribe(console.log);
```

#####


### Map vs MapTo

```javascript
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
const click$ = fromEvent(document, 'click');
click$
  .pipe(map(() => 'You clicked!'))
  // 'You clicked!', 'You clicked!'
  .subscribe(console.log);
// VS
import { fromEvent } from 'rxjs';
import { mapTo } from 'rxjs/operators';
const click$ = fromEvent(document, 'click');
click$
  .pipe(mapTo('You clicked!'))
  // 'You clicked!', 'You clicked!'
  .subscribe(console.log);
```

#####


### Service

```javascript
// 'key' to be replaced with whatever you're looking for
this.someService.getSomething('id').pipe(
  map(({key}) => key)
).subscribe(res => console.log(res))
```