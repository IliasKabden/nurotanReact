import React, {Component} from 'react';
import { Link } from 'react-router';
import InnerSearchBarStateless from './stateless/InnerSearchBarStateless.jsx';

export default class Press extends Component {
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
              <h1 className="paper">{mpStrings.pressCenter.toUpperCase()}</h1>
            </div>
            <div className="right-theme">
              <InnerSearchBarStateless search={mpStrings.search} searchButton={mpStrings.searchButton} />              
            </div>
            <div className="clearfix" />
          </div>
          <ul className="tab-article center">
            <li className="active"><a href="#">{mpStrings.contacts.toUpperCase()}</a></li>
            <li><Link to="/news?tab=2">{mpStrings.pressReleases.toUpperCase()}</Link></li>
          </ul>
          {/*Main video*/}
          <div id="main-video" className="center">
            <div className="content-news">
              <div id="blocks-news" className="cell-8">
                <div dangerouslySetInnerHTML={{__html: this.props.press}}>
                </div>
              </div>
              <div id="blog" className="cell-4 top-none-pdf">
                <div className="cell-12">
                  {this.props.pressFilesJSX}
                  {this.props.enterPartyButtonJSX}
                  {this.props.publicReceptionJSX}
                </div>
              </div>
              <div className="clearfix" />
            </div>
          </div>
          {/*End main video*/}
          {/*Slider links*/}
          {this.props.sliderBlock}
          {/*End Slider links*/}
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
