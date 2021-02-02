import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({data}) => (
  <Layout>
    <SEO title="Index" />
    <div className="intro">
      <div className="posts">
        {data.allMarkdownRemark.edges.map(post => (
          <Link
            key={post.node.id}

            className={`post ${post.node.frontmatter.category}`}
            to={post.node.frontmatter.path}
            data-text={post.node.frontmatter.title}
            data-cat={post.node.frontmatter.category}>
              <h3 className="post-title">{post.node.frontmatter.title}</h3>
              <h4 className="post-category">{post.node.frontmatter.category}</h4>
              <p className="post-date">{post.node.frontmatter.date}</p>
          </Link>
        ))}
      </div>
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
