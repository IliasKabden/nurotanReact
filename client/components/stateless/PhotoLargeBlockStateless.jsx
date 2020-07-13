import React, {Component} from 'react';

export default class PhotoLargeBlockStateless extends Component {
  render() {
    const {photo, instagramButtonHandler, lang} = this.props;

    return (
      <div className="cell-6 cell-medium-12 last">
        <div className="large-block">
          <img src={photo.main + '-/scale_crop/556x440/'} alt="политик" />
          <div className="topic">
            <h2 style={{cursor: 'pointer'}} onClick={instagramButtonHandler} data-id={photo._id} >{photo.title[lang]}</h2>
            <a href='#' data-id={photo._id} onClick={instagramButtonHandler}>
              <img src='/custom/img/icons/instagram.png' alt="instagram" className="right" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}
