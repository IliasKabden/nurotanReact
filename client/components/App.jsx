import React, {Component} from 'react';
import {addLink} from '../lib/coreLib.js'

export default class App extends Component {
  logoutHandler(e) {
    e.preventDefault();
    Meteor.logout();
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
};
