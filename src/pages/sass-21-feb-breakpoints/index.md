---
path: "/sass-breakpoints"
date: "Feb '21"
title: "Sass Breakpoints"
author: "jhahspu"
category: "sass"
---


### Breakpoints with Mixins

```scss

@mixin for-size($range) {
  $phone-upper-boundary: 600px;
  $tablet-portrait-upper-boundary: 900px;
  $tablet-landscape-upper-boundary: 1200px;
  $desktop-upper-boundary: 1800px;

  @if $range == phone-only {
    @media (max-width: #{$phone-upper-boundary - 1}) { @content; }
  } @else if $range == tablet-portrait-up {
    @media (min-width: $phone-upper-boundary) { @content; }
  } @else if $range == tablet-landscape-up {
    @media (min-width: $tablet-portrait-upper-boundary) { @content; }
  } @else if $range == desktop-up {
    @media (min-width: $tablet-landscape-upper-boundary) { @content; }
  } @else if $range == big-desktop-up {
    @media (min-width: $desktop-upper-boundary) { @content; }
  }
}

// usage
.my-box {
  padding: 10px;
  
  @include for-size(desktop-up) {
    padding: 20px;
  }
}
```

#####



### Breakpoints

```scss

/* (320x480) iPhone (Original, 3G, 3GS) */
@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {}
/* (320x480) Smartphone, Portrait */
@media only screen and (device-width: 320px) and (orientation: portrait) {}
/* (320x480) Smartphone, Landscape */
@media only screen and (device-width: 480px) and (orientation: landscape) {}
/* (480x800) Android */
@media only screen and (min-device-width: 480px) and (max-device-width: 800px) {}
/* (640x960) iPhone 4 & 4S */
@media only screen and (min-device-width: 640px) and (max-device-width: 960px) {}
/* (720x1280) Galaxy Nexus, WXGA */
@media only screen and (min-device-width: 720px) and (max-device-width: 1280px) {}
/* (720x1280) Galaxy Nexus, Landscape */
@media only screen and (min-device-width: 720px) and (max-device-width: 1280px) and (orientation: landscape) {}
/* (1024x768) iPad 1 & 2, XGA */
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {}
/* (768x1024) iPad 1 & 2, Portrait */
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) {}
/* (1024x768) iPad 1 & 2, Landscape */
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {}
/* (2048x1536) iPad 3 */
@media only screen and (min-device-width: 1536px) and (max-device-width: 2048px) {}
/* (1280x720) Galaxy Note 2, WXGA */
@media only screen and (min-device-width: 720px) and (max-device-width: 1280px) {}
/* (1366x768) WXGA Display */
@media  screen and (max-width: 1366px) {}
/* (1280x1024) SXGA Display */
@media  screen and (max-width: 1280px) {}
/* (1440x900) WXGA+ Display */
@media  screen and (max-width: 1440px) {}
/* (1680x1050) WSXGA+ Display */
@media  screen and (max-width: 1680px) {}
/* (1920x1080) Full HD Display */
@media  screen and (max-width: 1920px) {}
/* (1600x900) HD+ Display */
@media  screen and (max-width: 1600px) {}
```


