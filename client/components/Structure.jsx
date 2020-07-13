import React, {Component} from 'react';
import InnerSearchBarStateless from './stateless/InnerSearchBarStateless.jsx';

export default class Structure extends Component {
  constructor(props) {
    super(props);
  }

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
              <h1 className="paper">{mpStrings.structure.toUpperCase()}</h1>
            </div>
            <div className="right-theme">
              <InnerSearchBarStateless search={mpStrings.search} searchButton={mpStrings.searchButton} />
            </div>
            <div className="clearfix" />
          </div>
          <ul className="tab-article center">
            <li className={this.props.activeTabNumber === 0 ? "active" : ""}>
              <a onClick={this.props.setActiveTab} data-tab="0" href="#">{mpStrings.bodies.toUpperCase()}</a>
            </li>
            <li className={this.props.activeTabNumber === 1 ? "active" : ""}>
              <a onClick={this.props.setActiveTab} data-tab="1" href="#">{mpStrings.centralOffice.toUpperCase()}</a>
            </li>
          </ul>
          {/*Main video*/}
          <div id="main-video" className="center">
            <div className="content-news">
              {this.props.activeTabJSX}
              <div id="blog" className="cell-4 top-none-pdf">
                <div className="cell-12">
                  {this.props.bodiesFilesJSX}
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
        {/*Footer*/}
        {this.props.footer}
        {/*Footer END*/}
        {/*Start increase and decrease*/}
        <div id="font-block-fixed">
          <button id="increase">+</button><br />
          <button id="decrease">-</button>
        </div>
        <div style={{opacity: '0'}}>
          <input id="uploaded-photo" type="hidden" role="uploadcare-uploader" />
        </div>
      </div>
    );
  }
}
