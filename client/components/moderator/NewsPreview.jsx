import React, {Component} from 'react';
import { Link } from 'react-router';
import moment from '../../lib/moment-with-locales.min.js';

export default class NewsPreview extends Component {
  render() {

    return (
      <div id="main">
        {/* Top news */}
        <div id="user-lock"></div>
        <div id="top-news" className="center">
          {this.props.newsLargeBlockJSX}
          <div id="news-block-scroll" className="cell-6 cell-medium-12 last">
            {this.props.newsMediumBlockJSX}
          </div>
        </div>
      </div>
    );
  }
}
