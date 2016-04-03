import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router';

export default class Posts extends Component {
  render() {
    return (
      <ul>
        {this.props.posts.map(post =>
          <li key={post.id}><Link to={`${post.subreddit}/${post.id}`}>{post.title}</Link></li>
        )}
      </ul>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
};
