---
path: "/angular-ngrx-example"
date: "Feb '21"
title: "NgRx Example"
author: "jhahspu"
category: "angular"
---


### JSON DB

#### [app_name]/db.json

```json

{
  "cars": [
    {
      "make": "Ford",
      "model": "Fusion Hybrid",
      "year": 2018,
      "color": "black",
      "price": 25000,
      "id": 1
    },
    {
      "make": "Tesla",
      "model": "S",
      "year": 2018,
      "color": "red",
      "price": 125000,
      "id": 2
    }
  ]
}
```


#####


### App State

#### src/app/app-state.ts

```javascript

import { Car } from './car-tool/models/car';

export interface AppState {
  cars: Car[];
  editCarId: number;
}
```


#####


### Actions

#### src/app/car-tool/car.actions.ts

```javascript

import { createAction, props } from '@ngrx/store';

import { Car } from './models/car';

export const refreshCarsRequest = createAction('[Car] Refresh Cars Request');

export const refreshCarsDone = createAction('[Car] Refresh Cars Done', props<{ cars: Car[] }>());

export const appendCarRequest = createAction('[Car] Append Car Request', props<{ car: Car }>());

export const replaceCarRequest = createAction('[Car] Replace Car Request', props<{ car: Car }>());

export const deleteCarRequest = createAction('[Car] Delete Car Request', props<{ carId: number }>());

export const editCar = createAction('[Car] Edit Car', props<{ carId: number }>());

export const cancelCar = createAction('[Car] Cancel Car');
```


#####


### Reducers

#### src/app/car-tool/car.reducers.ts

```javascript

import { createReducer, on } from '@ngrx/store';

import { refreshCarsDone, editCar, cancelCar  } from './car.actions';
import { Car } from './models/car';

export const carsReducer = createReducer<Car[]>([],
  on(refreshCarsDone, (_, action) => action.cars),
);

export const editCarIdReducer = createReducer<number>(-1,
  on(editCar, (_, action) => action.carId),
  on(cancelCar, () => -1),
  on(refreshCarsDone, () => -1),
);
```


#####


### Effects

#### src/app/car-tool/car.effects.ts

```javascript

import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';

import { CarsService } from './services/cars.service';
import {
  refreshCarsRequest, refreshCarsDone, appendCarRequest,
  replaceCarRequest, deleteCarRequest
} from './car.actions';

@Injectable()
export class CarEffects {

  constructor(
    private carsSvc: CarsService,
    private actions$: Actions,
  ) {}

  refreshCars$ = createEffect(() => this.actions$.pipe(
    ofType(refreshCarsRequest),
    switchMap(() => {
      return this.carsSvc.all().pipe(
        map(cars => refreshCarsDone({ cars })),
      );
    }),
  ));

  appendCar$ = createEffect(() => this.actions$.pipe(
    ofType(appendCarRequest),
    switchMap((action) => {
      return this.carsSvc.append(action.car).pipe(
        map(() => refreshCarsRequest()),
      );
    }),
  ));

  replaceCar$ = createEffect(() => this.actions$.pipe(
    ofType(replaceCarRequest),
    switchMap((action) => {
      return this.carsSvc.replace(action.car).pipe(
        map(() => refreshCarsRequest()),
      );
    }),
  ));

  deleteCar$ = createEffect(() => this.actions$.pipe(
    ofType(deleteCarRequest),
    switchMap((action) => {
      return this.carsSvc.delete(action.carId).pipe(
        map(() => refreshCarsRequest()),
      );
    }),
  ));
}
```


#####


### App Module

#### src/app/app.modules.ts

```javascript

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';


import { CarToolModule } from './car-tool/car-tool.module';
import { AppRoutingModule } from './app-routing.module';

import { carsReducer, editCarIdReducer } from './car-tool/car.reducers';
import { CarEffects } from './car-tool/car.effects';


import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      cars: carsReducer,
      editCarId: editCarIdReducer,
    }),
    EffectsModule.forRoot([ CarEffects ]),
    StoreDevtoolsModule.instrument(),
    CarToolModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```


#####


### Homepage

#### src/app/app.component.html

```html

<car-home></car-home>
```


#####


### Car-Tool Module

#### src/app/car-tool/car-tool.module.ts

