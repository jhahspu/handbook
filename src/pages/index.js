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
    // console.log(event.target.value)
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
