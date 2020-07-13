import React, {Component} from 'react';
import InnerSearchBarStateless from './stateless/InnerSearchBarStateless.jsx';

export default class Photos extends Component {
  render() {
    const {mpStrings, loading} = this.props;

    if(loading) {
      return <div className="preloader"></div>;
    }

    return(
      <div>
        {this.props.header}
        {/* Main*/}
        <div id="main" className="all-video-page">
          {/*Theme blog*/}
          <div id="theme-blog" className="theme-search center">
            <div className="left-theme">
              <h1 className="photo-icon">ФОТОГАЛЕРЕЯ</h1>
            </div>
            <div className="right-theme">
              <InnerSearchBarStateless search={mpStrings.search} searchButton={mpStrings.searchButton} />
            </div>
            <div className="clearfix" />
          </div>
          {/*Theme block*/}
          <div id="theme" className="theme center">
            <ul>
              <li onClick={() => {this.props.dateSelectHandler(undefined)}}><span className="active">{mpStrings.allPhotoAlbums}</span></li>
              <li className="right">{this.props.calendarJSX}</li>
              <div className="clearfix" />
            </ul>
          </div>
          {/*End theme block*/}
          {/*Photo*/}
          <div id="photo" className="center">
            <div className="black-block">
              {this.props.photoBlocksJSX}
            </div>
          </div>
          {/*End Photo*/}
          {/*Main video*/}
          <div id="main-video" className="center">
            <div className="content-news">
              <button onClick={this.props.loadMoreHandler} className="load-more" type="button">{mpStrings.loadMore}</button>
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
      </div>
    );
  }
}