```javascript

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';

import { CarHomeComponent } from './components/car-home/car-home.component';
import { CarTableComponent } from './components/car-table/car-table.component';
import { EditCarRowComponent } from './components/edit-car-row/edit-car-row.component';
import { ViewCarRowComponent } from './components/view-car-row/view-car-row.component';
import { CarFormComponent } from './components/car-form/car-form.component';

@NgModule({
  declarations: [
    CarHomeComponent, CarTableComponent, EditCarRowComponent,
    ViewCarRowComponent, CarFormComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule, HttpClientModule, SharedModule,
  ],
  exports: [CarHomeComponent],
})
export class CarToolModule { }
```


#####


### Car Model

#### src/app/car-tool/models/car.ts

```javascript

export interface Car {
  id?: number;
  make: string;
  model: string;
  year: number;
  color: string;
  price: number;
}
```


#####


### Car Service

#### src/app/car-tool/services/cars.service.ts

```javascript

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  _baseUrl = 'http://localhost:4250/cars';

  constructor(private httpClient: HttpClient) { }

  private getCollectionUrl() {
    return this._baseUrl;
  }

  private getElementUrl(elementId: any) {
    return this._baseUrl + '/' + encodeURIComponent(String(elementId));
  }

  all() {
    return this.httpClient.get<Car[]>(this.getCollectionUrl());
  }

  append(car: Car) {
    return this.httpClient.post<Car>(this.getCollectionUrl(), car);
  }

  replace(car: Car) {
    return this.httpClient.put<Car>(this.getElementUrl(car.id), car);
  }

  delete(carId: number) {
    return this.httpClient.delete<Car>(this.getElementUrl(carId));
  }
}
```


#####


### Car Home

#### src/app/car-tool/components/car-home/car-home.component.ts

```javascript

import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AppState } from '../../../app-state';
import { Car } from '../../models/car';
import {
  refreshCarsRequest,
  appendCarRequest,
  replaceCarRequest,
  deleteCarRequest,
  editCar,
  cancelCar
} from '../../car.actions';

@Component({
  selector: 'car-home',
  templateUrl: './car-home.component.html',
  styleUrls: ['./car-home.component.css']
})
export class CarHomeComponent implements OnInit {
  cars$ = this.store.pipe(select(state => state.cars));
  editCarId$ = this.store.pipe(select('editCarId'));

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(refreshCarsRequest());
  }

  doAppendCar(car: Car) {
    this.store.dispatch(appendCarRequest({ car }));
  }

  doReplaceCar(car: Car) {
    this.store.dispatch(replaceCarRequest({ car }));
  }

  doDeleteCar(carId: number) {
    this.store.dispatch(deleteCarRequest({ carId }));
  }

  doEditCar(carId: number) {
    this.store.dispatch(editCar({ carId }));
  }

  doCancelCar() {
    this.store.dispatch(cancelCar());
  }
}
```

#### 

```html

<tool-header headerText="Car Tool"></tool-header>

<car-table [cars]="cars$ | async" [editCarId]="editCarId$ | async"
  (editCar)="doEditCar($event)"
  (deleteCar)="doDeleteCar($event)"
  (saveCar)="doReplaceCar($event)"
  (cancelCar)="doCancelCar()"></car-table>

<car-form buttonText="Add Car" (submitCar)="doAppendCar($event)"></car-form>
```


#####


### Car Form

#### src/app/car-tool/components/car-form/car-form.component.ts

```javascript

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Car } from '../../models/car';


@Component({
  selector: 'car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent implements OnInit {

  @Input()
  buttonText = 'Submit Car';

  @Output()
  submitCar = new EventEmitter<Car>();

  carForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.carForm = this.fb.group({
      make: '',
      model: '',
      year: 1900,
      color: '',
      price: 0,
    });
  }

  doSubmitCar() {

    this.submitCar.emit({
      ...this.carForm.value,
    });

    this.carForm.setValue({
      make: '',
      model: '',
      year: 1900,
      color: '',
      price: 0,
    });

  }  

}
```

#### 

```html

<form [formGroup]="carForm">
    <div>
      <label for="make-input">Make:</label>
      <input type="text" id="make-input" formControlName="make">
    </div>
    <div>
      <label for="model-input">Model:</label>
      <input type="text" id="model-input" formControlName="model">
    </div>
    <div>
      <label for="year-input">Year:</label>
      <input type="number" id="year-input" formControlName="year">
    </div>
    <div>
      <label for="color-input">Color:</label>
      <input type="text" id="color-input" formControlName="color">
    </div>
    <div>
      <label for="price-input">Price:</label>
      <input type="number" id="price-input" formControlName="price">
    </div>
    <button (click)="doSubmitCar()">{{buttonText}}</button>
  </form>
```


