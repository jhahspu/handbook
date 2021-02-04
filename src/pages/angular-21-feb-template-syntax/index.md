---
path: "/angular-template-syntax"
date: "Feb '21"
title: "Angular Template Syntax"
author: "jhahspu"
category: "angular"
---


[Angular Template Syntax](https://angular.io/guide/template-syntax)


### Angular Template Syntax
- Interpolation
- Binding
- Expressions
- Conditional templating
- Template variables
- Template expression variables


#####


#### Interpolations {{  }}

#### Nonsupported in {{ }}

- Assignments
- Newing up variables
- Chaning expressions
- Incrementers / decrementers

#### media-item.component.html

```html

<h1>{{ name }}</h1>
<div>{{ wasWatched() }}</div>
```
### media-item.component.ts
```javascript
export class MediaItemComponent() {
  name = "Sample Title";
  wasWatched() {
    return true;
  }
}
```


#####


### Property Binding [propertyName]="templateExpression"

#### media-item.component.html

```html

<h1 [textContent]="{{ name }}"></h1>
```
### media-item.component.ts
```javascript
export class MediaItemComponent() {
  name = "Sample Title";
}
```


#####


### Event Binding (click)="someMethod()"

- native events and custom events

#### media-item.component.html

```html

<button (click)="onDelete()">Delete</button>
```

#### media-item.component.ts

```javascript

export class MediaItemComponent() {
  onDelete() {
    console.log('deleted!');
  }
}
```


#####


### @Input

#### media-item.component.ts

```javascript

import { Component, Input } from '@angular/core';
export class MediaItemComponent() {
  @Input() mediaItem;
  // optionally can use custom property name
  @Input('mediaItemToWatch') mediaItem;
}
```

#### app.component.ts

```javascript

export class AppComponent() {
  firstMediaItem = {
    id: 1,
    name: 'Title',
    medium: 'Movie',
    category: 'category',
    year: 2000,
    watchedOn: 1294166565384,
    isFavorite: false
  }
}
```

#### app.component.html

```html

...
<mw-media-item [mediaItem]="firstMediaItem"></mw-media-item>
<!-- OR using cutom property name -->
<mw-media-item [mediaItemToWatch]="firstMediaItem"></mw-media-item>
```

#### media-item.component.html

```html

<h2>{{ mediaItem.name }}</h2>
<div>{{ mediaItem.category }}</div>
<div>{{ mediaItem.year }}</div>
<div>{{ mediaItem.watchedOn }}</div>
<!-- etc.. -->
```


#####



### @Output - expose event bindings on components

#### media-item.component.ts

```javascript

import { Component, Input, Output, EventEmitter } from '@angular/core';
export class MediaItemComponent() {
  @Input() mediaItem;
  @Output() delete = new EventEmitter();
  onDelete() {
    this.delete.emit(this.mediaItem);
  }
}
```

#### app.component.ts

```javascript

export class AppComponent() {
  firstMediaItem = {
    id: 1,
    name: 'Title',
    medium: 'Movie',
    category: 'category',
    year: 2000,
    watchedOn: 1294166565384,
    isFavorite: false
  };

  onMediaItemDelete(mediaItem) {
    // Todo
  }
}
```

#### app.component.html

```html

...
<mw-media-item
  [mediaItem]="firstMediaItem"
  (delete)="onMediaItemDelete($event)">
</mw-media-item>
```

#### media-item.component.html

```html

<h2>{{ mediaItem.name }}</h2>
<div>{{ mediaItem.category }}</div>
<div>{{ mediaItem.year }}</div>
<div>{{ mediaItem.watchedOn }}</div>
<!-- etc.. -->
```