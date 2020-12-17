---
path: "/gatsbyjs"
date: "Dec '20"
title: "GatsbyJS"
author: "jhahspu"
category: "JS"
---

# Simple Blog
### 1: Create project
```powershell
gatsby new [project_name]

# plugins needed:
npm i gatsby-source-filesystem
npm i gatsby-transformer-remark
```

### 2: Blog Post / pages/yyyy-mm-dd-title/index.md
```javascript
---
path: "/[path_name]"
date: "[yyyy-mm-dd]"
title: "[Title]"
author: "[author]"
category: "[category]"
---
# h1
## h2
### h3
- list
- [ ] checklist
[Link](address)
![img_alt](img_address)
*This text will be italic*
_This will also be italic_
**This text will be bold**
__This will also be bold__
_You **can** combine them_
//```javascript
function fancyAlert(arg) {
  if(arg) {
    $.facebox({div:'#foo'})
  }
}
//```
```

### 3: templates/blogpost_template.js
```javascript
import React from 'react'
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"

const Template = ({data}) => {
  const post = data.markdownRemark

  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      <div>
        <h1>{post.frontmatter.title}</h1>
        <h3>{post.frontmatter.category}</h3>
        <h4>{post.frontmatter.author} // {post.frontmatter.date}</h4>
        <div dangerouslySetInnerHTML={{__html: post.html}}></div>
      </div>
    </Layout>
  )
}

export const postQuery = graphql`
  query BlogPostByPath($path: String) {
    markdownRemark(frontmatter: { path: { eq: $path } } ) {
      html
        frontmatter {
          path
          title
          category
          date
          author
        }
    }
  }
`

export default Template
```

### 4: gatsby-node.js
```javascript
const path = require('path');

exports.createPages = ({actions, graphql}) => {
  const {createPage} = actions
  const postTemplate = path.resolve('src/templates/blogpost_template.js')

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            html
            id
            frontmatter {
              path
              title
              date
              author
            }
          }
        }
      }
    }
  `).then(res => {
    if (res.errors) {
      return Promise.reject(res.errors)
    }

    res.data.allMarkdownRemark.edges.forEach(({node}) => {
      createPage({
        path: node.frontmatter.path,
        component: postTemplate
      })
    })
  })
}
```

### 5: index.js
```javascript
import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({data}) => (
  <Layout>
    <SEO title="Index" />
    <div>
      {data.allMarkdownRemark.edges.map(post => (
        <Link
          key={post.node.id}
          to={post.node.frontmatter.path}>
            <h3>{post.node.frontmatter.title}</h3>
            <h4>{post.node.frontmatter.category}</h4>
            <p>{post.node.frontmatter.date}</p>
            <p>{post.node.frontmatter.author}</p>
        </Link>
      ))}
      
    </div>
    
  </Layout>
)

export const pageQuery = graphql`
  query BlogIndexQuery {
    allMarkdownRemark {
      edges{
        node{
          id
          frontmatter{
            path
            title
            date
            author
            category
          }
        }
      }
    }
  }
`

export default IndexPage
```


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