#####


### Car Table

#### src/app/car-tool/components/car-table/car-table.component.ts

```javascript

import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Car } from '../../models/car';

@Component({
  selector: 'car-table',
  templateUrl: './car-table.component.html',
  styleUrls: ['./car-table.component.css'],
})
export class CarTableComponent {

  @Input()
  cars: Car[] = [];

  @Input()
  editCarId = 0;

  @Output()
  editCar = new EventEmitter<number>();

  @Output()
  deleteCar = new EventEmitter<number>();

  @Output()
  saveCar = new EventEmitter<Car>();

  @Output()
  cancelCar = new EventEmitter<void>();

  doEdit(carId: number) {
    this.editCar.emit(carId);
  }

  doDelete(carId: number) {
    this.deleteCar.emit(carId);
  }

  doSave(car: Car) {
    this.saveCar.emit(car);
  }

  doCancel() {
    this.cancelCar.emit();
  }

}
```

#### 

```html

<table>
  <thead>
    <tr>
      <th>Id</th>
      <th>Make</th>
      <th>Model</th>
      <th>Year</th>
      <th>Color</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    <ng-container *ngFor="let car of cars">
      <tr class="view-car-row"
        *ngIf="editCarId !== car.id"
        [car]="car" (editCar)="doEdit($event)"
        (deleteCar)="doDelete($event)" ></tr>
      <tr class="edit-car-row"
        *ngIf="editCarId === car.id"
        [car]="car" (saveCar)="doSave($event)"
        (cancelCar)="doCancel()" ></tr>
    </ng-container>
  </tbody>
</table>
```


#####


### View Car Row

#### src/app/car-tool/components/view-car-row/view-car-row.component.ts

```javascript

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Car } from '../../models/car';

@Component({
  selector: '.view-car-row',
  templateUrl: './view-car-row.component.html',
  styleUrls: ['./view-car-row.component.css']
})
export class ViewCarRowComponent implements OnInit {

  @Input()
  car: Car = null;

  @Output()
  editCar = new EventEmitter<number>();

  @Output()
  deleteCar = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  doEdit() {
    this.editCar.emit(this.car.id);
  }

  doDelete() {
    this.deleteCar.emit(this.car.id);
  }
}
```

#### src/app/car-tool/components/view-car-row/view-car-row.component.html

```html

<td>{{car.id}}</td>
<td>{{car.make}}</td>
<td>{{car.model}}</td>
<td>{{car.year}}</td>
<td>{{car.color}}</td>
<td>{{car.price}}</td>
<td>
  <button (click)="doEdit()">Edit</button>
  <button (click)="doDelete()">Delete</button>
</td>
```


#####


### Edit Car Row

#### src/app/car-tool/components/edit-car-row/edit-car-row.component.ts

```javascript

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Car } from '../../models/car';

@Component({
  selector: '.edit-car-row',
  templateUrl: './edit-car-row.component.html',
  styleUrls: ['./edit-car-row.component.css']
})
export class EditCarRowComponent implements OnInit {

  @Input()
  car: Car;

  @Output()
  saveCar = new EventEmitter<Car>();

  @Output()
  cancelCar = new EventEmitter<void>();

  editCarForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.editCarForm = this.fb.group({
      make: this.car.make,
      model: this.car.model,
      year: this.car.year,
      color: this.car.color,
      price: this.car.price,
    });
  }

  doSave() {
    this.saveCar.emit({
      ...this.editCarForm.value,
      id: this.car.id,
    });
  }

  doCancel() {
    this.cancelCar.emit();
  }

}
```

#### src/app/car-tool/components/edit-car-row/edit-car-row.component.html

```html

<ng-container [formGroup]="editCarForm">
  <td>{{car.id}}</td>
  <td><input type="text" formControlName="make"></td>
  <td><input type="text" formControlName="model"></td>
  <td><input type="number" formControlName="year"></td>
  <td><input type="text" formControlName="color"></td>
  <td><input type="number" formControlName="price"></td>
  <td>
    <button (click)="doSave()">Save</button>
    <button (click)="doCancel()">Cancel</button>
  </td>
</ng-container>
```
