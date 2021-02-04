---
path: "/angular-directives"
date: "Feb '21"
title: "Angular Directives"
author: "jhahspu"
category: "angular"
---


[Angular Built-in Directives](https://angular.io/guide/built-in-directives)
[Angular Attribute Directives](https://angular.io/guide/attribute-directives)
[Angular Structural Directives](https://angular.io/guide/structural-directives)



### Structural Directives - modify DOM

- '*' syntactic sugar, shorthand pattern for writing the actual syntax
- work with `ng-template` elements to modify the DOM
- if placed on `ng-template` it will handle rendering or not the children of the template element


#####


### *ngIf

```html

<!-- If mediaItem.watchedOn has a value,
then this will evaluate to TRUE
and the content within the div will be displayed otherwise not.. -->
<div *ngIf="mediaItem.watchedOn">{{ mediaItem.watchedOn }}</div>

<!-- this will not make it to the DOM if false/null -->
<ng-template [ngIf]="mediaItem.watchedOn">
  <div>{{ mediaItem.watchedOn }}</div>
</ng-template>
```


#####


### *ngFor

#### app.component.ts

```javascript

export class AppComponent() {
  mediaItems = [
    {
      id: 1,
      name: 'Title',
      medium: 'Movie',
      category: 'category',
      year: 2000,
      watchedOn: 1294166565384,
      isFavorite: false
    },
    {
      id: 2,
      name: 'Title 2',
      medium: 'Series',
      category: 'category',
      year: 2005,
      watchedOn: 1294166565384,
      isFavorite: false
    }
  ];
}
```

### app.component.html

```html

...
<mw-media-item
  *ngFor="let mediaItem of mediaItems"
  [mediaItem]="mediaItem"
  (delete)="onMediaItemDelete($event)">
</mw-media-item>
```


#####


### Attribute Directive

- change the appearence or behavior of the elements they are attached to
- do not create or remove elements

#### app.component.html

```html

...
<mw-media-item
  *ngFor="let mediaItem of mediaItems"
  [mediaItem]="mediaItem"
  (delete)="onMediaItemDelete($event)"
  [ngClass]="{ 'medium-movies': mediaItem.medium === 'Movies', 
              'medium-series': mediaItem.medium === 'Series' }">
</mw-media-item>
```


#####


### Cutom Attribute Directive

#### favorite.directive.ts

```javascript

import { Directive, HostBinding, HostListener, Input } from '@angular/core';
@Directive({
  selector: '[mwFavorite]'
})
export class FavoriteDirective {
  @HostBinding('class.is-favorite') isFavorite = true;
  @HostBinding('class.is-favorite-hovering') hovering = false;
  @HostListener('mouseenter') onMouseEnter() {
    this.hovering = true;
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.hovering = false;
  }
  // setter method
  @Input() set mwFavorite(value) {
    this.isFavorite = value;
  }
}
```

#### media-item.component.html

```html

<h2>{{ mediaItem.name }}</h2>
<div>{{ mediaItem.category }}</div>
<div>{{ mediaItem.year }}</div>
<div>{{ mediaItem.watchedOn }}</div>
<div [mwFavorite]="mediaItem.isFavorite"></div>
<!-- etc.. -->
```
### app.module.ts
```javascript
import { FavoriteDirective } from './favorite.directive';
@NgModule({
  declarations: [
    FavoriteDirective,
  ]
})
```