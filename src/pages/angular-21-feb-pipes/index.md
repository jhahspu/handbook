---
path: "/angular-pipes"
date: "Feb '21"
title: "Angular Pipes"
author: "jhahspu"
category: "angular"
---

[Angular Pipes](https://angular.io/guide/pipes)


### Pipes
- template expression operator that takes in a value and returns a new value representation
- built-in

#### media-item.component.html

```html

<h2>{{ mediaItem.name | slice: 0:10 | uppercase }}</h2>
<div>{{ mediaItem.watchedOn | date: 'shortDate' }}</div>
<!-- etc.. -->
```

#####


### Custom Pipes

#### category-list.pipe.ts

```javascript

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryList',
  // stateless(default) or statefull
  pure: true
  // pure: will take in data and return new data, like pure functions
})
export class CategoryListPipe implements PipeTransform {
  transform(mediaItems) {
    const categories = [];
    mediaItems.forEach(mediaItem => {
      if (categories.indexOf(mediaItem.category) <= -1) {
        categories.push(mediaItem.category)
      }
    });
    return categories.join(', ');
  }
}
```

#### app.component.html

```html

<header>
  <div>{{ mediaItems | categoryList }}</div>
</header>

<mw-media-item
  *ngFor="let mediaItem of mediaItems"
  [mediaItem]="mediaItem"
  (delete)="onMediaItemDelete($event)"
  [ngClass]="{ 'medium-movies': mediaItem.medium === 'Movies', 
              'medium-series': mediaItem.medium === 'Series' }">
</mw-media-item>
```

#### app.module.ts

```javascript

import { CategoryListPipe } from './category-list.pipe';
@NgModule({
  declarations: [
    CategoryListPipe,
  ]
})
```