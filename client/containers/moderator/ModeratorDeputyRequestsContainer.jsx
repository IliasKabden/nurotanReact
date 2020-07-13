import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {qs, qsa, addScript, getEditorValue, setEditorValue, notReady} from '../../lib/coreLib.js'
import {prepareCheckboxes} from '../../lib/dictionary-main-page.js';

import ModeratorDeputyRequestsHelmet from '../../helmets/ModeratorDeputyRequestsHelmet.jsx';
import ModeratorDeputyRequests from '../../components/moderator/ModeratorDeputyRequests.jsx';

import {DeputyRequestsCollection} from '../../../api/DeputyRequests.js';

class ModeratorDeputyRequestsContainer extends Component {
  componentWillMount() {
    Meteor.subscribe('AllDeputyRequests');
  }

  constructor(props) {
    super(props);

    const d = new Date();

    this.state = {
      dateAndRegistrationNumber: '',
      answerDateAndRegistrationNumber: '',
      answerInforu: '',
      answerInfokz: '',
      modalAnswerInforu: '',
      modalAnswerInfokz: '',
      answerBlobs: [],
      modalAnswerBlobs: [],
      modalDateAndRegistrationNumber: '',
      modalAnswerDateAndRegistrationNumber: '',
      initiator: '',
      modalInitiator: '',
      participants: '',
      modalParticipants: '',
      blobs: [],
      modalBlobs: [],
      addresseeru: '',
      addresseekz: '',
      modalAddresseeru: '',
      modalAddresseekz: '',
      inforu: '',
      infokz: '',
      modalInforu: '',
      modalInfokz: '',
      date: new Date(),
      modalDate: new Date(),
      activeBlobName: ''
    };
  }

  componentDidMount() {
    document.body.setAttribute('class', 'hold-transition skin-green-light layout-top-nav');
  }

  componentDidUpdate() {
    $('.deputy-request-checkbox').iCheck({
      checkboxClass: 'icheckbox_flat-blue',
      radioClass: 'iradio_flat-blue'
    });
  }

  /* START EVENT HANDLERS */

