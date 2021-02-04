---
path: "/angular-forms"
date: "Feb '21"
title: "Angular Forms"
author: "jhahspu"
category: "angular"
---



[Angular Forms](https://angular.io/guide/forms-overview)


### Angular Forms

+ In-Out
+ Change Tracking
+ Validators
  - Built-in
  - Custom
  - Async
  - Form Object Representation
+ Template Driven - form logic is crafted in the template markup
+ Model Driven - form logic is crafted in the component class


#####


### Template Driven Forms

- Ease of use
- Simple
- Built using FormsModule

#### app.module.ts

```javascript

import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
  ]
})
```

#### media-item-form.component.html

```html

<form
  #sampleForm="ngForm"
  (ngSubmit)="onSubmit(sampleForm.value)">

  <select ngModel name="medium" id="medium">
    <option value="Movies">Movies</option>
    <option value="Series">Series</option>
  </select>

  <input
    ngModel
    name="name"
    id="name">

  <button type="submit">Save</button>
</form>
```

#### media-item-form.component.ts

```javascript

export class MediaItemFormComponent {
  onSubmit(formValue) {
    console.log(formValue)
  }
}
```


#####



### Model Driven Forms

- Full powered
- Form field contract
- Field validation rules
- Change tracking
- Can be unit tested without any UI layer
- Are built using the ReactiveFormsModule

#### app.module.ts

```javascript

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ReactiveFormsModule,
  ]
})
```

#### media-item-form.component.ts

```javascript

import { OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
export class MediaItemFormComponent implements OnInit {
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      medium: new FormControl('Movies'),
      name: new FormControl(''),
      category: new FormControl(''),
      year: new FormControl('')
    });
  }

  onSubmit(formValue) {
    console.log(formValue)
  }
}
```

#### media-item-form.component.html

```html

<form
  [formGroup]="form"
  (ngSubmit)="onSubmit(form.value)">

  <select formControlName="medium" name="medium" id="medium">
    <option value="Movies">Movies</option>
    <option value="Series">Series</option>
  </select>

  <input
    formControlName="name"
    name="name"
    id="name">

  <button type="submit">Save</button>
</form>
```


#####



### Built-in Validators

#### media-item-form.component.ts

```javascript

import { OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
export class MediaItemFormComponent implements OnInit {
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      medium: new FormControl('Movies'),
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      category: new FormControl(''),
      year: new FormControl('')
    });
  }

  onSubmit(formValue) {
    console.log(formValue)
  }
}
```

#### media-item-form.component.html

```html

<form
  [formGroup]="form"
  (ngSubmit)="onSubmit(form.value)">

  <select formControlName="medium" name="medium" id="medium">
    <option value="Movies">Movies</option>
    <option value="Series">Series</option>
  </select>

  <input
    formControlName="name"
    name="name"
    id="name">

  <button type="submit" [disabled]="!form.valid">Save</button>
</form>
```


#####


### Custom Validators

#### media-item-form.component.ts

```javascript

import { OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
export class MediaItemFormComponent implements OnInit {
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      medium: new FormControl('Movies'),
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      category: new FormControl(''),
      year: new FormControl('', this.yearValidator)
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

  onSubmit(formValue) {
    console.log(formValue)
  }
}
```


#####


### Error handling

#### media-item-form.component.html

```html

<form
  [formGroup]="form"
  (ngSubmit)="onSubmit(form.value)">

  <select formControlName="medium" name="medium" id="medium">
    <option value="Movies">Movies</option>
    <option value="Series">Series</option>
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

