import React, {Component} from 'react';

import {prepareFacebookFeed, prepareTwitterFeed, addScript, qs} from '../lib/coreLib.js';

export default class SocialFeed extends Component {
  componentDidMount() {
    prepareTwitterFeed();
    $.getScript('https://platform.twitter.com/widgets.js', () => {
      $('.twitter-feed-container').hide();
    });
  }

  componentDidUpdate() {
    if(this.props.activeTabNumber) {
      $('.facebook-feed-container').hide();
      $('.twitter-feed-container').show();
    }
    else {
      $('.facebook-feed-container').show();
      $('.twitter-feed-container').hide();
    }
  }

  render() {
    return (
      <div id="social-feed-container">
        <button id="facebook-tab-button" data-tab="0" onClick={this.props.setActiveTab} className={this.props.activeTabNumber === 0 ? 'active' : ''}>Facebook</button>
        <button id="twitter-tab-button" data-tab="1" onClick={this.props.setActiveTab} className={this.props.activeTabNumber === 1 ? 'active' : ''}>Twitter</button>
        {this.props.tabs}
      </div>
    );
  }
}