  addDeputyRequestButtonHandler(e) {
    e.preventDefault();

    const theForm = qs('#deputy-request-form'),
          {elements} = theForm,

          dateAndRegistrationNumber = this.state.dateAndRegistrationNumber,
          initiator = this.state.initiator,
          participants = this.state.participants,
          blobs = this.state.blobs,
          addressee = {
            ru: elements['addressee-ru'].value,
            kz: elements['addressee-kz'].value
          }
          info = {
            ru: elements['info-ru'].value,
            kz: elements['info-kz'].value,
          },
          createdAt = Date.parse(this.state.date),
          answerDateAndRegistrationNumber = this.state.answerDateAndRegistrationNumber,
          answerInfo = {
            ru: this.state.answerInforu,
            kz: this.state.answerInfokz
          },
          answerBlobs = this.state.answerBlobs;

    Meteor.call('deputyRequests.add', {
      dateAndRegistrationNumber, initiator, participants,
      blobs, addressee, info, createdAt, answerDateAndRegistrationNumber,
      answerInfo, answerBlobs
    }, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Депутатский запрос успешно добавлен', 'success', 'growl-top-right' );
        document.location.reload();
      }
    });
  }

  editDeputyRequestButtonHandler(e) {
    checkedCheckBoxes = qsa('.deputy-request-checkbox:checked');

    if(!checkedCheckBoxes.length)
    {
      Bert.alert( 'Вы ничего не выбрали!', 'danger', 'growl-top-right' );
      return;
    }

    if(checkedCheckBoxes.length > 1)
    {
      Bert.alert( 'Выберите не больше одного депутатского запроса в списке!', 'danger', 'growl-top-right' );
      return;
    }

    $('#deputy-request-edit-modal').modal('show');
    const id = checkedCheckBoxes[0].getAttribute('data-id'),
          theForm = qs('#modal-deputy-request-form');

    const {deputyRequests} = this.props;

    const currentDeputyRequest = deputyRequests.filter((deputyRequestItem) => {
      return deputyRequestItem._id === id;
    })[0];

    this.setState({
      modalDateAndRegistrationNumber: currentDeputyRequest.dateAndRegistrationNumber,
      modalInitiator: currentDeputyRequest.initiator,
      modalParticipants: currentDeputyRequest.participants,
      modalBlobs: currentDeputyRequest.blobs,
      modalAddresseeru: currentDeputyRequest.addressee.ru,
      modalAddresseekz: currentDeputyRequest.addressee.kz,
      modalInforu: currentDeputyRequest.info.ru,
      modalInfokz: currentDeputyRequest.info.kz,
      modalDate: currentDeputyRequest.createdAt,
      modalAnswerDateAndRegistrationNumber: currentDeputyRequest.answerDateAndRegistrationNumber,
      modalAnswerInforu: currentDeputyRequest.answerInfo.ru,
      modalAnswerInfokz: currentDeputyRequest.answerInfo.kz,
      modalAnswerBlobs: currentDeputyRequest.answerBlobs
    });

    theForm.elements['addressee-ru'].value = currentDeputyRequest.addressee.ru;
    theForm.elements['addressee-kz'].value = currentDeputyRequest.addressee.kz;

    qs('#modal-save-button').setAttribute('data-id', currentDeputyRequest._id);
  }

  removeDeputyRequestsButtonHandler(e) {
    checkedCheckBoxes = qsa('input:checked');

    checkedCheckBoxes.forEach((checkbox) => {
      Meteor.call('deputyRequests.remove', checkbox.getAttribute('data-id'), (err) => {
        if(err) {
          Bert.alert( err.reason, 'danger', 'growl-top-right' );
        }
        else {
          Bert.alert( "Финансовый отчет успешно удален", 'success', 'growl-top-right' );
        }
      });
    });
  }

  saveChangesButtonHandler(e) {
    const id = qs('#modal-save-button').getAttribute('data-id'),
          theForm = qs('#modal-deputy-request-form'),
          dateAndRegistrationNumber = this.state.modalDateAndRegistrationNumber,
          initiator = this.state.modalInitiator,
          participants = this.state.modalParticipants,
          blobs = this.state.modalBlobs,
          addressee = {
            ru: this.state.modalAddresseeru,
            kz: this.state.modalAddresseekz
          },
          info = {
            ru: this.state.modalInforu,
            kz: this.state.modalInfokz,
          },
          createdAt = this.state.modalDate,
          answerDateAndRegistrationNumber = this.state.modalAnswerDateAndRegistrationNumber,
          answerInfo = {
            ru: this.state.modalAnswerInforu,
            kz: this.state.modalAnswerInfokz
          },
          answerBlobs = this.state.modalAnswerBlobs;

    Meteor.call('deputyRequests.edit', id, {
      dateAndRegistrationNumber, initiator,
      participants, blobs, addressee, info, createdAt,
      answerDateAndRegistrationNumber, answerInfo,
      answerBlobs
    }, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Депутатский запрос успешно изменен', 'success', 'growl-top-right' );
        window.location.reload();
      }
    });
  }

  /* END EVENT HANDLERS */

  stateValueChangeHandler(e) {
    const stateName = e.currentTarget.getAttribute('data-state-name'),
          value = e.currentTarget.value;

    this.setState({
      [stateName]: value
    });
  }

  dateChangeHandler(e) {
    const stateName = e.currentTarget.getAttribute('data-state-name'),
          stateValue = e.currentTarget.value;

    this.setState({
      [stateName]: stateValue
    });
  }

  /* START GENERATED JSX*/

  getDeputyRequestsJSX() {
    if(!this.props.deputyRequests || !this.props.deputyRequests.length)
      return [];

    return this.props.deputyRequests.map((deputyRequestItem) => {
      return (
        <tr key={deputyRequestItem._id}>
          <td><input className='deputy-request-checkbox' data-id={deputyRequestItem._id} type="checkbox" /></td>
          <td>{deputyRequestItem.info.ru}</td>
          <td>{deputyRequestItem.info.kz}</td>
        </tr>
      );
    });
  }

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

  /* END GENERATED JSX*/

  render() {
    if(notReady(this.props.deputyRequests) || !this.props.deputyRequests.length)
      return <div className="preload-image"></div>;

    const blobsJSX = this.state.blobs.map((blob, index) => {
      return (
        <li key={index}>
          {blob.filename}
          &nbsp;&nbsp;<a href="#" data-position={index} data-state-name="blobs" onClick={this.deleteFileFromList.bind(this)}>удалить</a>
        </li>
      );
    }),
          modalBlobsJSX = this.state.modalBlobs.map((blob, index) => {
      return (
        <li key={index}>
          {blob.filename}
          &nbsp;&nbsp;<a href="#" data-position={index} data-state-name="modalBlobs" onClick={this.deleteFileFromList.bind(this)}>удалить</a>
        </li>
      );
    }),
          answerBlobsJSX = this.state.answerBlobs.map((blob, index) => {
            return (
              <li key={index}>
                {blob.filename}
                &nbsp;&nbsp;<a href="#" data-position={index} data-state-name="answerBlobs" onClick={this.deleteFileFromList.bind(this)}>удалить</a>
              </li>
            );
          }),
          modalAnswerBlobsJSX = this.state.modalAnswerBlobs.map((blob, index) => {
            return (
              <li key={index}>
                {blob.filename}
                &nbsp;&nbsp;<a href="#" data-position={index} data-state-name="modalAnswerBlobs" onClick={this.deleteFileFromList.bind(this)}>удалить</a>
              </li>
            );
          });

    return (
      <div>
        <ModeratorDeputyRequestsHelmet />
        <ModeratorDeputyRequests
          addDeputyRequestButtonHandler={this.addDeputyRequestButtonHandler.bind(this)}
          deputyRequestsJSX={this.getDeputyRequestsJSX()}
          editDeputyRequestButtonHandler={this.editDeputyRequestButtonHandler.bind(this)}
          saveChangesButtonHandler={this.saveChangesButtonHandler.bind(this)}
          removeDeputyRequestsButtonHandler={this.removeDeputyRequestsButtonHandler.bind(this)}
          stateValueChangeHandler={this.stateValueChangeHandler.bind(this)}
          loadFileButtonHandler={this.loadFileButtonHandler.bind(this)}
          dateAndRegistrationNumber={this.state.dateAndRegistrationNumber}
          answerDateAndRegistrationNumber={this.state.answerDateAndRegistrationNumber}
          modalDateAndRegistrationNumber={this.state.modalDateAndRegistrationNumber}
          modalAnswerDateAndRegistrationNumber={this.state.modalAnswerDateAndRegistrationNumber}
          initiator={this.state.initiator}
          modalInitiator={this.state.modalInitiator}
          participants={this.state.participants}
          modalParticipants={this.state.modalParticipants}
          addresseeru={this.state.addresseeru}
          addresseekz={this.state.addresseekz}
          modalAddresseeru={this.state.modalAddresseeru}
          modalAddresseekz={this.state.modalAddresseekz}
          inforu={this.state.inforu}
          infokz={this.state.infokz}
          answerInforu={this.state.answerInforu}
          answerInfokz={this.state.answerInfokz}
          modalInforu={this.state.modalInforu}
          modalInfokz={this.state.modalInfokz}
          modalAnswerInforu={this.state.modalAnswerInforu}
          modalAnswerInfokz={this.state.modalAnswerInfokz}
          blobsJSX={blobsJSX}
          modalBlobsJSX={modalBlobsJSX}
          answerBlobsJSX={answerBlobsJSX}
          modalAnswerBlobsJSX={modalAnswerBlobsJSX}
          dateValue={this.state.date}
          dateChangeHandler={this.dateChangeHandler.bind(this)}
          modalDateValue={this.state.modalDate} />
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    deputyRequests: DeputyRequestsCollection.find({}, {sort: {createdAt: -1}}).fetch(),
  };
}, ModeratorDeputyRequestsContainer)
