import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({data}) => (
  <Layout>
    <SEO title="Index" />
    <div className="index">
    {data.allMarkdownRemark.edges.map(post => (
      <div key={post.node.id}>
        <h3>
          <Link
            to={post.node.frontmatter.path}
            data-text={post.node.frontmatter.title}
            data-cat={post.node.frontmatter.category}>
            {post.node.frontmatter.title}
          </Link>
        </h3>
      </div>
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
