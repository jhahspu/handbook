import React from 'react'
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, Link } from "gatsby"


const Template = ({data}) => {
  const post = data.markdownRemark

  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      <div className="hb">
        <div className="handbook">
          <div className="handbook-head">
            <h1>{post.frontmatter.title}</h1>
            <p>
              <span>Category: {post.frontmatter.category} </span>
              <span>Last Update: {post.frontmatter.date} </span>
            </p>
          </div>
          <div className="handbook-body">
            <div dangerouslySetInnerHTML={{__html: post.html}}></div>
          </div>
        </div>
      </div>

      
        <Link
          id="home"
          to="/">
            Home
        </Link>
      
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