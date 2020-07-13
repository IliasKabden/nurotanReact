import React, {Component} from 'react';

export default class photoSmallBlockJSX extends Component {
  render() {
    const {photo, instagramButtonHandler, lang} = this.props;

    return (
      <div className="purchase-block cursor cell-medium-12">
        <div className="large-block none-margin-top h-auto">
          <span className="category">
            <a href='#' data-id={photo._id} onClick={instagramButtonHandler}>
              <img src="/custom/img/icons/instagram.png" alt="instagram" className="opacity1" />
            </a>
          </span>
          <img src={photo.main} />
          <div className="topic">
            <h2 onClick={instagramButtonHandler} data-id={photo._id} className="small-text">{photo.title[lang]}</h2>
          </div>
        </div>
      </div>
    );
  }
}
