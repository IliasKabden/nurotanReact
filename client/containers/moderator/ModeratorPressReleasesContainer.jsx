import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {qs, qsa, addScript, setEditorValue, getEditorValue,} from '../../lib/coreLib.js'
import {prepareCheckboxes} from '../../lib/dictionary-main-page.js';

import ModeratorPressReleasesHelmet from '../../helmets/ModeratorPressReleasesHelmet.jsx';
import ModeratorPressReleases from '../../components/moderator/ModeratorPressReleases.jsx';

import {PressReleasesCollection} from '../../../api/PressReleases.js';

class ModeratorPressReleasesContainer extends Component {
  componentWillMount() {
    Meteor.subscribe('AllPressReleases');
  }

  constructor(props) {
    super(props);

    this.state = {
      blobsru: [],
      blobskz: [],
      modalBlobsru: [],
      modalBlobskz: [],
      activeBlobName: '',
      date: new Date(),
      modalDate: new Date(),
    };
  }

  componentDidMount() {
    document.body.setAttribute('class', 'hold-transition skin-green-light layout-top-nav');
  }

  componentDidUpdate() {

  }

  /* START EVENT HANDLERS */

  deleteFileFromList(e) {
    e.preventDefault();
    const pos = e.currentTarget.getAttribute('data-position'),
          stateBlobName = e.currentTarget.getAttribute('data-state-name'),
          blobs = this.state[stateBlobName];

    blobs.splice(pos, 1);
    this.setState({[stateBlobName]: blobs});
  }

  fileLoaded(receivedBlobs) {
    const blobName = this.state.activeBlobName,
          blobs = this.state[blobName];

    receivedBlobs.forEach((blob, index) => {
      blobs.push(blob);
    });

    this.setState({
      [blobName]: blobs,
      activeBlobName: ''
    });
  }

  fileLoadError(FPError) {

  }

  fileLoadProgress(FPProgress) {

  }

  loadFileButtonHandler(e) {
    e.preventDefault();
    this.setState({activeBlobName: e.currentTarget.getAttribute('data-blob-name')});
    filepicker.pickMultiple({language: 'ru'}, this.fileLoaded.bind(this), this.fileLoadError.bind(this), this.fileLoadProgress.bind(this));
  }

  modalLoadFileButtonHandler(e) {
    e.preventDefault();
    filepicker.pickMultiple({language: 'ru'}, this.modalFileLoaded.bind(this), this.fileLoadError.bind(this), this.fileLoadProgress.bind(this));
  }

