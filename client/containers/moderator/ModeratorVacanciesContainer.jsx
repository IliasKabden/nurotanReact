import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {qs, qsa, addScript, setEditorValue, getEditorValue,} from '../../lib/coreLib.js'
import {prepareCheckboxes} from '../../lib/dictionary-main-page.js';

import ModeratorVacanciesHelmet from '../../helmets/ModeratorVacanciesHelmet.jsx';
import ModeratorVacancies from '../../components/moderator/ModeratorVacancies.jsx';

import {VacanciesCollection} from '../../../api/Vacancies.js';

class ModeratorVacanciesContainer extends Component {
  constructor(props) {
    super(props);

    Meteor.subscribe('Vacancies');

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

  dateChangeHandler(e) {
    const stateName = e.currentTarget.getAttribute('data-state-name'),
          stateValue = e.currentTarget.value;

    this.setState({
      [stateName]: stateValue
    });
  }

  addVacancyButtonHandler(e) {
    e.preventDefault();

    const theForm = qs('#moderator-vacancy-form'),
          title = {
            ru: theForm.elements['vacancy-title-ru'].value,
            kz: theForm.elements['vacancy-title-kz'].value
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

    Meteor.call('vacancies.add', {title, text, blobs, createdAt}, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Вакансия успешно добавлена', 'success', 'growl-top-right' );
        document.location.reload();
      }
    });
  }

  editVacancyButtonHandler(e) {
    checkedCheckBoxes = qsa('.vacancy-checkbox:checked');

    if(!checkedCheckBoxes.length)
    {
      Bert.alert( 'Вы ничего не выбрали!', 'danger', 'growl-top-right' );
      return;
    }

    if(checkedCheckBoxes.length > 1)
    {
      Bert.alert( 'Выберите не больше одной вакансии в списке!', 'danger', 'growl-top-right' );
      return;
    }

    $('#vacancy-edit-modal').modal('show');
    const id = checkedCheckBoxes[0].getAttribute('data-id');

    const {vacancies} = this.props;

    const currentVacancy = vacancies.filter((vacancyItem) => {
      return vacancyItem._id === id;
    })[0];

    const theForm = qs('#modal-vacancy-form');

    theForm.elements['vacancy-title-ru'].value = currentVacancy.title.ru;
    theForm.elements['vacancy-title-kz'].value = currentVacancy.title.kz;

    setEditorValue('modalTextEditorRu', currentVacancy.text.ru);
    setEditorValue('modalTextEditorKz', currentVacancy.text.kz);

    this.setState({
      modalBlobsru: currentVacancy.blobs.ru,
      modalBlobskz: currentVacancy.blobs.kz,
      modalDate: new Date(currentVacancy.createdAt)
    });

    qs('#modal-save-button').setAttribute('data-id', currentVacancy._id);
  }

  removeVacanciesButtonHandler(e) {
    checkedCheckBoxes = qsa('input:checked');

    checkedCheckBoxes.forEach((checkbox) => {
      Meteor.call('vacancies.remove', checkbox.getAttribute('data-id'), (err) => {
        if(err) {
          Bert.alert( err.reason, 'danger', 'growl-top-right' );
        }
        else {
          Bert.alert( "Вакансия успешно удалена", 'success', 'growl-top-right' );
        }
      });
    });
  }

  saveChangesButtonHandler(e) {
    const id = e.target.getAttribute('data-id'),
          theForm = qs('#modal-vacancy-form'),
          title = {
            ru: theForm.elements['vacancy-title-ru'].value,
            kz: theForm.elements['vacancy-title-kz'].value
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

    Meteor.call('vacancies.edit', id, {title, text, blobs, createdAt}, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Вакансия успешно изменена', 'success', 'growl-top-right' );
        qs('#modal-vacancy-form').form.reset();
        this.setState({
          modalBlobsru: [],
          modalBlobskz: []
        });
      }text
    });
  }

  /* END EVENT HANDLERS */

  /* START GENERATED JSX*/

  getVacanciesJSX() {
    if(!this.props.vacancies || !this.props.vacancies.length)
      return [];

    return this.props.vacancies.map((vacancyItem) => {
      return (
        <tr key={vacancyItem._id}>
          <td><input className='vacancy-checkbox' data-id={vacancyItem._id} type="checkbox" /></td>
          <td>{vacancyItem.title.ru}</td>
          <td>{vacancyItem.title.kz}</td>
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
        <ModeratorVacanciesHelmet />
        <ModeratorVacancies
          addVacancyButtonHandler={this.addVacancyButtonHandler.bind(this)}
          vacanciesJSX={this.getVacanciesJSX()}
          editVacancyButtonHandler={this.editVacancyButtonHandler.bind(this)}
          saveChangesButtonHandler={this.saveChangesButtonHandler.bind(this)}
          removeVacanciesButtonHandler={this.removeVacanciesButtonHandler.bind(this)}
          loadFileButtonHandler={this.loadFileButtonHandler.bind(this)}
          blobsRuJSX={blobsRuJSX}
          blobsKzJSX={blobsKzJSX}
          modalBlobsRuJSX={modalBlobsRuJSX}
          modalBlobsKzJSX={modalBlobsKzJSX}
          dateValue={this.state.date}
          dateChangeHandler={this.dateChangeHandler.bind(this)}
          modalDateValue={this.state.modalDate} />
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    vacancies: VacanciesCollection.find({}, {sort: {createdAt: -1}}).fetch(),
  };
}, ModeratorVacanciesContainer)
