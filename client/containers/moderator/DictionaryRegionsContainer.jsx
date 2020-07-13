import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {qs, qsa, addScript, getEditorValue, setEditorValue} from '../../lib/coreLib.js';
import {prepareCheckboxes} from '../../lib/dictionary-main-page.js';

import DictionaryRegions from '../../components/moderator/DictionaryRegions.jsx';
import DictionaryRegionsHelmet from '../../helmets/DictionaryRegionsHelmet.jsx';

import {RegionsCollection} from '../../../api/Regions.js';

import {notReady} from '../../lib/coreLib.js';

class DictionaryRegionsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.location.query.id,
      partyOrganizationsNumber: '',
      territoryBranchesNumber: '',
      contactsTitleRu: '',
      contactsTitleKz: ''
    };
  }

  componentWillMount() {
    Meteor.subscribe('Regions');
  }

  componentDidMount() {
    document.body.setAttribute('class', 'hold-transition skin-green-light layout-top-nav');
  }

  /* START EVENT HANDLERS */

  editRegionButtonHandler(e) {
    e.preventDefault();

    const leadership = {
            ru: getEditorValue('leadershipru'),
            kz: getEditorValue('leadershipkz')
          },
          contacts = {
            ru: getEditorValue('contactsru'),
            kz: getEditorValue('contactskz')
          },
          contactsTitle = {
            ru: this.state.contactsTitleRu,
            kz: this.state.contactsTitleKz
          },
          partyOrganizationsNumber = this.state.partyOrganizationsNumber,
          territoryBranchesNumber = this.state.territoryBranchesNumber;

    Meteor.call('regions.edit', this.state.id, {
      leadership, contacts, partyOrganizationsNumber,
      territoryBranchesNumber, contactsTitle
    }, (err)=> {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Регион успешно изменен', 'success', 'growl-top-right' );
      }
    });
  }

  changeHandler(e) {
    const stateName = e.currentTarget.getAttribute('data-state-name'),
          stateValue = e.currentTarget.value;

    this.setState({
      [stateName]: stateValue
    });
  }

  changeState(stateName, stateValue) {
    this.setState({
      [stateName]: stateValue
    });
  }

  /* END EVENT HANDLERS */

  render() {
    const {regions} = this.props,
          id = this.props.location.query.id;

    if(notReady(regions))
      return <div className="preload-image"></div>;

    currentRegion = regions.filter((region) => region._id === id)[0];

    return (
      <div>
        <DictionaryRegionsHelmet />
        <DictionaryRegions
          editRegionButtonHandler={this.editRegionButtonHandler.bind(this)}
          currentRegion={currentRegion}
          changeHandler={this.changeHandler.bind(this)}
          partyOrganizationsNumber={this.state.partyOrganizationsNumber}
          territoryBranchesNumber={this.state.territoryBranchesNumber}
          contactsTitleRu={this.state.contactsTitleRu}
          contactsTitleKz={this.state.contactsTitleKz}
          changeState={this.changeState.bind(this)}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    regions: RegionsCollection.find().fetch()
  };
}, DictionaryRegionsContainer)
