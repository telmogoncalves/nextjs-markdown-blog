import React from 'react'

import Layout from '../components/Layout'

export default function Index(props) {
  return (
    <Layout>
      ✍️ My blog about {props.blogCategory}
    </Layout>
  )
}

Index.getInitialProps = () => {
  return {
    blogCategory: 'ReactJS'
  }
}
