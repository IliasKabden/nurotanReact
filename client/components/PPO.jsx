import React, {Component} from 'react';
import InnerSearchBarStateless from './stateless/InnerSearchBarStateless.jsx';

export default class PPO extends Component {
  render() {
    const {mpStrings} = this.props;

    return(
      <div>
        {this.props.header}
        {/* Main*/}
        <div id="main" className="hot-line-page">
          {/*Theme blog*/}
          <div id="theme-blog" className="theme-search city center">
            <div className="left-theme">
              <h1 className="city">{mpStrings.ppo}</h1>
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
                <div dangerouslySetInnerHTML={{__html: this.props.ppo}}></div>
                {this.props.shareButtonsJSX}
              </div>
              <div id="blog" className="cell-4">
                {this.props.ppoFilesJSX}
              </div>
              <div className="clearfix" />
            </div>
          </div>
          {/*End main video*/}
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
        {/*Footer*/}
        {this.props.footer}
        {/*Footer END*/}
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
