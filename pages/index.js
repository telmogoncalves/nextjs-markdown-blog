import React from 'react'

export default function Index(props) {
  return (
    <div>
      ✍️ My blog about {props.blogCategory}
    </div>
  )
}

Index.getInitialProps = () => {
  return {
    blogCategory: 'ReactJS'
  }
}
