import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {qs, qsa, addScript} from '../../lib/coreLib.js'
import {prepareCheckboxes} from '../../lib/dictionary-main-page.js';

import ModeratorVideosHelmet from '../../helmets/ModeratorVideosHelmet.jsx';
import ModeratorVideos from '../../components/moderator/ModeratorVideos.jsx';

import {VideosCollection} from '../../../api/Videos.js';

class ModeratorVideosContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Meteor.subscribe('VideosAll');

    document.body.setAttribute('class', 'hold-transition skin-green-light layout-top-nav');
  }

  /* START EVENT HANDLERS */

  addVideoButtonHandler(e) {
    e.preventDefault();

    const title = {
            ru: qs('#video-title-ru-input').value,
            kz: qs('#video-title-kz-input').value
          },
          url = {
            ru: qs('#video-url-ru-input').value,
            kz: qs('#video-url-kz-input').value
          };

    Meteor.call('videos.add', {title, url}, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Видео успешно добавлено', 'success', 'growl-top-right' );
        qs('#moderator-video-form').reset();
      }
    });
  }

  editVideoButtonHandler(e) {
    checkedCheckBoxes = qsa('.video-checkbox:checked');

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

    $('#video-edit-modal').modal('show');
    const id = checkedCheckBoxes[0].getAttribute('data-id');

    const {videos} = this.props;

    const currentVideo = videos.filter((videoItem) => {
      return videoItem._id === id;
    })[0],
          currentForm = qs('#modal-video-form');

    currentForm.elements['video-title-ru'].value = currentVideo.title.ru;
    currentForm.elements['video-title-kz'].value = currentVideo.title.kz;
    currentForm.elements['video-url-ru'].value = currentVideo.url.ru;
    currentForm.elements['video-url-kz'].value = currentVideo.url.kz;

    qs('#modal-save-button').setAttribute('data-id', currentVideo._id);
  }

  removeVideosButtonHandler(e) {
    checkedCheckBoxes = qsa('input:checked');

    checkedCheckBoxes.forEach((checkbox) => {
      Meteor.call('videos.remove', checkbox.getAttribute('data-id'), (err) => {
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
          currentForm = qs('#modal-video-form'),
          title = {
            ru: currentForm.elements['video-title-ru'].value,
            kz: currentForm.elements['video-title-kz'].value,
          },
          url = {
            ru: currentForm.elements['video-url-ru'].value,
            kz: currentForm.elements['video-url-kz'].value,
          };

    Meteor.call('videos.edit', id, {title, url}, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Видео успешно изменено', 'success', 'growl-top-right' );
        currentForm.reset();
      }
    });
  }

  /* END EVENT HANDLERS */

  /* START GENERATED JSX*/

  getVideosJSX() {
    if(!this.props.videos || !this.props.videos.length)
      return [];

    return this.props.videos.map((videoItem) => {
      return (
        <tr key={videoItem._id}>
          <td><input className='video-checkbox' data-id={videoItem._id} type="checkbox" /></td>
          <td>{videoItem.title.en}</td>
          <td>{videoItem.title.ru}</td>
          <td>{videoItem.title.kz}</td>
        </tr>
      );
    });
  }

  /* END GENERATED JSX*/

  render() {
    return (
      <div>
        <ModeratorVideosHelmet />
        <ModeratorVideos
          addVideoButtonHandler={this.addVideoButtonHandler.bind(this)}
          videosJSX={this.getVideosJSX()}
          editVideoButtonHandler={this.editVideoButtonHandler.bind(this)}
          saveChangesButtonHandler={this.saveChangesButtonHandler.bind(this)}
          removeVideosButtonHandler={this.removeVideosButtonHandler.bind(this)}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    videos: VideosCollection.find({}, {sort: {createdAt: -1}}).fetch(),
  };
}, ModeratorVideosContainer)
