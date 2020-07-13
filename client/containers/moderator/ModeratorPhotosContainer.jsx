import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {qs, qsa, addScript} from '../../lib/coreLib.js'
import {prepareCheckboxes} from '../../lib/dictionary-main-page.js';

import ModeratorPhotosHelmet from '../../helmets/ModeratorPhotosHelmet.jsx';
import ModeratorPhotos from '../../components/moderator/ModeratorPhotos.jsx';

import {PhotosCollection} from '../../../api/Photos.js';

class ModeratorPhotosContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photosToUpload: []
    };
  }

  componentDidMount() {
    Meteor.subscribe('AllPhotos');

    document.body.setAttribute('class', 'hold-transition skin-green-light layout-top-nav');

    var multipleUploadWidget = uploadcare.MultipleWidget('[role=uploadcare-uploader][data-multiple]');
        singleUploadWidget = uploadcare.SingleWidget('[role=uploadcare-uploader]');
  }

  /* START EVENT HANDLERS */

  addPhotoButtonHandler(e) {
    e.preventDefault();

    const title = {
            ru: qs('#photo-title-ru-input').value,
            kz: qs('#photo-title-kz-input').value
          },
          photos = qs('#photo-photos-input').value,
          main = qs('#photo-photo-input').value;

    Meteor.call('photos.add', {title, photos, main}, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Фотографии успешно добавлены', 'success', 'growl-top-right' );
        document.location.reload();
      }
    });
  }

  editPhotoButtonHandler(e) {
    checkedCheckBoxes = qsa('.photo-checkbox:checked');

    if(!checkedCheckBoxes.length)
    {
      Bert.alert( 'Вы ничего не выбрали!', 'danger', 'growl-top-right' );
      return;
    }

    if(checkedCheckBoxes.length > 1)
    {
      Bert.alert( 'Выберите не больше одного фотонабора в списке!', 'danger', 'growl-top-right' );
      return;
    }

    $('#photo-edit-modal').modal('show');
    const id = checkedCheckBoxes[0].getAttribute('data-id');

    const {photos} = this.props;

    const currentPhoto = photos.filter((photoItem) => {
      return photoItem._id === id;
    })[0];

    qs('#modal-title-ru-input').value = currentPhoto.title.ru;
    qs('#modal-title-kz-input').value = currentPhoto.title.kz;

    var singleUploadWidget = uploadcare.SingleWidget('#modal-photo-input'),
        multipleUploadWidget = uploadcare.MultipleWidget('#modal-photos-input');

    singleUploadWidget.value(currentPhoto.main);
    multipleUploadWidget.value(currentPhoto.photos);

    qs('#modal-save-button').setAttribute('data-id', currentPhoto._id);
  }

  removePhotosButtonHandler(e) {
    checkedCheckBoxes = qsa('input:checked');

    checkedCheckBoxes.forEach((checkbox) => {
      Meteor.call('photos.remove', checkbox.getAttribute('data-id'), (err) => {
        if(err) {
          Bert.alert( err.reason, 'danger', 'growl-top-right' );
        }
        else {
          Bert.alert( "Фотографии успешно удалены", 'success', 'growl-top-right' );
        }
      });
    });
  }

  saveChangesButtonHandler(e) {
    const id = qs('#modal-save-button').getAttribute('data-id'),
          title = {
            ru: qs('#modal-title-ru-input').value,
            kz: qs('#modal-title-kz-input').value
          },
          photos = qs('#modal-photos-input').value,
          main = qs('#modal-photo-input').value;

    Meteor.call('photos.edit', id, {title, main, photos}, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Фотографии успешно изменены', 'success', 'growl-top-right' );
        qs('#modal-photo-form').reset();

        var multipleUploadWidget = uploadcare.MultipleWidget('[role=uploadcare-uploader][data-multiple]');
            singleUploadWidget = uploadcare.SingleWidget('[role=uploadcare-uploader]');

        multipleUploadWidget.value(null);
        singleUploadWidget.value(null);
      }
    });
  }

  /* END EVENT HANDLERS */

  /* START GENERATED JSX*/

  getPhotosJSX() {
    if(!this.props.photos || !this.props.photos.length)
      return [];

    return this.props.photos.map((photoItem) => {
      return (
        <tr key={photoItem._id}>
          <td><input className='photo-checkbox' data-id={photoItem._id} type="checkbox" /></td>
          <td>{photoItem.title.en}</td>
          <td>{photoItem.title.ru}</td>
          <td>{photoItem.title.kz}</td>
        </tr>
      );
    });
  }

  getPhotosListModalJSX(photos) {
    return photos.map((photo, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td><input name="main-photo" type="radio" defaultChecked={index === 0} value={photo}/></td>
          <td><img src={photo + '-/scale_crop/180x180/'} /></td>
          <td><a href="#">удалить</a></td>
        </tr>
      );
    });
  }

  getPhotosListJSX() {
    return this.state.photosToUpload.map((photo, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td><input name="main-photo" type="radio" defaultChecked={index === 0} value={photo}/></td>
          <td><img src={photo + '-/scale_crop/180x180/'} /></td>
          <td><a href="#">удалить</a></td>
        </tr>
      );
    });
  }

  /* END GENERATED JSX*/

  render() {
    return (
      <div>
        <ModeratorPhotosHelmet />
        <ModeratorPhotos
          addPhotoButtonHandler={this.addPhotoButtonHandler.bind(this)}
          photosJSX={this.getPhotosJSX()}
          editPhotoButtonHandler={this.editPhotoButtonHandler.bind(this)}
          saveChangesButtonHandler={this.saveChangesButtonHandler.bind(this)}
          removePhotosButtonHandler={this.removePhotosButtonHandler.bind(this)}
          photosListJSX={this.getPhotosListJSX()}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    photos: PhotosCollection.find({}, {sort: {createdAt: -1}}).fetch(),
  };
}, ModeratorPhotosContainer)
