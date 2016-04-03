import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import Home from './containers/Home'
import Posts from './containers/Posts'
import Post from './containers/Post'
import configureStore from './store/configureStore'

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} >
      <Route path="/" component={Home} >
        <Route path=":selectedReddit" component={Posts} />
        <Route path=":selectedReddit/:postId" component={Post} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
