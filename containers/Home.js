import React, {PropTypes, Component} from 'react'
import {Link} from 'react-router';

export default class Home extends Component {
  componentDidMount() {

  }

  render() {
    const {selectedReddit} = this.props.params;
    const breadcrumbs = selectedReddit ? <Link to={'/' + selectedReddit}>{selectedReddit}</Link> : null;
    return (
      <div>
        <header>
          <Link to='/'>Home</Link>
          {' '}
          {breadcrumbs}
        </header>
        {this.props.children}
      </div>
    );
  }
}