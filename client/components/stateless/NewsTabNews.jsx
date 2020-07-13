import React, {Component} from 'react';
import moment from '../../lib/moment-with-locales.min.js';
import {Link} from 'react-router';

export default class NewsTabNews extends Component {

  componentDidMount() {
    $.getScript('/custom/js/jquery.dotdotdot.min.js', () => {
      $('.all-news-top-heading ').dotdotdot({});
    });
  }

  componentDidUpdate() {
    $.getScript('/custom/js/jquery.dotdotdot.min.js', () => {
      $('.all-news-top-heading ').dotdotdot({});
    });
  }

  render() {
    moment.locale(this.props.lang);
    const {news, lang, mpStrings} = this.props,
          topNews = news.map((newsItem) => {
            const date = moment(newsItem.createdAt).format('LL');

            return (
              <div key={newsItem._id} className="purchase-block cell-medium-12">
                <div className="large-block none-margin-top h-auto">
                  <img src={newsItem.photo + '-/scale_crop/270x180/'} alt="конференция" />
                  <div className="topic">
                    <Link
                      title={newsItem.title[lang]}
                      to={"/single-news"}
                      query={{
                        id: newsItem._id,
                        lang,
                      }}
                      className="none-bg-link"><h2 className="all-news-top-heading small-text">{newsItem.title[lang]}</h2></Link>
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
            {topNews}
          </div>
          <button className="load-more" type="button" onClick={this.props.loadMoreHandler}>{mpStrings.loadMore}</button>
          <div className="clearfix" />
          <a target="_blank" style={{display: 'inline-block', width: '100%', textAlign: 'right'}} href={"http://old.nurotan.kz/"+lang+"/news"}>{mpStrings.archive}</a>
        </div>
      </div>
    );
  }
}
