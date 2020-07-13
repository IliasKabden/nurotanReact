import React, {Component} from 'react';

import {addScript, qs} from '../lib/coreLib.js';
import InnerSearchBarStateless from './stateless/InnerSearchBarStateless.jsx';

export default class Regions extends Component {
  componentDidMount() {
  }

  render() {
    const {mpStrings} = this.props;

    return(
      <div>
        {this.props.visuallyImpairedJSX}
        {this.props.header}
        {/* Main*/}
        <div id="main" className="all-video-page">
          <div id="theme-blog" className="theme-search city center">
            <div className="left-theme">
              <h1 className="clock-load">{mpStrings.regions}</h1>
            </div>
            <div className="right-theme">
              <InnerSearchBarStateless search={mpStrings.search} searchButton={mpStrings.searchButton} />
            </div>
            <div className="clearfix"></div>
          </div>
          <div className="center">
            {this.props.map}
          </div>
          <ul className="tab-article center">
            <li className={this.props.activeTabNumber === 0 ? "active" : ""}>
              <a data-tab="0" onClick={this.props.setActiveTab} href="#">{mpStrings.news.toUpperCase()}</a>
            </li>
            <li className={this.props.activeTabNumber === 1 ? "active" : ""}>
              <a data-tab="1" onClick={this.props.setActiveTab} href="#">{mpStrings.leadership.toUpperCase()}</a>
            </li>
            <li className={this.props.activeTabNumber === 2 ? "active" : ""}>
              <a data-tab="2" onClick={this.props.setActiveTab} href="#">{mpStrings.contacts.toUpperCase()}</a>
            </li>
            <li>
              <a target="_blank" href="http://kk.nurotan.kz/request/agreement">{mpStrings.appeal.toUpperCase()}</a>
            </li>
            <li className="right">{this.props.calendarJSX}</li>
          </ul>
          {this.props.activeTabJSX}
          {this.props.sliderBlock}
        </div>
        {this.props.footer}
        {/*Start increase and decrease*/}
        {this.props.fontSizeBlockJSX}
        <div id="the-tooltip" style={{ fontSize: '50px', backgroundColor: 'red', color: 'white', display: 'none'}}>
          halllooooo
        </div>
      </div>
    );
  }
}
