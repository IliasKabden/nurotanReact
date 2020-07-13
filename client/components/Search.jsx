import React, {Component} from 'react';

export default class Search extends Component {
  render() {
    const {mpStrings} = this.props;
    return (
      <div>
        {this.props.visuallyImpairedJSX}
        {this.props.header}
        {/* Main*/}
        <div id="main" className="all-video-page">
          <div id="theme-blog" className="theme-search center">
            <div className="left-theme">
              <h1 className="paper">{mpStrings.search}</h1>
            </div>
            <div className="right-theme">
              <input type="text" value={this.props.searchExpression} onChange={this.props.searchValueChangeHandler} />
            </div>
            <div className="clearfix" />
          </div>
          <br/><br/>
          <div id="main-video" className="center none-margin-top">
            <div className="content-news">
              <div id="blog" className="cell-12 none-margin-top">
                {this.props.newsSearchResults}
                {this.props.articlesSearchResults}
              </div>
              <div className="clearfix" />
            </div>
          </div>
        </div>
        {this.props.footer}
        {this.props.fontSizeBlockJSX}
        {this.props.scrollUpButtonJSX}
      </div>
    );
  }
}
