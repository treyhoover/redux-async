import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Post extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('gonna mount!', this);
  }

  componentDidMount() {
    // const { dispatch, selectedReddit } = this.props;
    // dispatch(fetchPostsIfNeeded(selectedReddit))
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.selectedReddit !== this.props.selectedReddit) {
    //   const { dispatch, selectedReddit } = nextProps;
    //   dispatch(fetchPostsIfNeeded(selectedReddit))
    // }
  }

  render() {
    return (
      <h1>Post!</h1>
    )
  }
}

export default Post;
