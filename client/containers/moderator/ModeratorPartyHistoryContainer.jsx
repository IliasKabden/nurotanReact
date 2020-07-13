import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {qs, qsa, addScript, getEditorValue, setEditorValue} from '../../lib/coreLib.js';
import {prepareCheckboxes} from '../../lib/dictionary-main-page.js';

import ModeratorPartyHistory from '../../components/moderator/ModeratorPartyHistory.jsx';
import ModeratorPartyHistoryHelmet from '../../helmets/ModeratorPartyHistoryHelmet.jsx';

import {PartyHistoryCollection} from '../../../api/PartyHistory.js';

import {notReady} from '../../lib/coreLib.js';

class PartyHistoryContainer extends Component {
  constructor(props) {
    super(props);

    Meteor.subscribe('PartyHistory');
  }

  componentDidMount() {
    document.body.setAttribute('class', 'hold-transition skin-green-light layout-top-nav');
  }

  /* START EVENT HANDLERS */

  editRegionButtonHandler(e) {
    e.preventDefault();

    const ru = getEditorValue('historyru'),
          kz = getEditorValue('historykz');

    Meteor.call('partyHistory.edit', "1", { ru, kz }, (err)=> {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('История успешно изменена', 'success', 'growl-top-right' );
      }
    });
  }

  /* END EVENT HANDLERS */

  render() {
    const {partyHistory} = this.props,
          id = this.props.location.query.id;

    currentHistory = partyHistory.filter((partyHistoryItem) => partyHistoryItem._id === "1")[0];

    return (
      <div>
        <ModeratorPartyHistoryHelmet />
        <ModeratorPartyHistory
          editRegionButtonHandler={this.editRegionButtonHandler.bind(this)}
          currentHistory={currentHistory}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    partyHistory: PartyHistoryCollection.find().fetch()
  };
}, PartyHistoryContainer)
