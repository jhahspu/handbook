---
path: "/gatsby-basics"
date: "Feb '21"
title: "Gatsby Basics"
author: "jhahspu"
category: "gatsby"
---

[Gatsby Docs](https://www.gatsbyjs.com/docs/)


### Setup and CLI commands

```powershell
npm install -g gatsby-cli

# Create new Gatsby project.
gatsby new [project_name]

# Start development server. Watches files, rebuilds, and hot reloads if something changes
gatsby develop

# available commands
gatsby --help

# Build a Gatsby project.
gatsby build

# Serve previously built Gatsby site.
gatsby serve

# Get environment information for debugging and issue reporting
gatsby info

# Wipe the local gatsby environment including built assets and cache
gatsby clean

# Get a node repl with context of Gatsby environment, see (https://www.gatsbyjs.com/docs/gatsby-repl/)
gatsby repl

# [EXPERIMENTAL] Run a recipe
gatsby recipes [recipe]

# Useful commands relating to Gatsby plugins
gatsby plugin <cmd> [plugins...]


# Enable or disable Gatsby anonymous analytics collection.
gatsby telemetry

#  View or set your gatsby-cli configuration settings.
gatsby options [cmd] [key] [value]

Options:
  --verbose                Turn on verbose output   [boolean] [default: false]
  --no-color, --no-colors  Turn off the color in output   [boolean] [default: false]
  --json                   Turn on the JSON logger    [boolean] [default: false]
  -h, --help               Show help  [boolean]
  -v, --version            Show the version of the Gatsby CLI and the Gatsby package in the current project    [boolean]
```


#####


### Filesystem

Work with files

```javascript
npm i gatsby-source-filesystem

// plugins in 'gatsby-config.js':
plugins: [
  ...
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `pages`,
      path: `${__dirname}/src/pages`
    },
  },
  ...
```


#####


### Transformer Remark

Render markup to html.

```javascript
npm i gatsby-transformer-remark

// plugins in 'gatsby-config.js':
// for Images the 'resolve' is needed. maxWidth is mandatory
plugins: [
  ...
  `gatsby-transformer-remark`,
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 768,
          },
        },
      ],
    },
  },
  ...
]
```


#####


### Catch Links

```powershell
npm i gatsby-plugin-catch-links
```


#####


### Sass

```javascript
npm install node-sass@4.14.1 gatsby-plugin-sass

// plugins in 'gatsby-config.js':
plugins: [
  `gatsby-plugin-sass`,
  ...
]

// rename 'layout.css' to 'layout.scss'
// in 'layout.js' import './layout.scss'
```


#####


### PWA



- It must run under HTTPS.
- It must include a Web App Manifest, which is a JSON file that provides the browser with information about your web app (name, icons, start_url, background-color, etc), and makes it possible for users to save to their home screen.
- Implement a service worker that provides support for an offline experience and makes your site more resilient to bad network connections. It’s a script that runs separately in the background, supporting features like push notifications and background sync.



```powershell

npm install --save gatsby-plugin-manifest 

npm install --save gatsby-plugin-offline
```

#### gatsby-config.js

```javascript

module.exports = {
  plugins: [
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Autho`,
        short_name: `Author`,
        start_url: `/`,
        background_color: `#0e2439`,
        theme_color: `#0e2439`,
        display: `standalone`,
        // Automatic icons - include here a big size
        icon: `src/images/icon-48x48.png`, // Path relative to the root 

        // Manually specify icons for different sizes
        icons: [ // manually, so they go to static folder:
          {
            src: `/static/icons/android-icon-48x48.png`,
            sizes: `48x48`,
            type: `image/png`,
          },
          {
            src: `/static/icons/android-icon-72x72.png`,
            sizes: `72x72`,
            type: `image/png`,
          },
          {
            src: `/static/icons/android-icon-96x96.png`,
            sizes: `96x96`,
            type: `image/png`,
          },
          {
            src: `/static/icons/android-icon-144x144.png`,
            sizes: `144x144`,
            type: `image/png`,
          },
          {
            src: `/static/icons/android-icon-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/static/icons/ms-icon-310x310.png`,
            sizes: `310x310`,
            type: `image/png`,
          }
        ]
      }
    },
  ],
}
```
