---
path: "/rxjs-pluck"
date: "Feb '21"
title: "RxJS Pluck"
author: "jhahspu"
category: "rxjs"
---


#### Maps each source value (an object) to its specified nested property.

### Keyup

```javascript
import { fromEvent } from 'rxjs';
import { pluck } from 'rxjs/operators';
const keyup$ = fromEvent(document, 'keyup');
keyup$
  .pipe(pluck('code'))
  // 'Space', 'Enter'
  .subscribe(console.log);
```

#####


### Click

```javascript
import { fromEvent } from 'rxjs';
import { pluck } from 'rxjs/operators';
const click$ = fromEvent(document, 'click');
click$
  .pipe(pluck('target', 'nodeName'))
  // 'DIV', 'MAIN'
  .subscribe(console.log);
```

#####


### Using it in service directly

```javascript
getGist(id: string) {
  return this.http.get(`https://api.github.com/gists/${id}`).pipe(
    pluck('files')
  );
```