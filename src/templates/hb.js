import React from 'react'
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"


const Template = ({data}) => {
  const post = data.markdownRemark

  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      <div className="handbook">
        <div className="handbook-head">
          <h1>{post.frontmatter.title}</h1>
          <h3>{post.frontmatter.category}</h3>
          <h4>Last Update:<span>{post.frontmatter.date}</span></h4>
        </div>
        <div className="handbook-body">
          <div className="spacing" dangerouslySetInnerHTML={{__html: post.html}}></div>
        </div>
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
        }
    }
  }
`

export default Template