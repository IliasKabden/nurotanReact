import React, {Component} from 'react';
import InnerSearchBarStateless from './stateless/InnerSearchBarStateless.jsx';

export default class SinglePurchase extends Component {
  render() {
    const {purchaseContentJSX, purchaseFilesJSX, mpStrings} = this.props;

    return (
      <div>
        {this.props.header}
        {/* Main*/}
        <div id="main" className="all-video-page">
          {/*Theme blog*/}
          <div id="theme-blog" className="theme-search center">
            <div className="left-theme">
              <h1 className="paper">{mpStrings.purchase}</h1>
            </div>
            <div className="right-theme">
              <InnerSearchBarStateless search={mpStrings.search} searchButton={mpStrings.searchButton} />
            </div>
            <div className="clearfix" />
          </div>
          {/*Theme block*/}
          <div id="theme" className="theme center">
            <ul className="single-purchase-top-tabs">
            </ul>
          </div>
          {/*End theme block*/}
          {/*Main video*/}
          <div id="main-video" className="center">
            <div className="content-news">
              {purchaseContentJSX}
              <div id="blog" className="cell-4">
                <div className="cell-12">
                  {purchaseFilesJSX}
                  {this.props.enterPartyButtonJSX}
                  {this.props.publicReceptionJSX}
                </div>
              </div>
              <div className="clearfix" />
            </div>
          </div>
          {this.props.sliderBlock}
        </div>
        {/* End Main */}
        {this.props.footer}
        {this.props.fontSizeBlockJSX}
      </div>
    );
  }
}
