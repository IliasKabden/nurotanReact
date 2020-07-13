import React, {Component} from 'react';
import moment from '../lib/moment-with-locales.min.js';
import {Link} from 'react-router';
import InnerSearchBarStateless from './stateless/InnerSearchBarStateless.jsx';

export default class FractionNews extends Component {
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
    const {mpStrings, news, lang} = this.props,
          topNews = news.map((newsItem) => {
            const date = moment(newsItem.createdAt).format('LL');

            return (
              <div key={newsItem._id} className="purchase-block cell-medium-12">
                <div className="large-block none-margin-top h-auto">
                  <img src={newsItem.photo + '-/scale_crop/270x180/'} alt="конференция" />
                  <div className="topic">
                    <Link
                      title={newsItem.title[lang]}
                      to={"/single-news?id=" + newsItem._id + "&lang=" + this.props.lang}
                      className="none-bg-link">
                        <h2 style={{height: '3em'}} className="all-news-top-heading small-text">
                          {newsItem.title[lang]}
                        </h2>
                    </Link>
                    <span className="date"><i>{date}</i></span>
                  </div>
                </div>
              </div>
            );
          });

    return(
      <div>
        {this.props.header}
        {/* Main*/}
        <div id="main" className="all-video-page">
          <div id="theme-blog" className="theme-search city center">
            <div className="left-theme">
              <h1 className="clock-load">{mpStrings.fractionNews}</h1>
            </div>
            <div className="right-theme">
              <InnerSearchBarStateless search={mpStrings.search} searchButton={mpStrings.searchButton} />
            </div>
            <div className="clearfix" />
          </div>
          <ul className="tab-article center">
            <li className="active"><a href="#">{mpStrings.fractionNews}</a></li>
            <li className="right">{this.props.calendarJSX}</li>
          </ul>
          <div id="main-video" className="center">
            <div className="content-news">
              <div id="blog" className="cell-12 none-margin-top">
                {topNews}
              </div>
              <button className="load-more" type="button">{mpStrings.loadMore}</button>
              <div className="clearfix" />
            </div>
          </div>
          {this.props.sliderBlock}
        </div>
        {/* End Main */}
        {this.props.footer}
        {/*Start increase and decrease*/}
        <div id="font-block-fixed">
          <button id="increase">+</button><br />
          <button id="decrease">-</button>
        </div>
        {/*End increase and decrease*/}
      </div>
    );
  }
}
