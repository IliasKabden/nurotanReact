import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {
        qs, qsa, addScript, notReady,
        setEditorValue, getEditorValue,
        setPhotoWidgetValue, setJqueryTagValue
      } from '../../lib/coreLib.js'
import {prepareCheckboxes} from '../../lib/dictionary-main-page.js';

import ModeratorStaffCompetetionsHelmet from '../../helmets/ModeratorStaffCompetetionsHelmet.jsx';
import ModeratorStaffCompetetions from '../../components/moderator/ModeratorStaffCompetetions.jsx';

import SimpleSelect from '../../components/stateless/SimpleSelect.jsx';
import {StaffCompetetionsCollection} from '../../../api/StaffCompetetions.js';
import {RegionsCollection} from '../../../api/Regions.js';

import moment from '../../lib/moment-with-locales.min.js';

class ModeratorStaffCompetetionsContainer extends Component {
  componentWillMount() {
    Meteor.subscribe('AllStaffCompetetions', this.state.competetionsNumber);
    Meteor.subscribe('Regions');
  }

  constructor(props) {
    super(props);

    this.state = {
      region: "9",

    };

    this.state = {
      blobsru: [],
      blobskz: [],
      modalBlobsru: [],
      modalBlobskz: [],
      activeBlobName: '',
      titleru: '',
      titlekz: '',
      modalTitleRu: '',
      modalTitleKz: '',
      modalDate: new Date(),
      date: new Date(),
      competetionsNumber: 100
    };
  }

  componentDidMount() {
    document.body.setAttribute('class', 'hold-transition skin-green-light layout-top-nav');
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

  modalLoadFileButtonHandler(e) {
    e.preventDefault();
    filepicker.pickMultiple({language: 'ru'}, this.modalFileLoaded.bind(this), this.fileLoadError.bind(this), this.fileLoadProgress.bind(this));
  }

  /* START EVENT HANDLERS */

  addStaffCompetetionsButtonHandler(e) {
    e.preventDefault();
    const cForm = qs('#moderator-staffCompetetions-form');

    const title = {
            ru: this.state.titleru,
            kz: this.state.titlekz
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

    Meteor.call('staffCompetetions.add', {
      title, text, blobs, createdAt
    }, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Кадровые резерв - конкурсы успешно добавлен', 'success', 'growl-top-right' );
        document.location.reload();
      }
    });
  }

  editStaffCompetetionsButtonHandler(e) {
    checkedCheckBoxes = qsa('.staffCompetetions-checkbox:checked');

    if(!checkedCheckBoxes.length)
    {
      Bert.alert( 'Вы ничего не выбрали!', 'danger', 'growl-top-right' );
      return;
    }

    if(checkedCheckBoxes.length > 1)
    {
      Bert.alert( 'Выберите не больше одного кадрового резерва в списке!', 'danger', 'growl-top-right' );
      return;
    }

    $('#staffCompetetions-edit-modal').modal('show');
    const id = checkedCheckBoxes[0].getAttribute('data-id');

    const {staffCompetetions} = this.props;

    const currentStaffCompetetions = staffCompetetions.filter((staffCompetetionsItem) => {
      return staffCompetetionsItem._id === id;
    })[0],
          currentForm = qs('#modal-staffCompetetions-form');


    currentForm.elements['competetions-title-ru'].value = currentStaffCompetetions.title.ru;
    currentForm.elements['competetions-title-kz'].value = currentStaffCompetetions.title.kz;

    setEditorValue('modalTextEditorRu', currentStaffCompetetions.text.ru);
    setEditorValue('modalTextEditorKz', currentStaffCompetetions.text.kz);

    this.setState({
      modalBlobsru: currentStaffCompetetions.blobs.ru,
      modalBlobskz: currentStaffCompetetions.blobs.kz,
      modalDate: new Date(currentStaffCompetetions.createdAt)
    });

    qs('#modal-save-button').setAttribute('data-id', currentStaffCompetetions._id);
  }

  removeStaffCompetetionsButtonHandler(e) {
    checkedCheckBoxes = qsa('input:checked');

    checkedCheckBoxes.forEach((checkbox) => {
      Meteor.call('staffCompetetions.remove', checkbox.getAttribute('data-id'), (err) => {
        if(err) {
          Bert.alert( err.reason, 'danger', 'growl-top-right' );
        }
        else {
          Bert.alert( "Кадровый резерв-конкурсы успешно удалена", 'success', 'growl-top-right' );
        }
      });
    });
  }

