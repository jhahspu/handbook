---
path: "/lodash-basics"
date: "Feb '21"
title: "Lodash Basics"
author: "jhahspu"
category: "lodash"
---

[Lodash](https://lodash.com/docs/)


### Setup

```powershell
$ npm install --save lodash

# This is the new bit here for Typescript: 
$ npm install --save-dev @types/lodash

```

#####


### Using package

```javascript
import * as _ from 'lodash';
```

#####


#### angular.json

```json
"build": {
  "builder": "@angular-devkit/build-angular:browser",
  "options": {
    ...
    "allowedCommonJsDependencies": [
      "lodash"
    ]
  },
  ...

```

#####


### Sort an array

```javascript
...
import * as _ from 'lodash';
...

colSortBy(str: string) {
    this.filteredProducts = _.sortBy(this.filteredProducts, [str]);
}
```

```html
<th (click)="colSortBy('title')" class="sort">Title</th>
```


