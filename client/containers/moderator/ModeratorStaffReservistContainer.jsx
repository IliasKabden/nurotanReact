import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {
        qs, qsa, addScript, notReady,
        setEditorValue, getEditorValue,
        setPhotoWidgetValue, setJqueryTagValue
      } from '../../lib/coreLib.js'
import {prepareCheckboxes} from '../../lib/dictionary-main-page.js';

import ModeratorStaffReservistHelmet from '../../helmets/ModeratorStaffReservistHelmet.jsx';
import ModeratorStaffReservist from '../../components/moderator/ModeratorStaffReservist.jsx';

import SimpleSelect from '../../components/stateless/SimpleSelect.jsx';
import {StaffReservistCollection} from '../../../api/StaffReservist.js';
import {RegionsCollection} from '../../../api/Regions.js';

import moment from '../../lib/moment-with-locales.min.js';

class ModeratorStaffReservistContainer extends Component {
  componentWillMount() {
    Meteor.subscribe('AllStaffReservist');
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

  addStaffReservistButtonHandler(e) {
    e.preventDefault();
    const cForm = qs('#moderator-staffReservist-form');

    const region = this.state.region,
          blobs = {
            ru: this.state.blobsru,
            kz: this.state.blobskz
          },
          createdAt = Date.parse(this.state.date);

    Meteor.call('staffReservist.add', {
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

  editStaffReservistButtonHandler(e) {
    checkedCheckBoxes = qsa('.staffReservist-checkbox:checked');

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

    $('#staffReservist-edit-modal').modal('show');
    const id = checkedCheckBoxes[0].getAttribute('data-id');

    const {staffReservist} = this.props;

    const currentStaffReservist = staffReservist.filter((staffReservistItem) => {
      return staffReservistItem._id === id;
    })[0],
          currentForm = qs('#modal-staffReservist-form');

    currentForm.elements['region'].value = currentStaffReservist.region;
    this.setState({
      modalRegion: currentStaffReservist.region,
      modalBlobsru: currentStaffReservist.blobs.ru,
      modalBlobskz: currentStaffReservist.blobs.kz,
      modalDate: new Date(currentStaffReservist.createdAt),
    });

    qs('#modal-save-button').setAttribute('data-id', currentStaffReservist._id);
  }

  removeStaffReservistButtonHandler(e) {
    checkedCheckBoxes = qsa('input:checked');

    checkedCheckBoxes.forEach((checkbox) => {
      Meteor.call('staffReservist.remove', checkbox.getAttribute('data-id'), (err) => {
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
          cForm = qs('#modal-staffReservist-form');

    const region = cForm.elements['region'].value,
          blobs = {
            ru: this.state.modalBlobsru,
            kz: this.state.modalBlobskz,
          },
          createdAt = Date.parse(this.state.modalDate);

    Meteor.call('staffReservist.edit', id, {
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

  getStaffReservistJSX() {
    if(!this.props.staffReservist || !this.props.staffReservist.length)
      return [];

    return this.props.staffReservist.map((staffReservistItem) => {
      const date = moment(staffReservistItem.createdAt).format('L');
      return (
        <tr key={staffReservistItem._id}>
          <td><input className='staffReservist-checkbox' data-id={staffReservistItem._id} type="checkbox" /></td>
          <td>{staffReservistItem.blobs.ru.length ? staffReservistItem.blobs.ru[0].filename : ''}</td>
          <td>{staffReservistItem.blobs.kz.length ? staffReservistItem.blobs.kz[0].filename : ''}</td>
          <td>{date}</td>
        </tr>
      );
    });
  }

  /* END GENERATED JSX*/

  render() {
    const {regions, projects, staffReservist} = this.props;

    if(!regions || !staffReservist)
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
        <ModeratorStaffReservistHelmet />
        <ModeratorStaffReservist
          addStaffReservistButtonHandler={this.addStaffReservistButtonHandler.bind(this)}
          staffReservistJSX={this.getStaffReservistJSX()}
          editStaffReservistButtonHandler={this.editStaffReservistButtonHandler.bind(this)}
          saveChangesButtonHandler={this.saveChangesButtonHandler.bind(this)}
          removeStaffReservistButtonHandler={this.removeStaffReservistButtonHandler.bind(this)}
        
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
    staffReservist: StaffReservistCollection.find({}, {sort: {createdAt: -1}}).fetch(),
    regions: RegionsCollection.find().fetch(),
  };
}, ModeratorStaffReservistContainer)
