import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const REQUEST_POST = 'REQUEST_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const SELECT_REDDIT = 'SELECT_REDDIT';
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT';

export function selectReddit(reddit) {
  return {
    type: SELECT_REDDIT,
    reddit
  }
}

export function invalidateReddit(reddit) {
  return {
    type: INVALIDATE_REDDIT,
    reddit
  }
}

function requestPosts(reddit) {
  return {
    type: REQUEST_POSTS,
    reddit
  }
}

function requestPost(reddit, postId) {
  return {
    type: REQUEST_POST,
    reddit,
    postId
  }
}

function receivePosts(reddit, json) {
  return {
    type: RECEIVE_POSTS,
    reddit: reddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function receivePost(reddit, json) {
  return {
    type: RECEIVE_POST,
    reddit,
    post: json,
    receivedAt: Date.now()
  }
}

function fetchPosts(reddit) {
  return dispatch => {
    dispatch(requestPosts(reddit));
    return fetch(`https://www.reddit.com/r/${reddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(reddit, json)))
  }
}

function fetchPost(reddit, postId) {
  return dispatch => {
    dispatch(requestPost(reddit, postId));
    return fetch(`https://www.reddit.com/r/${reddit}/${postId}.json`)
      .then(response => response.json())
      .then(json => {
        let post = json[0].data.children.map(child => child.data)[0];
        dispatch(receivePost(reddit, post))
      });
  }
}

function shouldFetchPosts(state, reddit) {
  const posts = state.postsByReddit[reddit];
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

function shouldFetchPost(state, reddit, postId) {
  const posts = state.postsByReddit[reddit];
  if (!posts) return true;
  
  const postData = posts.postData;
  if (!postData) return true;
  
  const post = postData[postId];
  if (!post) return true;

  return post.didInvalidate;
}

export function fetchPostsIfNeeded(reddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), reddit)) {
      return dispatch(fetchPosts(reddit))
    }
  }
}

export function fetchPostIfNeeded(reddit, postId) {
  return (dispatch, getState) => {
    if (shouldFetchPost(getState(), reddit, postId)) {
      return dispatch(fetchPost(reddit, postId));
    }
  }
}
