import React, {Component} from 'react';
import InnerSearchBarStateless from './stateless/InnerSearchBarStateless.jsx';

export default class News extends Component {
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
              <h1 className="paper">{mpStrings.news}</h1>
            </div>
            <div className="right-theme">
              <InnerSearchBarStateless search={mpStrings.search} searchButton={mpStrings.searchButton} />
            </div>
            <div className="clearfix" />
          </div>
          {/*Theme block*/}
          <div id="theme" className="theme center">
            <ul>
              <li
                data-tab="0"
                onClick={this.props.setActiveTab}
                className={this.props.activeTabNumber === 0 ? "active" : ""}>
                <span>{mpStrings.allNews}</span>
              </li>
              <li
                data-tab="1"
                onClick={this.props.setActiveTab}
                className={this.props.activeTabNumber === 1 ? "active" : ""}>
                <span>{mpStrings.allArticles}</span>
              </li>
              <li
                data-tab="2"
                onClick={this.props.setActiveTab}
                className={this.props.activeTabNumber === 2 ? "active" : ""}>
                <span>{mpStrings.pressReleases}</span>
              </li>
              <li className="right">{this.props.calendarJSX}</li>
              <div className="clearfix" />
            </ul>
          </div>
          {/*End theme block*/}
          {this.props.activeTabJSX}
          {/*Category blog*/}
          <div className="category-blog">

          </div>
          {/*End category blog*/}
          {/*Video*/}
          {this.props.videosJSX}
          {/*End video*/}
          {/*Photo*/}
          <div id="photo" className="center">
            <h2><i>Фото</i></h2>
            <div className="black-block">
              {this.props.photoLargeBlockJSX}
              <div className="cell-6 cell-medium-12 last">
                {this.props.photoMediumBlockJSX}
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
      </div>
    );
  }
}
