---
path: "/gatsbyjs"
date: "Dec '20"
title: "GatsbyJS"
author: "jhahspu"
category: "JS"
---

# Usefull Packages
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

### Transformer Remark
Render markup to html.
```javascript
npm i gatsby-transformer-remark

// plugins in 'gatsby-config.js':
// for Images the resolve is needed and maxWidth is mandatory
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

### Catch Links
```
npm i gatsby-plugin-catch-links
```

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




# Setup
```
npm install -g gatsby-cli
```
### CLI commands
```powershell
gatsby --help

# Start development server. Watches files, rebuilds, and hot reloads if something changes
gatsby develop

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

# Create new Gatsby project.
gatsby new [rootPath] [starter]

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
### New Project
```
gatsby new project_name
```
