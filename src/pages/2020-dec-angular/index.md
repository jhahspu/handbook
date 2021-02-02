---
path: "/angular-basics"
date: "Dec '20"
title: "Angular Basics"
author: "jhahspu"
category: "angular"
---


### Setup
```javascript
npm i -g @angular/cli

// create new app
ng new [project_name]

// serve on default port 4200
ng serve

// generate component
ng g c components/[component_name]

// generate service
ng g s services/[service_name]

// generate guard
ng g guard guards/[guard_name]

// if the ngcc ERRORs out add it to 'package.json':
"scripts": {
    ...
    "postinstall": "ngcc"
}

// run:
npm install

// serve again and it should work
```


#####


### Directives
- Structural directives: modify the structure of DOM
- Attribute directives: modify the properties of DOM objects


#####


### Safe Traversal Operator

```javascript
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
    <span *ngIf="task.assignee">{{ task.assignee.name }}</span>
    <!-- OR if assignee is null or undefined the assignee will be ignored-->
    <span>{{ task.assignee?.name }}</span>
    `
})
export class AppComponent {
    task = {
        title: 'Review applications',
        assignee: {
            name: 'John Q'
        }
    }
}
```


#####


### ngStyle

```javascript
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
    <button 
        [style.backgroundColor]="canSave ? 'blue'; 'gray'"
        [style.color]="canSave ? 'white' : 'black'"
        [style.fontWeight]="canSave ? 'bold' : 'normal'"
        
        [ngStyle]="{
            'backgroundColor' : canSave ? 'blue' : 'gray',
            'color' : canSave ? 'white' : 'black'
        }">
    Save
    </button>
    `
})
export class AppComponent {
    canSave = true;
}
```


#####


### ngClass
```javascript
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
    <span
        class="glyphicon"
        [ngClass]="{
            'glyphicon-star': isSelected,
            'glyphicons-star-empty': !isSelected
        }">
        (click)="onClick()"
    </span>
    `
})
export class AppComponent {
    
}
```


#####


### ngFor and trackBy - for large list and complex markup
```javascript
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
    <button (click)="loadPeople()">Load People</button>
    <ul>
        <li *ngFor="let person of people; trackBy: trackPerson">
            {{ person.name }}
        </li>
    </ul>
    `
})
export class AppComponent {
    people;

    loadPeople() {
        people = [
            { id: 5343, name: "John"},
            { id: 6563, name: "Ana"},
            { id: 2343, name: "Tom"}
        ];
    }

    trackPerson(index, person) {
        return person ? person.id : undefined;
    }
}
```


#####


### ngFor and Change Detection
[Angular: ngForOf](https://angular.io/api/common/NgForOf)

```javascript
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
    <button (click)="onAdd()">Add Sam</button>
    <ul>
        <li *ngFor="let person of people; index as i; even as isEven">
            {{ i }} - {{ person.name }} <span *ngIf="isEven">(Even Row)</span> <button (click)="onRemove(person)">Remove</button>
        </li>
    </ul>
    `
})
export class AppComponent {
    people = [
        { id: 5343, name: "John"},
        { id: 6563, name: "Ana"},
        { id: 2343, name: "Tom"}
    ];

    onAdd() {
        this.people.push({ id: 6545, name: "Sam" });
    }

    onRemove(person) {
        let index = this.people.indexOf(person);
        this.people.splice(index, 1);
    }
}
```


#####


### ngSwitchCase - tab-like containers
```javascript
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
    <ul>
        <li [class.active]="viewMode='map'" (click)="viewMode = 'map'">Map</li>
        <li [class.active]="viewMode='list'" (click)="viewMode = 'list'">List</li>
    </ul>
    <div [ngSwitch]="viewMode">
        <div *ngSwitchCase="'map'">Map Content</div> 
        <div *ngSwitchCase="'list'">List Content</div>
        <div *ngSwitchDefault>Otherwise</div>
    </div>
    `
})
export class AppComponent {
    viewMode = 'map';
}
```


#####


### Hidden attribute - for small element trees
```javascript
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
    <div [hidden]="list.lenth == 0">
        List: 
    </div>
    <div [hidden]="list.lenth > 0">
        List empty 
    </div>
    `
})
export class AppComponent {
    list = [1, 2];
}
```


#####


### ngIf directive - for large element trees (time consideration)
```javascript
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
    <div *ngIf="list.length > 0; then showList else emptyList"></div>
    <ng-template #showList>List:</ng-template>
    <ng-template #emptyListe>List is empty</ng-template>
    `
})
export class AppComponent {
    list = [1, 2];
}
```


#####


## Re-usable Components


### ngContainer
#### sample.component.html
```html
<div class="panel panel-default">
    <div class="panel-heading">
        <ng-content select=".heading"></ng-content>
    </div>
    <div class="panel-body">
        <ng-content select=".body"></ng-content>
    </div>
</div>
```


#### app.component.html
```html
<sample-component>
    <ng-container>Heading</ng-container>
    <div class="body">
        <h2>Body</h2>
        <p>Some basic text in a paragraph</p>
    </div>
</sample-component>
```


#####


### Output Properties
#### app.component.html

