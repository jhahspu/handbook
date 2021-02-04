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

```md
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
#### h4
##### h5 -- I use it as hr

+ list
  - sub

- list

- [ ] checklist

[Link](address)

![img_alt](img_address)

*This text will be italic*
_This will also be italic_
**This text will be bold**
__This will also be bold__
_You **can** combine them_

First Header | Second Header
------------ | -------------
Content from cell 1 | Content from cell 2
Content in the first column | Content in the second column


[![YT_ID](https://img.youtube.com/vi/YT_ID/0.jpg)](https://www.youtube.com/watch?v=YT_ID)

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


#####



### Handbook index.js

```javascript
import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = props => {
  const {data} = props
  const allPosts = data.allMarkdownRemark.edges
  const emptyQuery = ""
  const [state, setState] = useState({
    filteredPosts: [],
    query: emptyQuery,
  })
  const handleInputChange = event => {
    console.log(event.target.value)
    const query = event.target.value
    const {data} = props
    const posts = data.allMarkdownRemark.edges || []
    const filteredPosts = posts.filter(post => {
      const { title, category } = post.node.frontmatter
      return (
        title.toLowerCase().includes(query.toLowerCase()) || 
        category.toLowerCase().includes(query.toLowerCase())
      )
    })

    setState({
      query,
      filteredPosts,
    })
  }


  const { filteredPosts, query } = state
  const hasSearchResults = filteredPosts && query !== emptyQuery
  const posts = hasSearchResults ? filteredPosts : allPosts


  return (
    <Layout>
      <SEO title="Index" />
      <div className="intro">
        <div className="search">
          <input
            type="text"
            aria-label="Search"
            placeholder="Search.."
            onChange={handleInputChange} />
        </div>
        <div className="posts">
          {posts.map(({node}) => {
            const { path, title, category, date } = node.frontmatter
            return (
              <Link
                to={path}
                key={node.id}
                className={`post cat-${category}`} >
                  <h3 className="post-title">{title}</h3>
                  <h4 className="post-category">{category}</h4>
                  <p className="post-date">{date}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}


export const pageQuery = graphql`
  query BlogIndexQuery {
    allMarkdownRemark(sort: { order: ASC, fields: frontmatter___category }) {
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