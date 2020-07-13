import React, {Component} from 'react';
import {Link} from 'react-router';
import moment from '../lib/moment-with-locales.min.js';
import InnerSearchBarStateless from './stateless/InnerSearchBarStateless.jsx';

export default class SingleProject extends Component {
  componentDidMount() {
    $.getScript('/custom/js/jquery.dotdotdot.min.js', () => {
      $('.news-block.article-block.articles-stateless h2, .news-block.article-block.articles-stateless p').dotdotdot({
        wrap: 'word',
	      fallbackToLetter: false,
      });
      $(this.td).dotdotdot();
    });
    window.scrollTo(0, 0);
  }

  componentDidUpdate() {
    $.getScript('/custom/js/jquery.dotdotdot.min.js', () => {
      $('.news-block.article-block.articles-stateless h2, .news-block.article-block.articles-stateless p').dotdotdot({
        wrap: 'word',
	      fallbackToLetter: false,
      });
      $(this.td).dotdotdot();
    });
  }

  render() {
    const {mpStrings, currentProject, lang, currentNews} = this.props;

    moment.locale(lang);
    const newsJSX = currentNews.map((newsItem) => {
            const date = moment(newsItem.createdAt).format('LL');

            return (
              <div className="news-block article-block articles-stateless">
                <div className="line">
                  <div className="topic">
                    <img src={newsItem.photo + '-/scale_crop/172x120/'} alt="новость" className="w100" />
                    <Link to={"/single-news?id=" + newsItem._id + "&lang="+lang}><h2 style={{height: '3em'}}>{newsItem.title[lang]}</h2></Link>
                    <span className="date"><i>{date}</i></span>
                    <p style={{height: '1em'}}>{newsItem.info[lang]}</p>
                  </div>
                </div>
              </div>
            );
          });

    return (
      <div>
        {this.props.header}
        {/* Main*/}
        <div id="main" className="hot-line-page">
          {/*Theme blog*/}
          <div id="theme-blog" className="theme-search city center">
            <div className="left-theme">
              <h1 className="purchase">{mpStrings.projects.toUpperCase()}</h1>
            </div>
            <div className="right-theme">
              <InnerSearchBarStateless search={mpStrings.search} searchButton={mpStrings.searchButton} />
            </div>
            <div className="clearfix" />
          </div>
          {/*Main video*/}
          <div id="main-video" className="center">
            <div className="content-news">
              <div id="blocks-news" className="cell-8">
                <h2 className="green">{currentProject.title[lang]}</h2>
                <div dangerouslySetInnerHTML={{__html: currentProject.text[lang]}}></div>
                {this.props.shareButtonsJSX}

                {/* News projects */}
                <div className="news-project-custom">
                  <h2><a className="articles-theme-button" href="#"><i>{mpStrings.news}</i></a></h2>
                  <div className="articles-container">
                    {newsJSX}
                  </div>

                  <button className="load-more" type="button" >{mpStrings.loadMore}</button>
                </div>
                {/* End News projects */}

              </div>
              <div id="blog" className="cell-4">
                <div className="cell-12">
                  <a href="#">
                    <img src={currentProject.photo} alt="проект" className="partia" />
                  </a>
                  {this.props.enterPartyButtonJSX}
                  {this.props.publicReceptionJSX}
                </div>
              </div>
              <div className="clearfix" />
            </div>
          </div>
          {/*End main video*/}
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