```html
<!-- If passing events, include the "$event" in the method -->
<div [isFavorite]="post.isFavorite" (isChanged)="onFavoriteChanged($event)"></div>
```


#### app.component.ts with Alias
```javascript
import { Component } from '@angular/core';
import { SampleWhatChanged } from './sample.component';

@Component({
    selector: 'app-root',
    template: './app.component.html'
})
export class AppComponent {
    post = {
        title: "Title",
        isFavorite: true,
    }

    // receiving events from component
    onFavoriteChanged(whatChanged) {
        console.log("Something changed: ", whatChanged);
    }

    // receiving obj ev from component
    onFavoriteChanged(whatChanged: SampleWhatChanged) {
        console.log("Something changed: ", whatChanged);
    }
}
```


#### sample.component.ts with Alias and Interface
```javascript
import { Component, Input, Output, EventEmmiter } from '@angular/core';

@Component({
    selector: 'sample',
    templateUrl: './sample.component.html',
    styleUrls: ['./sample.component.css']
})
export class SampleComponent {
    @Input('isFavorite') isFavorite = boolean;
    
    @Output('isChanged') change = new EventEmitter();

    onClick() {
        this.isFavorite = !this.isFavorite;
        // if passing events, than include in the emit
        this.change.emit(this.isFavorite);
        // pass obj
        this.change.emit({ newValue: this.isFavorite });
    }
}

export interface SampleWhatChanged {
    newValue: boolean;
}
```


#####


### Input Properties
#### app.component.html
```html
<div [isFavorite]="post.isFavorite"></div>
```


#### sample.component.html
```html
<span
  class="glyphicon"
  [class.glyphicon-star]="isFavorite"
  [class.glyphicon-star-empty]="!isFavorite"
  (click)="onClick()">
</span>
```


#### sample.component.ts with Alias
```javascript
import { Component, Input } from '@angular/core';

@Component({
    selector: 'sample',
    templateUrl: './sample.component.html',
    styleUrls: ['./sample.component.css']
})
export class SampleComponent {
    @Input('isFavorite') isFavorite = boolean;

    onClick() {
        this.isFavorite = !this.isFavorite;
    }
}
```


#### sample.component.ts Variant 2
```javascript
import { Component } from '@angular/core';

@Component({
    selector: 'sample',
    templateUrl: './sample.component.html',
    styleUrls: ['./sample.component.css'],
    // when refactoring this needs to be changed manually
    inputs: ['isFavorite']
})
export class SampleComponent {
    isFavorite = boolean;

    onClick() {
        this.isFavorite = !this.isFavorite;
    }
}
```


#####


### Displaying Data and Handling Events
#### Custom Pipes
#### Create summary.pipe.ts in the app folder
```javascript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'summary'
})
export class SummaryPipe implements PipeTransform {
    transform(value: string, limit?: number) {
        if (!value)
            return null;
        let actualLimit = (limit) ? limit : 50;
        return value.substr(0, actualLimit) + ' ...';
    }
}
```


#### Register in app.module
```javascript
import { SummaryPipe } from './summary.pipe';
...

@NgModule({
    declarations: [
        ...
        SummaryPipe,
        ...
    ]
})
```


### Usage:
```javascript
import { Component } from '@angular/core';

@Component({
    selector: 'sample',
    template: `
        {{ text | summary:10 }}
    `
})
export class SampleComponent {
    text = `
    Some random text too long to display in the summary.
    `
}
```


#####


### Pipes
[Angular Date Pipes](https://angular.io/api/common/DatePipe)
```javascript
import { Component } from '@angular/core';

@Component({
    selector: 'sample',
    template: `
        {{ list.title | uppercase | lowercase }} <br/>
        {{ list.rating | number:'1.2-2' }} <br/> // 4.47
        {{ list.rating | number:'2.1-1' }} <br/> // 04.5
        {{ list.students | number }} <br/> // 6,789
        {{ list.price | currency:'AUD'}} <br/> // AUD5.67
        {{ list.price | currency:'AUD':true:'3.2-2' }} <br/> // $A005.67
        {{ list.releaseDate | date:'shortDate' }} <br/> // 12/24/2020
    `
})
export class SampleComponent {
    list = {
        title: "Sample title goes here",
        rating: 4.4746,
        students: 6789,
        price: 5.67,
        releaseDate: new Date(2020, 12, 24)
    }
}
```


#####


### Two-Way Binding
```javascript
// to use ngModel import {FormsModule} from '@angular/forms' in app.module.ts
// register 'FormsModule' in 'imports'

import { Component } from '@angular/core';

@Component({
    selector: 'sample',
    template: `<input [value]="email" (keyup.enter)="email = $event.target.value; onKeyUp()" />`
    // boxed banana to way binding
    template: `<input [(ngModel)]="email" (keyup.enter)="onKeyUp()" />`
})
export class SampleComponent {
    email = "sample@email.com";

    onKeyUp() {
        console.log(this.email);
    }
}
```


#####


### Template Variables
```javascript
import { Component } from '@angular/core';

@Component({
    selector: 'sample',
    template: `<input #inputVal (keyup.enter)="onKeyUp(inputVal.value)" />`
})
export class SampleComponent {
    onKeyUp(inputVal) {
        console.log(inputVal);
    }
}
```


#####


### Event Filtering
```javascript
import { Component } from '@angular/core';

