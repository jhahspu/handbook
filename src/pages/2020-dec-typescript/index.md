---
path: "/typescript"
date: "Dec '20"
title: "Typescript"
author: "jhahspu"
category: "JS"
---

# Modules // Example
```typescript
// accessors are only available when targeting ES5 or higher
tsc *.ts --target ES5 && node main.js

// like.component.ts
export class LikeComponent {

  constructor(private _likesCount: number, private _isSelected: boolean) { }

  onClick() {
    this._likesCount += (this._isSelected) ? -1 : 1;
    this._isSelected = !this._isSelected;

    // or
    if (this._isSelected) {
      this._likesCount --;
    } else {
      this._likesCount ++;
    }
    this._isSelected = !this._isSelected;
  }

  get likesCount() {
    return this._likesCount;
  }
  get isSelected() {
    return this._isSelected;
  }
}

// main.ts
import { LikeComponent } from './like.component';

let component = new LikeComponent(10, true);
component.onClick();
console.log(`likesCount: ${component.likesCount}, isSelected: ${component.isSelected}`);
```

# Modules
```typescript
// point.ts
export class Point {
  constructor(private _x?: number, private _y?:number) { }
  draw() {
    // ...
  }
}

// main.ts
import { Point } from './point';

let point = new Point(1, 2);
point.draw();
```

# Classes
```typescript
class Point {
  // access modifiers outside constructor: public, private, protected
  // private x: number; 
  // private y: number;

  // '?' optional parameter
  // access modifiers within constructor
  constructor(private _x?: number, private _y?: number) {
    // this.x = x;
    // this.y = y;
  }

  draw() {
    console.log('X: ' + this._x + ', Y: ' + this._y)
  }

  // getter
  get x() {
    return this._x;
  }

  //setter
  set x(value) {
    if (value < 0) {
      throw new Error('value cannot be less than 0')
    }
    this._x = value;
  }
}

// Obj = instance of class Point
let point = new Point(1, 2);
let x = point.x;
point.x = 10;
point.draw();
```

# Interfaces
```typescript
interface Point {
  x: number,
  y: number
}

let drawPoint = (point: Point) => {
  // ...
}

// For very simple cases use: Inline annotation
let drawPoint = (point: { x: number, y: number }) => {
  // ...
}

drawPoint({
  x: 1,
  y: 2
})
```

# Arrow Functions
```typescript
const arrowFunction = () => {
  // do stuff
}

// or lambda func
const lambdaExpression = arg => console.log(arg);
const lambdaExpression = () => console.log('message');
```

# Type Assertion
```typescript
let message;
message = 'abc';
let endWithC = (<string>message).endsWith('c');

// or
let alternativeWay = (message as string).endsWith('c');
```

# Types
```typescript
let a: number;
let b: string;
let c: boolean;
let d: any;
let e: number[] = [1, 2, 3];
let f: any[] = [1, 'a', true];

enum Colors { Red = 'value', Green = 2, Blue = true };
let backgroundColor = Colors.Red;
```


# Install
```powershell
npm install -g typescript

# version
tsc --version

# transpile code to js
tsc *.ts [file_name].js
```

# What is Typescript
- Superset of JavaScript
- Strong/Static typed (optional)
- Classes, Interfaces, Constructers, Access modifiers, Fields, Properties, etc
- Catch errors at compile time

