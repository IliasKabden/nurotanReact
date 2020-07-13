import React, {Component} from 'react';
import InnerSearchBarStateless from './stateless/InnerSearchBarStateless.jsx';

export default class Vacancies extends Component {
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
              <h1 className="purchase">{mpStrings.vacancies}</h1>
            </div>
            <div className="right-theme">
              <InnerSearchBarStateless search={mpStrings.search} searchButton={mpStrings.searchButton} />              
            </div>
            <div className="clearfix" />
          </div>
          {/*Theme block*/}
          <div id="theme" className="theme center">
            <ul>
              <div className="clearfix" />
            </ul>
          </div>
          {/*End theme block*/}
          {/*Main video*/}
          <div id="main-video" className="center">
            <div className="content-news">
              <div id="blog" className="cell-12">
                {this.props.vacanciesJSX}
              </div>
              <button className="load-more" type="button">{mpStrings.loadMore}</button>
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
        {this.props.fontSizeBlockJSX}
      </div>
    );
  }
}
