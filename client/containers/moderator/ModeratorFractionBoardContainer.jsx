
import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {qs, qsa, addScript, getEditorValue, setEditorValue} from '../../lib/coreLib.js';
import {prepareCheckboxes} from '../../lib/dictionary-main-page.js';
import {Tracker} from 'meteor/tracker';

import ModeratorFractionBoard from '../../components/moderator/ModeratorFractionBoard.jsx';
import ModeratorFractionBoardHelmet from '../../helmets/ModeratorFractionBoardHelmet.jsx';

import {FractionBoardCollection} from '../../../api/FractionBoard.js';

import {notReady} from '../../lib/coreLib.js';

class ModeratorFractionBoardContainer extends Component {
  constructor(props) {
    super(props);

    Meteor.subscribe('FractionBoard');

    this.state = {
      blobsru: [],
      blobskz: [],
      activeBlobName: ''
    };
  }

  setBlobs() {
    Tracker.autorun((c) => {
      fractionArray = FractionBoardCollection.find().fetch();
      if(fractionArray.length) {
        currentFraction = fractionArray.filter((fractionItem) => fractionItem._id === '1')[0];

        this.setState({
          blobsru: currentFraction.blobs.ru,
          blobskz: currentFraction.blobs.kz,
          activeBlobName: ''
        });
        c.stop();
      }
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

  componentDidMount() {
    document.body.setAttribute('class', 'hold-transition skin-green-light layout-top-nav');
    this.setBlobs();
  }

  /* START EVENT HANDLERS */

  editFractionBoardButtonHandler(e) {
    e.preventDefault();

    const ru = getEditorValue('fractionBoardru'),
          kz = getEditorValue('fractionBoardkz'),
          blobs = {
            ru: this.state.blobsru,
            kz: this.state.blobskz
          };

    Meteor.call('fractionBoard.edit', "1", { ru, kz, blobs }, (err)=> {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Совет фракции успешно изменен', 'success', 'growl-top-right' );
      }
    });
  }

  /* END EVENT HANDLERS */

  render() {
    const {fractionBoard} = this.props,
          id = this.props.location.query.id,
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
          });

    const currentFractionBoard = fractionBoard.filter((fractionBoardItem) => fractionBoardItem._id === "1")[0];

    return (
      <div>
        <ModeratorFractionBoardHelmet />
        <ModeratorFractionBoard
          editFractionBoardButtonHandler={this.editFractionBoardButtonHandler.bind(this)}
          currentFractionBoard={currentFractionBoard}
          loadFileButtonHandler={this.loadFileButtonHandler.bind(this)}
          blobsRuJSX={blobsRuJSX}
          blobsKzJSX={blobsKzJSX}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    fractionBoard: FractionBoardCollection.find().fetch()
  };
}, ModeratorFractionBoardContainer)
