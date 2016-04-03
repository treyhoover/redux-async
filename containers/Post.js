import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPostIfNeeded } from '../actions';

class Post extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, selectedReddit, postId } = this.props;
    dispatch(fetchPostIfNeeded(selectedReddit, postId));
  }

  render() {
    const { selectedReddit, postId, post } = this.props;
    const selfText = post.selftext ? <p>{post.selftext}</p> : null;
    const url = post.url ? <a href={post.url}>{post.url}</a> : null;
    return (
      <div>
        <h1>{post.title}</h1>
        {selfText}
        {url}
      </div>
    )
  }
}

function mapStateToProps(state, route) {
  const { postsByReddit } = state;
  const { selectedReddit, postId } = route.params;
  const posts = (postsByReddit[selectedReddit] || {}).postData || {};
  const post = posts[postId] || {
    isFetching: true,
    data: {}
  };

  return {
    selectedReddit,
    postId,
    post
  }
}

export default connect(mapStateToProps)(Post)