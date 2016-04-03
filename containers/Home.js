import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router';

export default class Home extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <header>
          <Link to='/'>Home</Link>
        </header>
        {this.props.children}
      </div>
    );
  }
}