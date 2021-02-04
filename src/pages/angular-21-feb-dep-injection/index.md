---
path: "/angular-dependency-injection"
date: "Feb '21"
title: "Angular Dependency Injection"
author: "jhahspu"
category: "angular"
---


[Angular Dependency Injection](https://angular.io/guide/dependency-injection)


#### Services

+ handling creating instances of things and injecting them into places where they are needed
+ DI has 2 steps:
  - service registration (list of things that can be injected)
  - retrieval of registered things, done with `constructor(){}` injection, either by __TypeScript__ type anotations or by using the __@Inject()__ decorator
+ Angular provides access to the Injector itself for locating specific services
+ Wherever they are registered, they will be available within the component and it's children

#### Steps:

- Register services in the __provider__ class or the provide helper function or by providing the type, at the __bootstrap call__ or in the __compononent metadata decorators__ 
- Initialize them within __class cunstroctor__ signatures

#### Services === Singletons, stored in memory at client level


#####


### Building and Providing a Service

#### media-item.service.ts

```javascript

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediaItemService {
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

  get() {
    return this.mediaItems;
  }

  add(mediaItem) {
    this.mediaItems.push(mediaItem);
  }

  delete(mediaItem) {
    const index = this.mediaItems.indexOf(mediaItem);
    if (index >= 0) {
      this.mediaItems.splice(index, 1);
    }
  }
}
```

### app.module.ts

```javascript

import { MediaItemService } from './media-item.service';
@NgModule({
  providers: [
    MediaItemService,
  ]
})
```


#####



### Register a Single Instance of the Service at ROOT lvl

#### media-item.service.ts

```javascript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediaItemService {
...
}
```

#### app.module.ts

```javascript

import { MediaItemService } from './media-item.service';
@NgModule({
  providers: [
    
  ]
})
```


#####



### Using the MediaItemList

#### media-item-list.component.ts

```javascript

import { Component, OnInit } from '@angular/core';
import { MediaItemService } from './media-item.service';

export class MediaItemList() implements OnInit {

  mediaItems;

  constructor(private mediaItemService: MediaItemService) {}

  ngOnInit() {
    this.mediaItems = this.mediaItemService.get();
  }

  onMediaItemDelete(mediaItem) {
    this.mediaItemService.delete(mediaItem);
  }

}
```

#### media-item-form.component.ts

```javascript

import { OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MediaItemService } from './media-item.service';

export class MediaItemFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private mediaItemService: MediaItemService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      medium: this.formBuilder.control('Movies'),
      name: this.formBuilder.control('', Validators.compose([
        Validators.required,
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      category: this.formBuilder.control(''),
      year: this.formBuilder.control('', this.yearValidator)
    });
  }

  yearValidator(control: FormControl) {
    if(control.value.trim().length === 0) {
      return null;
    }
    const year = parseInt(control.value, 10);
    const minYear = 1800;
    const maxYear = 2500;
    if (year >= minYear && year <= maxYear) {
      return null;
    } else {
      return { year: true };
    // OR return an object with min-max values
      return { year: {
        min: minYear,
        max: maxYear
       };
    }
  }

  onSubmit(mediaIem) {
    console.log(mediaIem);
    this.mediaItemService.add(mediaIem)
  }
}
```


### @Inject decorator
#### app.module.ts

```javascript

import { MediaItemService } from './media-item.service';

const lookupLists = {
  mediums: ['Movies', 'Series']
}

@NgModule({
  providers: [
    { provide: 'lookupListToken', useValue: lookupLists }
  ]
})
```

#### media-item-form.component.ts

```javascript

import { OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MediaItemService } from './media-item.service';

export class MediaItemFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private mediaItemService: MediaItemService,
    @Inject('lookupListToken') public lookupList
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      medium: this.formBuilder.control('Movies'),
      name: this.formBuilder.control('', Validators.compose([
        Validators.required,
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      category: this.formBuilder.control(''),
      year: this.formBuilder.control('', this.yearValidator)
    });
  }

  yearValidator(control: FormControl) {
    if(control.value.trim().length === 0) {
      return null;
    }
    const year = parseInt(control.value, 10);
    const minYear = 1800;
    const maxYear = 2500;
    if (year >= minYear && year <= maxYear) {
      return null;
    } else {
      return { year: true };
    // OR return an object with min-max values
      return { year: {
        min: minYear,
        max: maxYear
       };
    }
  }

  onSubmit(mediaIem) {
    console.log(mediaIem);
    this.mediaItemService.add(mediaIem)
  }
}
```

#### media-item-form.component.html

```html

<form
  [formGroup]="form"
  (ngSubmit)="onSubmit(form.value)">

  <select formControlName="medium" name="medium" id="medium">
    <option *ngFor="let medium of lookupLists.mediums" [value]="medium">{{medium}}</option>
  </select>

  <input
    formControlName="name"
    name="name"
    id="name">
  <div
    *ngIf="form.get('name').hasError('pattern')"
    class="error">
    Name has invalid characters
  </div>

  <input
    formControlName="year"
    name="year"
    id="year">
  <div
    *ngIf="form.get('year').hasError('year')"
    class="error">
    Year must be between 1900 and 2100
  </div>
  <!-- When returining an OBJECT -->
  <div
    *ngIf="form.get('year').errors a yearErrors"
    class="error">
    Year must be between {{ yearErrors.year.min }} and {{ yearErrors.year.max }}
  </div>

  <button type="submit" [disabled]="!form.valid">Save</button>
</form>
```



#####



### Injection Token

[Angular.io](https://angular.io/guide/lightweight-injection-tokens)

#### provider.ts

```javascript

import { InjectionToken } from '@angular/core';

export const lookupListToken = new InjectionToken('lookupListToken');

export const lookupLists = {
  mediums: ['Movies', 'Series']
}
```
### app.module.ts
```javascript
import { lookupListToken, lookupLists } from './provider';

@NgModule({
  providers: [
    { provide: lookupListToken, useValue: lookupLists }
  ]
})
```

#### media-item-form.component.ts

```javascript

import { OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MediaItemService } from './media-item.service';
import { lookupListToken, lookupLists } from './provider';

export class MediaItemFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private mediaItemService: MediaItemService,
    @Inject(lookupListToken) public lookupList
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      medium: this.formBuilder.control('Movies'),
      name: this.formBuilder.control('', Validators.compose([
        Validators.required,
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      category: this.formBuilder.control(''),
      year: this.formBuilder.control('', this.yearValidator)
    });
  }

  yearValidator(control: FormControl) {
    if(control.value.trim().length === 0) {
      return null;
    }
    const year = parseInt(control.value, 10);
    const minYear = 1800;
    const maxYear = 2500;
    if (year >= minYear && year <= maxYear) {
      return null;
    } else {
      return { year: true };
    // OR return an object with min-max values
      return { year: {
        min: minYear,
        max: maxYear
       };
    }
  }

  onSubmit(mediaIem) {
    console.log(mediaIem);
    this.mediaItemService.add(mediaIem)
  }
}
```

#### media-item-form.component.html

```html

<form
  [formGroup]="form"
  (ngSubmit)="onSubmit(form.value)">

  <select formControlName="medium" name="medium" id="medium">
    <option *ngFor="let medium of lookupLists.mediums" [value]="medium">{{medium}}</option>
  </select>

  <input
    formControlName="name"
    name="name"
    id="name">
  <div
    *ngIf="form.get('name').hasError('pattern')"
    class="error">
    Name has invalid characters
  </div>

  <input
    formControlName="year"
    name="year"
    id="year">
  <div
    *ngIf="form.get('year').hasError('year')"
    class="error">
    Year must be between 1900 and 2100
  </div>
  <!-- When returining an OBJECT -->
  <div
    *ngIf="form.get('year').errors a yearErrors"
    class="error">
    Year must be between {{ yearErrors.year.min }} and {{ yearErrors.year.max }}
  </div>

  <button type="submit" [disabled]="!form.valid">Save</button>
</form>
```