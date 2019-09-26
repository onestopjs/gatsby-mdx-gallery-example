import React, { useMemo } from 'react'
import { Link, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import MdxGallery from '../components/MdxGallery'

// any other components you want to have
const components = {}

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const allComponents = useMemo(() => {
    const galleries = data.mdx.frontmatter.galleries.reduce((acc, gallery) => {
      acc[gallery.id] = gallery.images
      return acc
    }, {})
    const GalleryComponent = ({ id, ...props }) => {
      return <MdxGallery images={galleries[id]} {...props} />
    }

    return {
      ...components,
      Gallery: GalleryComponent,
    }
  }, [data])

  const post = data.mdx
  const { previous, next } = pageContext

  return (
    <Layout location={location}>
      <MDXProvider components={allComponents}>
        <SEO title={post.frontmatter.title} description={post.excerpt} />
        <h1>{post.frontmatter.title}</h1>
        <p>{post.frontmatter.date}</p>
        <MDXRenderer>{post.body}</MDXRenderer>
        <hr />
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </MDXProvider>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        galleries {
          id
          images {
            title
            description
            src {
              childImageSharp {
                preview: fluid(
                  maxWidth: 200
                  maxHeight: 200
                  cropFocus: ATTENTION
                ) {
                  ...GatsbyImageSharpFluid
                }
                big: fluid(maxWidth: 1200) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
      body
    }
  }
`
