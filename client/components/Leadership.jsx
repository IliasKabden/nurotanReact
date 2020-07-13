import React, {Component} from 'react';
import {addScript} from '../lib/coreLib.js';
import InnerSearchBarStateless from './stateless/InnerSearchBarStateless.jsx';

export default class Leadership extends Component {
  render() {
    const {mpStrings} = this.props;

    return(
      <div>
        {this.props.leadershipModalsJSX}
        {this.props.header}
        {/* Main*/}
        <div id="main" className="all-video-page">
          {/*Theme blog*/}
          <div id="theme-blog" className="theme-search center">
            <div className="left-theme">
              <h1 className="purchase">{mpStrings.leadership}</h1>
            </div>
            <div className="right-theme">
              <InnerSearchBarStateless search={mpStrings.search} searchButton={mpStrings.searchButton} />              
            </div>
            <div className="clearfix" />
          </div>
          {/*Leadership start*/}
          <div id="leadership" className="center">
            <h1 className="green uppercase">{mpStrings.leadership.toUpperCase()}</h1>
            {this.props.leadershipInfosJSX}
          </div>
          {/*Leadership end*/}
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
