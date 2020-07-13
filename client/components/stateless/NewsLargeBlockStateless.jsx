import React, {Component} from 'react';
import moment from '../../lib/moment-with-locales.min.js';
import {cookie} from '../../lib/coreLib.js';

import {Link} from 'react-router';

export default class NewsLargeBlockStateless extends Component {

  render() {
    const {news, lang} = this.props;

    if(!news)
      return (
        <div className="cell-6 cell-medium-12 last news-large-block-stateless"></div>
      );

    moment.locale(lang);
    const date = moment(news.createdAt).format('LL');

    return (
      <div className="cell-6 cell-medium-12 last news-large-block-stateless">
        <div className="large-block">
          <img src={news.photo + '-/scale_crop/556x400/-/quality/best/'} alt="конференция" />
          <div className="topic">
            <h2><Link to={"/single-news?id=" + this.props.news._id + "&lang="+lang} href="#">{news.title[lang]}</Link></h2>
          </div>
        </div>
      </div>
    );
  }
}
