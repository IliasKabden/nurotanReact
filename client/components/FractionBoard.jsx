import React, {Component} from 'react';
import InnerSearchBarStateless from './stateless/InnerSearchBarStateless.jsx';

export default class FractionBoard extends Component {
  render() {
    const {mpStrings} = this.props;

    return(
      <div>
        {this.props.header}
        {/* Main*/}
        <div id="main" className="hot-line-page leadership-page ">
          {/*Theme blog*/}
          <div id="theme-blog" className="theme-search city center">
            <div className="left-theme">
              <h1 className="clock-load">{mpStrings.fractionBoard.toUpperCase()}</h1>
            </div>
            <div className="right-theme">
              <InnerSearchBarStateless search={mpStrings.search} searchButton={mpStrings.searchButton} />              
            </div>
            <div className="clearfix" />
          </div>
          <ul className="tab-article center">
          </ul>
          {/*Main video*/}
          <div id="main-video" className="center">
            <div className="content-news">
              <div id="blocks-news" className="cell-8">
                <div dangerouslySetInnerHTML={{__html: this.props.fractionBoard}}></div>
                {this.props.shareButtonsJSX}
              </div>
              <div id="blog" className="cell-4">
                <div className="cell-12">
                  {this.props.fractionBoardFilesJSX}
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
