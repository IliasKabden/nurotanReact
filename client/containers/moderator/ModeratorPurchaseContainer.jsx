import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {qs, qsa, addScript, setEditorValue, getEditorValue,} from '../../lib/coreLib.js'
import {prepareCheckboxes} from '../../lib/dictionary-main-page.js';

import ModeratorPurchaseHelmet from '../../helmets/ModeratorPurchaseHelmet.jsx';
import ModeratorPurchase from '../../components/moderator/ModeratorPurchase.jsx';

import {PurchaseCollection} from '../../../api/Purchase.js';

class ModeratorPurchaseContainer extends Component {
  componentWillMount() {
    Meteor.subscribe('AllRuPurchase');
    Meteor.subscribe('AllKzPurchase');
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

  dateChangeHandler(e) {
    const stateName = e.currentTarget.getAttribute('data-state-name'),
          stateValue = e.currentTarget.value;

    this.setState({
      [stateName]: stateValue
    });
  }

  addPurchaseButtonHandler(e) {
    e.preventDefault();

    const theForm = qs('#moderator-purchase-form'),
          title = {
            ru: theForm.elements['purchase-title-ru'].value,
            kz: theForm.elements['purchase-title-kz'].value
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

    Meteor.call('purchase.add', {title, text, blobs, createdAt}, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        document.location.reload();
      }
    });
  }

  editPurchaseButtonHandler(e) {
    checkedCheckBoxes = qsa('.purchase-checkbox:checked');

    if(!checkedCheckBoxes.length)
    {
      Bert.alert( 'Вы ничего не выбрали!', 'danger', 'growl-top-right' );
      return;
    }

    if(checkedCheckBoxes.length > 1)
    {
      Bert.alert( 'Выберите не больше одной закупки в списке!', 'danger', 'growl-top-right' );
      return;
    }

    $('#purchase-edit-modal').modal('show');
    const id = checkedCheckBoxes[0].getAttribute('data-id');

    const {purchase} = this.props;

    const currentPurchase = purchase.filter((purchaseItem) => {
      return purchaseItem._id === id;
    })[0];

    const theForm = qs('#modal-purchase-form');

    theForm.elements['purchase-title-ru'].value = currentPurchase.title.ru;
    theForm.elements['purchase-title-kz'].value = currentPurchase.title.kz;

    setEditorValue('modalTextEditorRu', currentPurchase.text.ru);
    setEditorValue('modalTextEditorKz', currentPurchase.text.kz);

    this.setState({
      modalBlobsru: currentPurchase.blobs.ru || [],
      modalBlobskz: currentPurchase.blobs.kz || [],
      modalDate: new Date(currentPurchase.createdAt)
    });

    qs('#modal-save-button').setAttribute('data-id', currentPurchase._id);
  }

  removePurchaseButtonHandler(e) {
    checkedCheckBoxes = qsa('input:checked');

    checkedCheckBoxes.forEach((checkbox) => {
      Meteor.call('purchase.remove', checkbox.getAttribute('data-id'), (err) => {
        if(err) {
          Bert.alert( err.reason, 'danger', 'growl-top-right' );
        }
        else {
          Bert.alert( "Закупка успешно удалена", 'success', 'growl-top-right' );
        }
      });
    });
  }

  saveChangesButtonHandler(e) {
    const id = e.target.getAttribute('data-id'),
          theForm = qs('#modal-purchase-form'),
          title = {
            ru: theForm.elements['purchase-title-ru'].value,
            kz: theForm.elements['purchase-title-kz'].value
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

    Meteor.call('purchase.edit', id, {title, text, blobs, createdAt}, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Закупка успешно изменена', 'success', 'growl-top-right' );
        window.location.reload();
      }text
    });
  }

  /* END EVENT HANDLERS */

  /* START GENERATED JSX*/

  getPurchaseJSX() {
    if(!this.props.purchase || !this.props.purchase.length)
      return [];

    return this.props.purchase.map((purchaseItem) => {
      return (
        <tr key={purchaseItem._id}>
          <td><input className='purchase-checkbox' data-id={purchaseItem._id} type="checkbox" /></td>
          <td>{purchaseItem.title.ru}</td>
          <td>{purchaseItem.title.kz}</td>
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
        <ModeratorPurchaseHelmet />
        <ModeratorPurchase
          addPurchaseButtonHandler={this.addPurchaseButtonHandler.bind(this)}
          purchaseJSX={this.getPurchaseJSX()}
          editPurchaseButtonHandler={this.editPurchaseButtonHandler.bind(this)}
          saveChangesButtonHandler={this.saveChangesButtonHandler.bind(this)}
          removePurchaseButtonHandler={this.removePurchaseButtonHandler.bind(this)}
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
    purchase: PurchaseCollection.find({}, {sort: {createdAt: -1}}).fetch(),
  };
}, ModeratorPurchaseContainer)
