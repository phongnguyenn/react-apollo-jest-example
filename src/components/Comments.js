import gql from 'graphql-tag'
import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'

import Comment from './Comment'
import CreateComment from './CreateComment'

export class Comments extends Component {
  render () {
    if (this.props.data.loading) {
      return <span>Loading...</span>
    }
    if (this.props.data.error) {
      return (
        <span>
          {this.props.data.error.name}: {this.props.data.error.message}
        </span>
      )
    }
    return (
      <div>
        <h1>Comments</h1>
        {this.props.data.user ? <CreateComment /> : null}
        <ul>
          {
            this.props.data.allComments.map((comment, index) => (
              <Comment id={comment.id} key={index} />
            ))
          }
        </ul>
      </div>
    )
  }
}

export const QUERY = gql`
  query Comments($filter: CommentFilter!, $orderBy: CommentOrderBy!) {
    allComments(filter: $filter, orderBy: $orderBy) {
      id
    }
    user {
      id
    }
  }
`

export const withData = compose(
  graphql(
    QUERY,
    {
      options: props => ({
        variables: {
          filter: {
            replyTo: null
          },
          orderBy: 'createdAt_DESC'
        }
      })
    }
  )
)

export default withData(Comments)
