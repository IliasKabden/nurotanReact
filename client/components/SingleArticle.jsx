import React, {Component} from 'react';
import {Link} from 'react-router';
import InnerSearchBarStateless from './stateless/InnerSearchBarStateless.jsx';

export default class SingleArticle extends Component {
  componentDidMount() {
    $('.pika-single.is-bound.is-hidden').hide();
    window.scrollTo(0, 0);
  }

  render() {
    const {
      articleContentJSX, videosJSX, photoLargeBlockJSX,
      photoMediumBlockJSX, mpStrings
    } = this.props;

    return (
      <div>
        {this.props.header}
        {/* Main*/}
        <div id="main" className="all-video-page">
          {/*Theme blog*/}
          <div id="theme-blog" className="theme-search center">
            <div className="left-theme">
              <h1 className="paper">{mpStrings.articles}</h1>
            </div>
            <div className="right-theme">
              <InnerSearchBarStateless search={mpStrings.search} searchButton={mpStrings.searchButton} />
            </div>
            <div className="clearfix" />
          </div>
          {/*Theme block*/}
          <div id="theme" className="theme center">
            <ul className="single-news-top-tabs">
              <li><span><a href="news?tab=0">{mpStrings.allNews}</a></span></li>
              <li><span className="active"><a href="news?tab=1">{mpStrings.allArticles}</a></span></li>
              <li><span><a href="news?tab=2">{mpStrings.pressReleases}</a></span></li>
              <div className="clearfix" />
            </ul>
          </div>
          {/*End theme block*/}
          {/*Main video*/}
          <div id="main-video" className="center">
            <div className="content-articles">
              {articleContentJSX}
              <div id="blog" className="cell-4">
                <h2 className="see-also">{mpStrings.seeAlso}</h2>
                <div className="cell-12">
                  {this.props.recommendationsJSX}
                  {this.props.enterPartyButtonJSX}
                  {this.props.publicReceptionJSX}
                </div>
              </div>
              <div className="clearfix" />
            </div>
          </div>
          {/*End main video*/}
          {/*Category blog*/}
          {videosJSX}
          <div id="photo" className="center">
            <h2><i>Фото</i></h2>
            <div className="black-block">
              {photoLargeBlockJSX}
              <div className="cell-6 cell-medium-12 last">
                {photoMediumBlockJSX}
              </div>
              <div className="clearfix" />
            </div>
          </div>
          {/*End Photo*/}
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
