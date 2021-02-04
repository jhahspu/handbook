---
path: "/angular-http"
date: "Feb '21"
title: "Angular HTTP"
author: "jhahspu"
category: "angular"
---


[Angular Http Guide](https://angular.io/guide/http)


### GET calls

#### app.module.ts

```javascript

import { HttpClientModule } from '@angular/common/http';
@NgModule({
  imports: [
    HttpClientModule
  ]
})
```

#### media-item.service.ts

```javascript

import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { map, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaItemService {

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<MediaItemResponse>('mediaitems')
      .pipe(map(response => { return respones.mediaItems; }));
  }

  add(mediaItem) {
    this.mediaItems.push(mediaItem);
  }

  delete(mediaItem) {

  }
}

interface MediaItem {
  id: number;
  name: string;
  medium: string;
  category: string;
  year: number;
  watchedOn: number;
  isFavorite: boolean;
}

interface MediaItemResponse {
  mediaItems: MediaItem[];
}
```

#### media-item-list.component.ts

```javascript

import { Component, OnInit } from '@angular/core';
import { MediaItemService } from './media-item.service';

export class MediaItemList() implements OnInit {

  mediaItems;

  constructor(private mediaItemService: MediaItemService) {}

  ngOnInit() {
    this.mediaItemService.get()
      .subscribe(mediaItems => {
        this.mediaItems = mediaItems;
      });
  }

  onMediaItemDelete(mediaItem) {
    this.mediaItemService.delete(mediaItem);
  }
}
```


#####


### Using search params in GET calls

#### media-item.service.ts

```javascript

import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { map, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaItemService {

  constructor(private http: HttpClient) {}

  get(medium) {
    const getOptions = {
      params: { medium }
    };
    return this.http.get<MediaItemResponse>('mediaitems', getOptions)
      .pipe(
        map((response: MediaItemsResponse) => { return respones.mediaItems; })
      );
  }

  add(mediaItem) {
    this.mediaItems.push(mediaItem);
  }

  delete(mediaItem) {

  }
  
}

interface MediaItem {
  id: number;
  name: string;
  medium: string;
  category: string;
  year: number;
  watchedOn: number;
  isFavorite: boolean;
}

interface MediaItemResponse {
  mediaItems: MediaItem[];
}
```

#### media-item-list.component.ts

```javascript

import { Component, OnInit } from '@angular/core';
import { MediaItemService } from './media-item.service';

export class MediaItemList() implements OnInit {
  medium: '';
  mediaItems: MediaItem[];

  constructor(private mediaItemService: MediaItemService) {}

  ngOnInit() {
    this.getMediaItems(this.medium);
  }

  onMediaItemDelete(mediaItem) {
    this.mediaItemService.delete(mediaItem);
  }

  getMediaItems(medium: string) {
    this.medium = medium;
    this.mediaItemService.get(medium)
      .subscribe(mediaItems => {
        this.mediaItems = mediaItems;
      });
  }
}
```


#####



### Using HttpClient for POST, PUT, DELETE

#### media-item.service.ts

```javascript

import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { map, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaItemService {

  constructor(private http: HttpClient) {}

  get(medium) {
    const getOptions = {
      params: { medium }
    };
    return this.http.get<MediaItemResponse>('mediaitems', getOptions)
      .pipe(
        map((response: MediaItemsResponse) => { return respones.mediaItems; })
      );
  }

  add(mediaItem) {
    return this.http.post('mediaitems', mediaItem);
  }

  delete(mediaItem) {
    return this.http.delete(`mediaitems/${mediaItem.id}`);
  }
  
}

interface MediaItem {
  id: number;
  name: string;
  medium: string;
  category: string;
  year: number;
  watchedOn: number;
  isFavorite: boolean;
}

interface MediaItemResponse {
  mediaItems: MediaItem[];
}
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
    this.mediaItemService.add(mediaIem)
      .subscribe();
  }
}
```

#### media-item-list.component.ts

```javascript

import { Component, OnInit } from '@angular/core';
import { MediaItemService } from './media-item.service';

export class MediaItemList() implements OnInit {
  medium: '';
  mediaItems: MediaItem[];

  constructor(private mediaItemService: MediaItemService) {}

  ngOnInit() {
    this.getMediaItems(this.medium);
  }

  onMediaItemDelete(mediaItem) {
    this.mediaItemService.delete(mediaItem)
      .subscribe(() => {
        this.getMediaItems(this.medium);
      });
  }

  getMediaItems(medium: string) {
    this.medium = medium;
    this.mediaItemService.get(medium)
      .subscribe(mediaItems => {
        this.mediaItems = mediaItems;
      });
  }
}
```


#####


### Http Errors

#### media-item.service.ts

```javascript

import { Injectable } from '@angular/core';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { map, pipe, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaItemService {

  constructor(private http: HttpClient) {}

  get(medium) {
    const getOptions = {
      params: { medium }
    };
    return this.http.get<MediaItemResponse>('mediaitems', getOptions)
      .pipe(
        map((response: MediaItemsResponse) => { return respones.mediaItems; }),
        catchError(this.handleError);
      );
  }

  add(mediaItem) {
    return this.http.post('mediaitems', mediaItem)
      .pipe(catchError(this.handleError));
  }

  delete(mediaItem) {
    return this.http.delete(`mediaitems/${mediaItem.id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error.message);
    return throwError('Data error occurred, please try again');
  }
  
}

interface MediaItem {
  id: number;
  name: string;
  medium: string;
  category: string;
  year: number;
  watchedOn: number;
  isFavorite: boolean;
}

interface MediaItemResponse {
  mediaItems: MediaItem[];
}
```
