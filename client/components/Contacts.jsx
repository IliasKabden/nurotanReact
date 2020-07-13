import React, {Component} from 'react';
import InnerSearchBarStateless from './stateless/InnerSearchBarStateless.jsx';

export default class Contacts extends Component {
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
              <h1 className="paper">{mpStrings.contacts}</h1>
            </div>
            <div className="right-theme">
              <InnerSearchBarStateless search={mpStrings.search} searchButton={mpStrings.searchButton} />
            </div>
            <div className="clearfix" />
          </div>
          <ul className="tab-article center theme">
            <li
              data-tab="0"
              onClick={this.props.setActiveTab}
              className={this.props.activeTabNumber === 0 ? "active" : ""}
              style={{cursor: 'pointer'}}>
              <span>{mpStrings.centralOffice}</span>
            </li>
            <li
              data-tab="1"
              onClick={this.props.setActiveTab}
              className={this.props.activeTabNumber === 1 ? "active" : ""}
              style={{cursor: 'pointer'}}>
              <span>{mpStrings.branches}</span>
            </li>
          </ul>
          {/*Main video*/}
          <div id="main-video" className="center">
            <div className="content-news">
              <div id="blocks-news" className="cell-8">
                {this.props.activeTabJSX}
              </div>
              <div id="blog" className="cell-4 top-none-pdf">
                <div className="cell-12">
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
