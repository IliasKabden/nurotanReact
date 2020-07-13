import React, {Component} from 'react';

export default class PhotoBlockStateless extends Component {
  render() {
    const {photo, lang, instagramButtonHandler} = this.props;

    return (
      <div className="cell-3">
        <div className="medium-block">
          <div className="category">
            <a href='#' data-id={photo._id} onClick={instagramButtonHandler}><img src="custom/img/icons/instagram.png" alt="instagram" /></a>
          </div>
          <img src={photo.main + '-/scale_crop/260x214/'} alt="политик" />
          <div className="topic">
            <h2 style={{cursor: 'pointer', padding: '1em'}} data-id={photo._id} onClick={instagramButtonHandler}>{photo.title[lang]}</h2>
          </div>
        </div>
      </div>
    );
  }
}
