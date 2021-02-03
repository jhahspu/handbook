---
path: "/sass-basics"
date: "Feb '21"
title: "Sass Basics"
author: "jhahspu"
category: "sass"
---



### Settings.json

- Live Sass compiler for VSCode by Glenn Marks

```json
"liveSassCompile.settings.formats": [
  {
    "format": "compressed",
    "extensionName": ".min.css"
  }
]
```

#####



### Variables

```scss
$baseColor: hsla(88, 50%, 50%, 1);
$border: 1px solid #223678;

// Usage
background-color: $baseColor;
border: $border;
```

#####



### Nesting

```scss
header {
   
  button {
    
    &:hover {

    }
  }
}
```

#####



### Imports

```scss
/* Saved as _header.scss
'_' underscore important */

@import './header';
```

#####



### Mixins

```scss
@mixin flexDisplay($direction, $bg-color) {
  display: flex;
  flex-direction: $direction;
  background-color: $bg-color;
}

// Usage
div {
  @include flexDisplay(column, brown);
}
div {
  @include flexDisplay(row, gray);
}


@mixin myDIV($name, $color, $color-hover) {
    .div-#{$name} {
        a {
            color: #{$color};
            &:focus, &:hover {
                color: #{$color-hover};
            }
        }
    }
}
```

#####



### Inherit style from element

```scss
header {
  ... styles
}
div {
  @extend header;
  ... styles
}
```

#####



### Calculations

```scss
div {
  width: $var + $var;
  height: 100vh - 5vh;
}
```

#####


### Class with wild card

```scss
.zoomed {
  &[class*=" aspect-"] {
    margin-bottom: $spacer * 4.0;
  }
}
```