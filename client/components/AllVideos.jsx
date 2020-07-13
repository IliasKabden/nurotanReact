import React, {Component} from 'react';
import InnerSearchBarStateless from './stateless/InnerSearchBarStateless.jsx';

export default class AllVideos extends Component {
  componentDidMount() {
    $.getScript('/custom/js/jquery.dotdotdot.min.js', () => {
      $('.video.item p').dotdotdot({
        wrap: 'word',
        fallbackToLetter: false,
      });
    });
  }

  render() {
    const {mpStrings} = this.props;

    return(
      <div>
        {this.props.header}
        {/* Main*/}
        <div id="main" className="all-video-page">
          {/*Theme blog*/}
          <div id="theme-blog" className="theme-search center">
            <div className="left-theme">
              <h1>Видео</h1>
            </div>
            <div className="right-theme">
              <InnerSearchBarStateless search={mpStrings.search} searchButton={mpStrings.searchButton} />
            </div>
            <div className="clearfix" />
          </div>
          {/*Theme block*/}
          <div id="theme" className="theme center">
            <ul>
              <li onClick={() => {this.props.dateSelectHandler(undefined)}}><span className="active">{mpStrings.allVideos}</span></li>
              <li className="right">{this.props.calendarJSX}</li>
              <div className="clearfix" />
            </ul>
          </div>
          {/*End theme block*/}
          {/*Main video*/}
          <div id="main-video" className="center">
            <div className="content-news">
              <div id="blog" className="cell-12">
                {this.props.videosJSX}
              </div>
              <button onClick={this.props.videosLoadMoreHandler} className="load-more" type="button">{mpStrings.loadMore}</button>
              <div className="clearfix" />
            </div>
          </div>
          {/*End main video*/}
          {this.props.sliderBlock}
        </div>
        {/* End Main */}
        {this.props.footer}
        {/*Start increase and decrease*/}
        {this.props.fontSizeBlockJSX}
      </div>
    );
  }
}