@Component({
    selector: 'sample',
    template: `<input (keyup.enter)="onKeyUp()" />`
})
export class SampleComponent {
    onKeyUp() {
        console.log("enter was pressed");
    }
}
```


#####


### Event Binding
```javascript
import { Component } from '@angular/core';

@Component({
    selector: 'sample',
    template: `<button (click)="onSave($event)">Save</button>`
})
export class SampleComponent {
    onSave($event) {
        // prevent Event Bubbling
        $event.stopPropagation();
        console.log("Button was clicked, onSave method was called", $event);
    }
}
```


#####


### Style Binding
```javascript
import { Component } from '@angular/core';

@Component({
    selector: 'sample',
    template: `<button [style.backgroundColor="isActive ? 'blue': 'grey'"]>Save</button>`
})
export class SampleComponent {
    // based on the value of "isActive" the backgroundColor prop will chage
    isActive = true;
}
```


#####


### Class Binding
```javascript
import { Component } from '@angular/core';

@Component({
    selector: 'sample',
    template: `<button [class.active="isActive"]>Save</button>`
})
export class SampleComponent {
    // "active" will be toggled based on the value of "isActive"
    isActive = true;
}
```


#####


### Attribute Binding
- binding a property of the DOM object and not the attribute of the html element
- in most cases the html attr have a 1:1 mapping with DOM properties
- it is possible to target html attributes: **[attr.colspan]**
- [DOM props](https://www.w3schools.com/jsref/dom_obj_all.asp)

```javascript
import { Component } from '@angular/core';

@Component({
    selector: 'sample',
    template: `
    <img [src]="imageURL" />
    <table>
        <tr>
            <td [attr.colspan="colSpan"]></td>
        </tr>
    </table>
    `
})
export class SampleComponent {
    imageUrl = "https://picsum.photos/id/333/400.webp";
    colSpan = 2;

}
```


#####


### Property Binding
- Property binding is one way, component -> dom
- Interpolation is best for dynamic content (text) in headings, divs, lists, etc

```javascript
import { Component } from '@angular/core';

@Component({
    selector: 'sample',
    template: `
    <h2>{{ title }}</h2>
    <h2 [textContent]="title"></h2>

    <img src="{{ imageURL }}" />
    <img [src]="imageURL" />
    `
})
export class SampleComponent {
    title = "Sample Title";
    imageUrl = "https://picsum.photos/id/333/400.webp";

}
```


#####


### Services


#### Create service as sample.service.ts
```javascript
export class SampleService {
    getItems() {
        return ["item 1", "item 2"];
    }
}
```


### Using the service in the components
```javascript
import { Component } from '@angular/core';
import { SampleService } from './sample.service';

// decorator function
@Component({
    selector: 'sample',
    template: `
    <h2>{{ getTitle() }}</h2>
    <ul>
        <li *ngFor="let item of items">{{ item }}</li>
    </ul>
    `
})
export class SampleComponent {
    title = "Sample Title";
    items;

    constructor(service: SampleService) {
        this.items = service.getItems():
    }
}
```


#### Register dependency in app.module.ts
```javascript
import { SampleService } from './sample.service';
...

@NgModule({
    ...
    providers: [
        SampleService
    ],
    ...
})
```


#####


### Templates and Directives
```javascript
import { Component } from '@angular/core';

// decorator function
@Component({
    selector: 'sample',
    // {{  }} string interpolation
    template: `<h2>{{ "Title: " + title }}</h2>`
    // or 
    template: `
    <h2>{{ getTitle() }}</h2>
    <ul>
        <li *ngFor="let item of items">{{ item }}</li>
    </ul>
    `
    // '*' prefix for directives that modify DOM
})
export class SampleComponent {
    title = "Sample Title";
    items = ["item 1", "item 2"];

    getTitle() {
        return this.title;
    }
}
```


#####


### Components
#### Create component sample.component.ts
```javascript
import { Component } from '@angular/core';

// decorator function
@Component({
    selector: 'sample',
    template: '<h2>Sample Component</h2>'
})
export class SampleComponent {

}
```


#### Register component in app.module.ts
```javascript
import { SampleComponent } from './sample.component';
...

@NgModule({
    declarations: [
        ...
        SampleComponent,
        ...
    ]
})
```

### Add element to HTML markup app.component.html
```javascript
...
<sample></sample>
...
// will render:
// <courser>
//   <h2>Sample component</h2>
// </courses>
```


#####


### Bootstrap
#### SCSS
```scss
@import "~bootstrap/dist/css/bootstrap.css";
```


### Usage
```javascript
import { Component } from '@angular/core';

@Component({
    selector: 'sample',
    template: `<button class="btn btn-primary">Save</button>`
})
export class SampleComponent {
}
```

### Bootstrap Setup
```javascript
npm install bootstrap --save

// package.json
"bootstrap": "^x.y.z"
// x = major // y: minor // z: patch
// ^ = use most recent major version
```