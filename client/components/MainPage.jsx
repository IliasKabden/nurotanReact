import React, {Component} from 'react';
import { Link } from 'react-router'

export default class MainPage extends Component {
  render() {

    const {mpStrings} = this.props;

    return(
      <div>
          {this.props.visuallyImpairedJSX}
          {this.props.header}
          {/* Main*/}
          <div id="main">
            {/* Top news */}
            <div id="top-news" className="center">
              {this.props.largeBlockJSX}
              <div id="news-block-scroll" className="cell-6 cell-medium-12 last">
                {this.props.mediumBlocksJSX}
                <Link className="all-news-button btn btn-default pull-right" to="news?tab=0">{mpStrings.allNews}</Link>
              </div>
            </div>
            {/*End top news*/}

            <div className="advertising">
              <Link to="leader?tab=2"><img src={"custom/img/advertising/banner-"+this.props.lang+".png"} alt=""/></Link>
            </div>
            {/* News */}
            <div id="news" className="center">
              <div className="clearfix" />
              <div id="blocks-news" className="cell-8">
                {this.props.sliderCenterJSX}
                <div className="theme-8">
                  <h2><Link className="articles-theme-button" to="/news?tab=1"><i>{mpStrings.articles}</i></Link></h2>
                </div>
                <div className="articles-container">
                  {this.props.articlesJSX}
                  <Link to='/news?tab=1' className="all-articles-button pull-right">{mpStrings.allArticles}</Link>
                </div>
              </div>
              <div id="blog" className="cell-4">
                <div className="cell-12 enter-party-public-reception">
                  {this.props.enterPartyButtonJSX}
                  {this.props.publicReceptionJSX}
                  {this.props.socialFeedJSX}
                </div>
              </div>
              <div className="clearfix" />
            </div>
            {/*End News*/}
            {/*Video*/}
            {this.props.videosJSX}
            {/*End video*/}
            {/*Photo*/}
            <div id="photo" className="center">
              <h2><Link to="/photos"><i>Фото</i></Link></h2>
              <div className="black-block">
                {this.props.photoLargeBlockJSX}
                <div className="cell-6 cell-medium-12 last">
                  <div className="large-block">
                    {this.props.photoMediumBlockJSX}
                  </div>
                </div>
                <div className="clearfix" />
              </div>
            </div>
            {/*End Photo*/}
            {/*Slider links*/}
            {this.props.sliderBlock}
            {/*End Slider links*/}
          </div>
          {this.props.footer}
          {this.props.fontSizeBlockJSX}
          {this.props.scrollUpButtonJSX}
        </div>
    );
  }
}
