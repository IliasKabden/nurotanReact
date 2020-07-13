import React, {Component} from 'react';
import moment from '../../lib/moment-with-locales.min.js';

import {Link} from 'react-router';

export default class NewsMediumBlockStateless extends Component {
  componentDidMount() {
    $.getScript('/custom/js/jquery.dotdotdot.min.js', () => {
      $(this.th).dotdotdot({
        wrap: 'word',
	      fallbackToLetter: false,
      });
      $(this.td).dotdotdot();
    });
  }

  componentDidUpdate() {
    $.getScript('/custom/js/jquery.dotdotdot.min.js', () => {
      $(this.th).dotdotdot({
        wrap: 'word',
	      fallbackToLetter: false,
      });
      $(this.td).dotdotdot();
    });
  }

  render() {
    const {news, lang} = this.props;

    moment.locale(lang);
    const date = moment(news.createdAt).format('LL');

    return (
      <div className="cell-6 cell-medium-12 news-medium-block-stateless">
        <div className="medium-block">
          <div className="topic-img">
            <img src={news.photo + '-/scale_crop/248x140/-/quality/best/'} alt="конференция" />
          </div>
          <div className="topic" ref={(t) => {this.t = t}}>
            <Link title={news.title[lang]} to={"/single-news?id=" + news._id+"&lang="+lang}><h2 ref={(th) => {this.th = th}} >{news.title[lang]}</h2></Link>
            <span className="date"><i>{date}</i></span>
          </div>
        </div>
      </div>
    );
  }
}
