---
path: "/gatsby-blog"
date: "Dec '20"
title: "Gatsby Blog Template"
author: "jhahspu"
category: "gatsby"
---


### New Gatsby Project
```powershell
gatsby new [project_name]

# plugins needed:
npm i gatsby-source-filesystem
npm i gatsby-transformer-remark
```


#####


### Blog Post Markup Template
#### pages/yyyy-mm-dd-title/index.md
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


#####


### Component Template
#### templates/blogpost_template.js
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


#####


### Gatsby Node Config
#### gatsby-node.js
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


#####


### Index Layout and GraphQL
#### pages/index.js
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