import React, {Component} from 'react';
import moment from '../../lib/moment-with-locales.min.js';

import {Link} from 'react-router';

export default class ArticlesStateless extends Component {
  componentDidMount() {
    $.getScript('/custom/js/jquery.dotdotdot.min.js', () => {
      $(this.t).dotdotdot();
      $(this.td).dotdotdot();
    });
  }

  componentDidUpdate() {
    $.getScript('/custom/js/jquery.dotdotdot.min.js', () => {
      $(this.t).dotdotdot();
      $(this.td).dotdotdot();
    });
  }

  render() {
    const {article, lang} = this.props;

    moment.locale(lang);
    const date = moment(article.createdAt).format('LL');

    return (
      <div className="news-block article-block articles-stateless" key={article._id}>
        <div className="line">
          <div className="topic">
            <img ref={(img)=>{this.img = img}} src={article.photo + '-/scale_crop/346x224/'} alt="новость" className="w100" />
            <Link
              to={"/single-article?id=" + article._id + "&lang="+lang}
            >
              <h2 style={{height: '8em'}} ref={(t) => {this.t = t; }} >{article.title}</h2>
            </Link>
            <span className="date"><i>{date}</i></span>
            <p ref={(td) => {this.td = td; }}>{article.info}</p>
          </div>
        </div>
      </div>
    );
  }
}
