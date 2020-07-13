import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {
        qs, qsa, addScript, notReady,
        setEditorValue, getEditorValue,
        setPhotoWidgetValue, setJqueryTagValue
      } from '../../lib/coreLib.js'
import {prepareCheckboxes} from '../../lib/dictionary-main-page.js';

import ModeratorStaffListHelmet from '../../helmets/ModeratorStaffListHelmet.jsx';
import ModeratorStaffList from '../../components/moderator/ModeratorStaffList.jsx';

import SimpleSelect from '../../components/stateless/SimpleSelect.jsx';
import {StaffListCollection} from '../../../api/StaffList.js';
import {RegionsCollection} from '../../../api/Regions.js';

import moment from '../../lib/moment-with-locales.min.js';

class ModeratorStaffListContainer extends Component {
  componentWillMount() {
    Meteor.subscribe('AllStaffList');
    Meteor.subscribe('Regions');
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

  /* START EVENT HANDLERS */

  addStaffListButtonHandler(e) {
    e.preventDefault();
    const cForm = qs('#moderator-staffList-form');

    const region = this.state.region,
          blobs = {
            ru: this.state.blobsru,
            kz: this.state.blobskz
          },
          createdAt = Date.parse(this.state.date);

    Meteor.call('staffList.add', {
      region, blobs, createdAt
    }, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Кадровые резерв - регионы успешно добавлен', 'success', 'growl-top-right' );
        document.location.reload();
      }
    });
  }

  editStaffListButtonHandler(e) {
    checkedCheckBoxes = qsa('.staffList-checkbox:checked');

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

    $('#staffList-edit-modal').modal('show');
    const id = checkedCheckBoxes[0].getAttribute('data-id');

    const {staffList} = this.props;

    const currentStaffList = staffList.filter((staffListItem) => {
      return staffListItem._id === id;
    })[0],
          currentForm = qs('#modal-staffList-form');

    currentForm.elements['region'].value = currentStaffList.region;
    this.setState({
      modalRegion: currentStaffList.region,
      modalBlobsru: currentStaffList.blobs.ru,
      modalBlobskz: currentStaffList.blobs.kz,
      modalDate: new Date(currentStaffList.createdAt),
    });

    qs('#modal-save-button').setAttribute('data-id', currentStaffList._id);
  }

  removeStaffListButtonHandler(e) {
    checkedCheckBoxes = qsa('input:checked');

    checkedCheckBoxes.forEach((checkbox) => {
      Meteor.call('staffList.remove', checkbox.getAttribute('data-id'), (err) => {
        if(err) {
          Bert.alert( err.reason, 'danger', 'growl-top-right' );
        }
        else {
          Bert.alert( "Кадровый резерв-регионы успешно удалена", 'success', 'growl-top-right' );
        }
      });
    });
  }

  saveChangesButtonHandler(e) {
    e.preventDefault();

    const id = e.target.getAttribute('data-id'),
          cForm = qs('#modal-staffList-form');

    const region = cForm.elements['region'].value,
          blobs = {
            ru: this.state.modalBlobsru,
            kz: this.state.modalBlobskz,
          },
          createdAt = Date.parse(this.state.modalDate);

    Meteor.call('staffList.edit', id, {
      region, blobs, createdAt
    }, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Кадровый резерв-регионы успешно изменен', 'success', 'growl-top-right' );
        cForm.reset();
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

  getStaffListJSX() {
    if(!this.props.staffList || !this.props.staffList.length)
      return [];

    return this.props.staffList.map((staffListItem) => {
      const date = moment(staffListItem.createdAt).format('L');
      return (
        <tr key={staffListItem._id}>
          <td><input className='staffList-checkbox' data-id={staffListItem._id} type="checkbox" /></td>
          <td>{staffListItem.blobs.ru.length ? staffListItem.blobs.ru[0].filename : ''}</td>
          <td>{staffListItem.blobs.kz.length ? staffListItem.blobs.kz[0].filename : ''}</td>
          <td>{date}</td>
        </tr>
      );
    });
  }

  /* END GENERATED JSX*/

  render() {
    const {regions, projects, staffList} = this.props;

    if(!regions || !staffList)
      return <div className="preload-image"></div>;

    const regionSelectJSX = 
    
    // <SimpleSelect
    //         options={regions}
    //         name="region"
    //         label="Главная (Центральный Аппарат, без региона)"
    //         changeHandler={this.dateChangeHandler.bind(this)}
    //         value={this.state.region}
    //         dataStateName="region"/>,
    //       modalRegionSelectJSX = <SimpleSelect
    //         options={regions}
    //         name="region"
    //         label="Выберите регион | Аймақты таңдаңыз"
    //         changeHandler={this.dateChangeHandler.bind(this)}
    //         value={this.state.modalRegion}
    //         dataStateName="modalRegion"/>,
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
        <ModeratorStaffListHelmet />
        <ModeratorStaffList
          addStaffListButtonHandler={this.addStaffListButtonHandler.bind(this)}
          staffListJSX={this.getStaffListJSX()}
          editStaffListButtonHandler={this.editStaffListButtonHandler.bind(this)}
          saveChangesButtonHandler={this.saveChangesButtonHandler.bind(this)}
          removeStaffListButtonHandler={this.removeStaffListButtonHandler.bind(this)}
        
          loadFileButtonHandler={this.loadFileButtonHandler.bind(this)}
          blobsRuJSX={blobsRuJSX}
          blobsKzJSX={blobsKzJSX}
          modalBlobsRuJSX={modalBlobsRuJSX}
          modalBlobsKzJSX={modalBlobsKzJSX}
          dateValue={this.state.date}
          modalDateValue={this.state.modalDate}
          dateChangeHandler={this.dateChangeHandler.bind(this)}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    staffList: StaffListCollection.find({}, {sort: {createdAt: -1}}).fetch(),
    regions: RegionsCollection.find().fetch(),
  };
}, ModeratorStaffListContainer)
