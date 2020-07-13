import React, {Component} from 'react';

export default class LeaderTabLeaderStateless extends Component {
  render() {
    const {photos, lang} = this.props,
          photosJSX = photos.map((photo, index) => {
            return (
              <div key={index} className="cell-3">
                <div className="medium-block cursor">
                  <div className="category">
                    <a href="#" data-id={photo._id} onClick={this.props.instagramButtonHandler}><img src="/custom/img/icons/instagram.png" alt="instagram" /></a>
                  </div>
                  <a className="grouped" href="#" data-modal-title="Внеочередной Съезд партии “Нұр Отан”" data-modal-group=".grouped">
                    <img src={photo.main + "-/scale_crop/250x214/"} alt="политик" /></a>
                  <div className="topic">
                    <a data-id={photo._id} onClick={this.props.instagramButtonHandler} href="#">
                      <h2>
                          {photo.title[lang]}
                      </h2>
                    </a>
                  </div>
                  <a className="grouped" href="img/nazarbaev.jpg" data-modal-title="Назарбаев" data-modal-group=".grouped" />
                </div>
              </div>
            );
          });

    return (
      <section className="green-block-color">
        <div className="photo-leader">
          <div className="black-block none-top-border black-bg">
            {photosJSX}
          </div>
        </div>
        <div className="clearfix" />
      </section>
    );
  }
}
