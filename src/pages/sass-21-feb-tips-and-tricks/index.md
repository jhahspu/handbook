---
path: "/sass-tips-and-tricks"
date: "Feb '21"
title: "Sass Tips & Tricks"
author: "jhahspu"
category: "sass"
---



### Page & Print and User Theme

```scss

@page {
	size: A4;
	margin: 5mm;
}

@media print {
	.no-print,
	.no-print > * {
		display: none !important;
	}
}
```


#####



### Center anything with Grid

[CodePen Link](https://codepen.io/jhahspu/pen/ExyxQXB)

```scss

display: grid;
  place-items: center;
```


#####



### Deconstructive Pancake - Flex

[CodePen Link](https://codepen.io/jhahspu/pen/oNLNEPL)

- auto-resizing flex boxes with max width of 150px 

```scss

.parent {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.children {
  flex: 1 1 150px; /* Stretching */
  flex: 0 1 150px; /* No Stretching */
  margin: 5px;
}
```


#####



### Sidebar with min width - Grid

[CodePen Link](https://codepen.io/jhahspu/pen/qBNBoEq)

- Sidebar with <base> width, or 25% of the viewport 

```scss

.parent {
  display: grid;
  grid-template-columns: minmax(150px, 25%) 1fr;
}
```


#####



### Pancake Stack - Grid

- here the header and footer will have auto size and main will fill the space between 

```scss

.parent {
  display: grid;
  grid-template-rows: auto 1fr auto;
}
```


#####



### Holy Grail Layout - Grid

```scss

.parent {
  display: grid;
  /* '/' is the delimiter between rows and columns */
  grid-template: auto 1fr auto / auto 1fr auto;
}
header,
footer {
  grid-column: 1/4;
}
.left-side {
  grid-column: 1/2;
}
main {
  grid-column: 2/3;
}
.right-side {
  grid-column: 3/4;
}
```


#####



### 12-Span Grid

```scss

.parent {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}
.span-12 {
  grid-column: 1/13;
}
.span-6 {
  grid-column: 1/7;
}
.span-4 {
  grid-column: 3/9;
}
```


#####



### RAM (Repeat, Auto, MinMax)

grid-template-columns: repeat(auto-fit or auto-fill, minmax( [base], 1fr ) ) 

```scss

.parent {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  // OR
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
}
```


#####



### Cards - Line Up - Flex

- __justify-content: space-between__

```scss

.parent {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
}
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
}
```


#####



### Clamp

- clamp( [min], [actual], [max] ) 

```scss

.parent {
  display: grid;
  place-items: center;
}
.card {
  width: clamp(26ch, 50%, 46ch);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
}
```


#####



### Aspect ratio

```scss

.parent {
  display: grid;
  place-items: center;
}
.visual {
  aspect-ratio: 16/9;
}
.child {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
}
```


#####



### Two Lines Title

```scss

h3 {
  height: 2.4rem;
  margin: .75rem 0;
  padding: 0 0.75rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  word-break: break-word;
  line-height: 1.2rem;
  font-size: 1.2rem;
  font-weight: 400;
  text-align: center;
}
```