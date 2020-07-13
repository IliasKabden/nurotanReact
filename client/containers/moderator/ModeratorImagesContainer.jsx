import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {qs, qsa, addScript} from '../../lib/coreLib.js'
import {prepareCheckboxes} from '../../lib/dictionary-main-page.js';

import ModeratorImagesHelmet from '../../helmets/ModeratorImagesHelmet.jsx';
import ModeratorImages from '../../components/moderator/ModeratorImages.jsx';

import {ImagesCollection} from '../../../api/Images.js';

class ModeratorImagesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imagesToUpload: []
    };
  }

  componentDidMount() {
    Meteor.subscribe('AllImages');

    document.body.setAttribute('class', 'hold-transition skin-green-light layout-top-nav');

    var multipleUploadWidget = uploadcare.MultipleWidget('[role=uploadcare-uploader][data-multiple]');
        singleUploadWidget = uploadcare.SingleWidget('[role=uploadcare-uploader]');
  }

  /* START EVENT HANDLERS */

  addImageButtonHandler(e) {
    e.preventDefault();

    const title = {
            ru: qs('#image-title-ru-input').value,
            kz: qs('#image-title-kz-input').value
          },
          images = qs('#image-images-input').value,
          main = qs('#image-image-input').value;

    Meteor.call('images.add', {title, images, main}, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Фотографии успешно добавлены', 'success', 'growl-top-right' );
        document.location.reload();
      }
    });
  }

  editImageButtonHandler(e) {
    checkedCheckBoxes = qsa('.image-checkbox:checked');

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

    $('#image-edit-modal').modal('show');
    const id = checkedCheckBoxes[0].getAttribute('data-id');

    const {images} = this.props;

    const currentImage = images.filter((imageItem) => {
      return imageItem._id === id;
    })[0];

    qs('#modal-title-ru-input').value = currentImage.title.ru;
    qs('#modal-title-kz-input').value = currentImage.title.kz;

    var singleUploadWidget = uploadcare.SingleWidget('#modal-image-input'),
        multipleUploadWidget = uploadcare.MultipleWidget('#modal-images-input');

    singleUploadWidget.value(currentImage.main);
    multipleUploadWidget.value(currentImage.images);

    qs('#modal-save-button').setAttribute('data-id', currentImage._id);
  }

  removeImagesButtonHandler(e) {
    checkedCheckBoxes = qsa('input:checked');

    checkedCheckBoxes.forEach((checkbox) => {
      Meteor.call('images.remove', checkbox.getAttribute('data-id'), (err) => {
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
          images = qs('#modal-images-input').value,
          main = qs('#modal-image-input').value;

    Meteor.call('images.edit', id, {title, main, images}, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Фотографии успешно изменены', 'success', 'growl-top-right' );
        qs('#modal-image-form').reset();

        var multipleUploadWidget = uploadcare.MultipleWidget('[role=uploadcare-uploader][data-multiple]');
            singleUploadWidget = uploadcare.SingleWidget('[role=uploadcare-uploader]');

        multipleUploadWidget.value(null);
        singleUploadWidget.value(null);
      }
    });
  }

  /* END EVENT HANDLERS */

  /* START GENERATED JSX*/

  getImagesJSX() {
    if(!this.props.images || !this.props.images.length)
      return [];

    return this.props.images.map((imageItem) => {
      return (
        <tr key={imageItem._id}>
          <td><input className='image-checkbox' data-id={imageItem._id} type="checkbox" /></td>
          <td>{imageItem.title.en}</td>
          <td>{imageItem.title.ru}</td>
          <td>{imageItem.title.kz}</td>
        </tr>
      );
    });
  }

  getImagesListModalJSX(images) {
    return images.map((image, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td><input name="main-image" type="radio" defaultChecked={index === 0} value={image}/></td>
          <td><img src={image + '-/scale_crop/180x180/'} /></td>
          <td><a href="#">удалить</a></td>
        </tr>
      );
    });
  }

  getImagesListJSX() {
    return this.state.imagesToUpload.map((image, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td><input name="main-image" type="radio" defaultChecked={index === 0} value={image}/></td>
          <td><img src={image + '-/scale_crop/180x180/'} /></td>
          <td><a href="#">удалить</a></td>
        </tr>
      );
    });
  }

  /* END GENERATED JSX*/

  render() {
    return (
      <div>
        <ModeratorImagesHelmet />
        <ModeratorImages
          addImageButtonHandler={this.addImageButtonHandler.bind(this)}
          imagesJSX={this.getImagesJSX()}
          editImageButtonHandler={this.editImageButtonHandler.bind(this)}
          saveChangesButtonHandler={this.saveChangesButtonHandler.bind(this)}
          removeImagesButtonHandler={this.removeImagesButtonHandler.bind(this)}
          imagesListJSX={this.getImagesListJSX()}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    images: ImagesCollection.find({}, {sort: {createdAt: -1}}).fetch(),
  };
}, ModeratorImagesContainer)
