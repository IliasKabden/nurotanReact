import React, {Component} from 'react';
import moment from '../../lib/moment-with-locales.min.js';
import {Link} from 'react-router';

export default class NewsTabArticles extends Component {
  componentDidMount() {
    $.getScript('/custom/js/jquery.dotdotdot.min.js', () => {
      $('.all-articles-top-heading ').dotdotdot({});
    });
  }

  render() {
    let {articles, lang, mpStrings} = this.props;
    moment.locale(lang);

    articles = articles.filter((article) => article.lang === lang);

    const topArticles = articles.map((article) => {
            const date = moment(article.createdAt).format('LL');

            return (
              <div key={article._id} className="purchase-block cell-medium-12">
                <div className="large-block none-margin-top h-auto">
                  <img src={article.photo + '-/scale_crop/270x180/'} alt="конференция" />
                  <div className="topic">
                    <Link
                      title={article.title}
                      to={"/single-article"}
                      query={{
                        id: article._id,
                        lang: lang
                      }}
                      className="none-bg-link">
                      <h2 className="all-articles-top-heading small-text">{article.title}</h2>
                    </Link>
                    <span className="date"><i>{date}</i></span>
                  </div>
                </div>
              </div>
            );
          });

    return (
      <div id="main-video" className="center none-margin-top">
        <div className="content-news">
          <div id="blog" className="cell-12 none-margin-top">
            {topArticles}
          </div>
          <button onClick={this.props.loadMoreHandler} className="load-more" type="button">{mpStrings.loadMore}</button>
          <div className="clearfix" />
        </div>
      </div>
    );
  }
}
