import React, {Component} from 'react';

import {Link} from 'react-router';

import moment from '../../lib/moment-with-locales.min.js';

export default class RecommendationContentStateless extends Component {
  dotTheDot() {
    $.getScript('/custom/js/jquery.dotdotdot.min.js', () => {
      $(this.th).dotdotdot({
        wrap: 'word',
	      fallbackToLetter: false,
      });
    });
  }
  componentDidMount() {
    this.dotTheDot();
  }

  componentDidUpdate() {
    this.dotTheDot();
  }

  render() {
    const {news, lang} = this.props,
          {createdAt, _id, title, photo} = news;

    moment.locale(lang);
    const date = moment(createdAt).format('LL');

    return (
      <a href={"/single-article?id="+_id+"&lang="+lang}>
        <div className="large-block none-margin-top h-auto">
          <img src={photo + '-/scale_crop/368x250/'} alt="конференция" />
          <div className="topic">
            <h2 ref={(th) => {this.th = th;}} className="small-text">
              {title}
            </h2>
            <span className="date left-date"><i>{date}</i></span>
          </div>
        </div>
      </a>
    );
  }
}