  saveChangesButtonHandler(e) {
    e.preventDefault();

    const id = e.target.getAttribute('data-id'),
          currentForm = qs('#modal-staffCompetetions-form'),
          title = {
            ru: currentForm.elements['competetions-title-ru'].value,
            kz: currentForm.elements['competetions-title-kz'].value
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

    Meteor.call('staffCompetetions.edit', id, { title, text, createdAt, blobs }, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Кадровый резерв-конкурсы успешно изменен', 'success', 'growl-top-right' );
        qs('#modal-staffCompetetions-form').form.reset();
        this.setState({
          modalBlobsru: [],
          modalBlobskz: []
        });
      }
    });
  }

  checkChangeHandler(e) {
    const stateName = e.currentTarget.getAttribute('data-state-name'),
          stateValue = e.currentTarget.checked;

    this.setState({
      [stateName]: stateValue
    });
  }

  dateChangeHandler(e) {
    const stateName = e.currentTarget.getAttribute('data-state-name'),
          stateValue = e.currentTarget.value;

    this.setState({
      [stateName]: stateValue
    });
  }

  /* END EVENT HANDLERS */

  /* START GENERATED JSX*/

  getStaffCompetetionsJSX() {
    if(!this.props.staffCompetetions || !this.props.staffCompetetions.length)
      return [];

    return this.props.staffCompetetions.map((staffCompetetionsItem) => {
      const date = moment(staffCompetetionsItem.createdAt).format('L');
      return (
        <tr key={staffCompetetionsItem._id}>
          <td><input className='staffCompetetions-checkbox' data-id={staffCompetetionsItem._id} type="checkbox" /></td>
            <td>{staffCompetetionsItem.title.ru}</td>
            <td>{staffCompetetionsItem.title.kz}</td>
          <td>{date}</td>
        </tr>
      );
    });
  }

  /* END GENERATED JSX*/

  render() {
    const {regions, projects, staffCompetetions} = this.props;

    if(!regions || !staffCompetetions)
      return <div className="preload-image"></div>;

    const regionSelectJSX = <SimpleSelect
            options={regions}
            name="region"
            label="Главная (Центральный Аппарат, без региона)"
            changeHandler={this.dateChangeHandler.bind(this)}
            value={this.state.region}
            dataStateName="region"/>,
          modalRegionSelectJSX = <SimpleSelect
            options={regions}
            name="region"
            label="Выберите регион | Аймақты таңдаңыз"
            changeHandler={this.dateChangeHandler.bind(this)}
            value={this.state.modalRegion}
            dataStateName="modalRegion"/>,
          blobsRuJSX = this.state.blobsru.map((blob, index) => {
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
        <ModeratorStaffCompetetionsHelmet />
        <ModeratorStaffCompetetions
          addStaffCompetetionsButtonHandler={this.addStaffCompetetionsButtonHandler.bind(this)}
          staffCompetetionsJSX={this.getStaffCompetetionsJSX()}
          editStaffCompetetionsButtonHandler={this.editStaffCompetetionsButtonHandler.bind(this)}
          saveChangesButtonHandler={this.saveChangesButtonHandler.bind(this)}
          removeStaffCompetetionsButtonHandler={this.removeStaffCompetetionsButtonHandler.bind(this)}
          loadFileButtonHandler={this.loadFileButtonHandler.bind(this)}
          blobsRuJSX={blobsRuJSX}
          blobsKzJSX={blobsKzJSX}
          modalBlobsRuJSX={modalBlobsRuJSX}
          modalBlobsKzJSX={modalBlobsKzJSX}
          dateValue={this.state.date}
          modalDateValue={this.state.modalDate}
          titleRuValue={this.state.titleru}
          titleKzValue={this.state.titlekz}
          modalTitleRuValue={this.state.modalTitleRu}
          modalTitleKzValue={this.state.modalTitleKz}
          dateChangeHandler={this.dateChangeHandler.bind(this)}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    staffCompetetions: StaffCompetetionsCollection.find({}, {sort: {createdAt: -1}}).fetch(),
    regions: RegionsCollection.find().fetch(),
  };
}, ModeratorStaffCompetetionsContainer)
