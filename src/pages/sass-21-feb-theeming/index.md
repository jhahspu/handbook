---
path: "/sass-theeming"
date: "Feb '21"
title: "Sass Theeming"
author: "jhahspu"
category: "sass"
---



### Prefers Color Scheme - CSS

```scss

.day   { background: #eee; color: black; }
.night { background: #333; color: white; }

@media (prefers-color-scheme: dark) {
  .day.dark-scheme   { background:  #333; color: white; }
  .night.dark-scheme { background: black; color:  #ddd; }
}

@media (prefers-color-scheme: light) {
  .day.light-scheme   { background: white; color:  #555; }
  .night.light-scheme { background:  #eee; color: black; }
}

.day, .night {
  display: inline-block;
  padding: 1em;
  width: 7em;
  height: 2em;
  vertical-align: middle;
}
```


#####



### Themes Sass

```scss

$theme-1: (
   container: (
       bg: #e4ada7,
       color: #000,
       border-color: #000
   ),
   left: (
       bg: #d88880,
       color: #fff,
       height: 100%,
       width: 69%
   ),
   right: (
       bg: #cc6359,
       color: #fff,
       height: 100%,
       width: 29%
   ),
   button: (
       bg: #481b16,
       color: #fff
   )
);

$theme-2: (
   container: (
       bg: #f7eb80,
       color: #000,
       border-color: #000
   ),
   left: (
       bg: #497265,
       color: #fff,
       height: 100%,
       width: 69%
   ),
   right: (
       bg: #82aa91,
       color: #fff,
       height: 100%,
       width: 29%
   ),
   button: (
       bg: #bc6a49,
       color: #fff
   )
);

// @import 'theme-1';
// @import 'theme-2';
// @import 'theme-3';

@mixin themable($theme-name, $theme-map) {
	.#{$theme-name} {
			.container {
				transition: all .2s ease-in-out;
					.left, .right {
							font-size: 2rem;
							transition: all .2s ease-in-out;
					}
			}

			.container .right {
					position: relative
			}

			.button {
					border: 0;
					border-radius: 10px;
					bottom: 10px;
					cursor: pointer;
					font-size: 1rem;
					font-weight: bold;
					padding: 1em 2em;
					position: absolute;
					right: 10px;
					transition: all .2s ease-in-out;
			}

			// Loop through each of the keys (sections)
			@each $section, $map in $theme-map {
					@if ($section == container) {
							.container {
									background-color: map-get($map, bg);
									border: 1px solid map-get($map, border-color);
									display: flex;
									height: 500px;
									justify-content: space-between;
									margin: 0 auto;
									padding: 1em;
									width: 50%;
							}
					} @else {
							.#{$section} {
									background-color: map-get($map, bg);
									color: map-get($map, color);

									@if ($section != button) {
										height: map-get($map, height);
										width: map-get($map, width);
									} @else {
											&:hover {
													background-color: lighten(map-get($map, bg), 20%);
											}
									}
							}
					}
			}
	}
}

@include themable(theme-1, $theme-1);
@include themable(theme-2, $theme-2);
```


#####



### Prefers Color Scheme Sass

```scss

$dark-theme: "dark-theme";
$light-theme: "light-theme";

$primary-color-dark: "primary-color-dark";
$primary-color: "primary-color";
$primary-color-light: "primary-color-light";
$primary-color-text: "primary-color-text";
$accent-color: "accent-color";
$primary-text-color: "primary-text-color";
$secondary-text-color: "secondary-text-color";
$divider-color: "divider-color";
$general-background: "general-background";
$general-background-light: "general-background-light";
/* ...other color keys... */

$themes: (
  $light-theme: (
    $primary-color-dark: #303F9F,
    $primary-color: #3F51B5,
    $primary-color-light: #DFDFF1,
    $primary-color-text: #FFFFFF,
    $accent-color: #0F67FF,
    $primary-text-color: #151515,
    $secondary-text-color: #575757,
    $divider-color: #BDBDBD,
    $general-background: #FAFAFA,
    $general-background-light: #FFFFFF,
    /* ...other color keys with HEX values... */
  ),
  $dark-theme: (
    $primary-color-dark: #303F9F,
    $primary-color: #3F51B5,
    $primary-color-light: #DFDFF1,
    $primary-color-text: #FFFFFF,
    $accent-color: #4fA7ff,
    $primary-text-color: #d7d7d8,
    $secondary-text-color: #A6A6A6,
    $divider-color: #575757,
    $general-background: #181918,
    $general-background-light: #363636,
    /* ...other color keys with HEX values... */
  )
);

@mixin themeProperty($theme, $property, $color, $additionalPropertiesPositionIsFront, $additionalProperties) {
  @if $additionalPropertiesPositionIsFront {
    #{$property}: unquote($additionalProperties + ' ' + map-get($theme, $color));
  } @else {
    #{$property}: unquote(map-get($theme, $color) + ' ' + $additionalProperties);
  }
}

@mixin theme($property, $color, $additionalPropertiesPositionIsFront: false, $additionalProperties: '') {
  $light: map-get($themes, $light-theme);
  $dark: map-get($themes, $dark-theme);
  
  @include themeProperty($light, $property, $color, $additionalPropertiesPositionIsFront, $additionalProperties);

  @media (prefers-color-scheme: dark) {
    @include themeProperty($dark, $property, $color, $additionalPropertiesPositionIsFront, $additionalProperties);
  }
}
```