  addPressReleaseButtonHandler(e) {
    e.preventDefault();

    const theForm = qs('#moderator-pressRelease-form'),
          title = {
            ru: theForm.elements['pressRelease-title-ru'].value,
            kz: theForm.elements['pressRelease-title-kz'].value
          },
          text = {
            ru: getEditorValue('textEditorRu'),
            kz: getEditorValue('textEditorKz'),
          },
          blobs = {
            ru: this.state.blobsru,
            kz: this.state.blobskz
          },
          createdAt = Date.parse(this.state.date);

    Meteor.call('pressReleases.add', {title, text, blobs, createdAt}, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Пресс-релиз успешно добавлен', 'success', 'growl-top-right' );
        document.location.reload();
      }
    });
  }

  editPressReleaseButtonHandler(e) {
    checkedCheckBoxes = qsa('.pressRelease-checkbox:checked');

    if(!checkedCheckBoxes.length)
    {
      Bert.alert( 'Вы ничего не выбрали!', 'danger', 'growl-top-right' );
      return;
    }

    if(checkedCheckBoxes.length > 1)
    {
      Bert.alert( 'Выберите не больше одного пресс-релиза в списке!', 'danger', 'growl-top-right' );
      return;
    }

    $('#pressRelease-edit-modal').modal('show');
    const id = checkedCheckBoxes[0].getAttribute('data-id');

    const {pressReleases} = this.props;

    const currentPressRelease = pressReleases.filter((pressReleaseItem) => {
      return pressReleaseItem._id === id;
    })[0];

    const theForm = qs('#modal-pressRelease-form');

    theForm.elements['pressRelease-title-ru'].value = currentPressRelease.title.ru;
    theForm.elements['pressRelease-title-kz'].value = currentPressRelease.title.kz;

    setEditorValue('modalTextEditorRu', currentPressRelease.text.ru);
    setEditorValue('modalTextEditorKz', currentPressRelease.text.kz);

    this.setState({
      modalBlobsru: currentPressRelease.blobs.ru,
      modalBlobskz: currentPressRelease.blobs.kz,
      modalDate: new Date(currentPressRelease.createdAt)
    });

    qs('#modal-save-button').setAttribute('data-id', currentPressRelease._id);
  }

  dateChangeHandler(e) {
    const stateName = e.currentTarget.getAttribute('data-state-name'),
          stateValue = e.currentTarget.value;

    this.setState({
      [stateName]: stateValue
    });
  }

  removePressReleasesButtonHandler(e) {
    checkedCheckBoxes = qsa('input:checked');

    checkedCheckBoxes.forEach((checkbox) => {
      Meteor.call('pressReleases.remove', checkbox.getAttribute('data-id'), (err) => {
        if(err) {
          Bert.alert( err.reason, 'danger', 'growl-top-right' );
        }
        else {
          Bert.alert( "Пресс-релиз успешно удален", 'success', 'growl-top-right' );
        }
      });
    });
  }

  saveChangesButtonHandler(e) {
    const id = e.target.getAttribute('data-id'),
          theForm = qs('#modal-pressRelease-form'),
          title = {
            ru: theForm.elements['pressRelease-title-ru'].value,
            kz: theForm.elements['pressRelease-title-kz'].value
          },
          text = {
            ru: getEditorValue('modalTextEditorRu'),
            kz: getEditorValue('modalTextEditorKz'),
          },
          blobs = {
            ru: this.state.modalBlobsru,
            kz: this.state.modalBlobskz
          },
          createdAt = Date.parse(this.state.modalDate);

    Meteor.call('pressReleases.edit', id, {title, text, blobs, createdAt}, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Пресс-релиз успешно изменен', 'success', 'growl-top-right' );
        qs('#modal-pressRelease-form').form.reset();
        this.setState({
          modalBlobsru: [],
          modalBlobskz: []
        });
      }text
    });
  }

  /* END EVENT HANDLERS */

  /* START GENERATED JSX*/

  getPressReleasesJSX() {
    if(!this.props.pressReleases || !this.props.pressReleases.length)
      return [];

    return this.props.pressReleases.map((pressReleaseItem) => {
      return (
        <tr key={pressReleaseItem._id}>
          <td><input className='pressRelease-checkbox' data-id={pressReleaseItem._id} type="checkbox" /></td>
          <td>{pressReleaseItem.title.ru}</td>
          <td>{pressReleaseItem.title.kz}</td>
        </tr>
      );
    });
  }

  /* END GENERATED JSX*/

  render() {

    const blobsRuJSX = this.state.blobsru.map((blob, index) => {
            return (
              <li key={index}>
                {blob.filename}
                &nbsp;&nbsp;<a href="#" data-position={index} data-state-name='blobsru' onClick={this.deleteFileFromList.bind(this)}>удалить</a>
              </li>
            );
          }),
          blobsKzJSX = this.state.blobskz.map((blob, index) => {
            return (
              <li key={index}>
                {blob.filename}
                &nbsp;&nbsp;<a href="#" data-position={index} data-state-name='blobskz' onClick={this.deleteFileFromList.bind(this)}>удалить</a>
              </li>
            );
          }),
          modalBlobsRuJSX = this.state.modalBlobsru.map((blob, index) => {
            return (
              <li key={index}>
                {blob.filename}
                &nbsp;&nbsp;<a href="#" data-position={index} data-state-name='modalBlobsru' onClick={this.deleteFileFromList.bind(this)}>удалить</a>
              </li>
            );
          }),
          modalBlobsKzJSX = this.state.modalBlobskz.map((blob, index) => {
            return (
              <li key={index}>
                {blob.filename}
                &nbsp;&nbsp;<a href="#" data-position={index} data-state-name='modalBlobskz' onClick={this.deleteFileFromList.bind(this)}>удалить</a>
              </li>
            );
          });

    return (
      <div>
        <ModeratorPressReleasesHelmet />
        <ModeratorPressReleases
          addPressReleaseButtonHandler={this.addPressReleaseButtonHandler.bind(this)}
          pressReleasesJSX={this.getPressReleasesJSX()}
          editPressReleaseButtonHandler={this.editPressReleaseButtonHandler.bind(this)}
          saveChangesButtonHandler={this.saveChangesButtonHandler.bind(this)}
          removePressReleasesButtonHandler={this.removePressReleasesButtonHandler.bind(this)}
          loadFileButtonHandler={this.loadFileButtonHandler.bind(this)}
          blobsRuJSX={blobsRuJSX}
          blobsKzJSX={blobsKzJSX}
          modalBlobsRuJSX={modalBlobsRuJSX}
          modalBlobsKzJSX={modalBlobsKzJSX}
          dateValue={this.state.date}
          dateChangeHandler={this.dateChangeHandler.bind(this)}
          modalDateValue={this.state.modalDate}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    pressReleases: PressReleasesCollection.find({}, {sort: {createdAt: -1}}).fetch(),
  };
}, ModeratorPressReleasesContainer)
