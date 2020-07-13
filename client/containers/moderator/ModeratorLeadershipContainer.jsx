import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {
        qs, qsa, addScript, notReady,
        setEditorValue, getEditorValue,
      } from '../../lib/coreLib.js'
import {prepareCheckboxes} from '../../lib/dictionary-main-page.js';

import ModeratorLeadershipHelmet from '../../helmets/ModeratorLeadershipHelmet.jsx';
import ModeratorLeadership from '../../components/moderator/ModeratorLeadership.jsx';

import {LeadershipCollection} from '../../../api/Leadership.js';

import moment from '../../lib/moment-with-locales.min.js';

class ModeratorLeadershipContainer extends Component {
  componentWillMount() {
    Meteor.subscribe('Leadership');
  }

  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      modalDate: new Date()
    }
  }

  componentDidMount() {
    document.body.setAttribute('class', 'hold-transition skin-green-light layout-top-nav');
  }

  /* START EVENT HANDLERS */

  addLeadershipButtonHandler(e) {
    e.preventDefault();
    const cForm = qs('#moderator-leadership-form');

    const name = {
            ru: cForm.elements['full-name-ru'].value,
            kz: cForm.elements['full-name-kz'].value
          },
          position = {
            ru: cForm.elements['position-ru'].value,
            kz: cForm.elements['position-kz'].value,
          },
          biography = {
            ru: getEditorValue('formBiographyRu'),
            kz: getEditorValue('formBiographyKz'),
          },
          info = {
            ru: getEditorValue('formInfoRu'),
            kz: getEditorValue('formInfoKz'),
          },
          photo = cForm.elements['photo'].value,
          createdAt = Date.parse(this.state.date);

    Meteor.call('leadership.add', {
      name, position, biography, info, photo, createdAt
    }, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Член руководства партии успешно добавлен', 'success', 'growl-top-right' );
        document.location.reload();
      }
    });
  }

  editLeadershipButtonHandler(e) {
    checkedCheckBoxes = qsa('.leadership-checkbox:checked');

    if(!checkedCheckBoxes.length)
    {
      Bert.alert( 'Вы ничего не выбрали!', 'danger', 'growl-top-right' );
      return;
    }

    if(checkedCheckBoxes.length > 1)
    {
      Bert.alert( 'Выберите не больше члена руководства в списке!', 'danger', 'growl-top-right' );
      return;
    }

    $('#leadership-edit-modal').modal('show');
    const id = checkedCheckBoxes[0].getAttribute('data-id');

    const {leadership} = this.props;

    const currentLeadership = leadership.filter((leadershipItem) => {
      return leadershipItem._id === id;
    })[0];

    setEditorValue('modalInfoRu', currentLeadership.info.ru);
    setEditorValue('modalInfoKz', currentLeadership.info.kz);

    setEditorValue('modalBiographyRu', currentLeadership.biography.ru);
    setEditorValue('modalBiographyKz', currentLeadership.biography.kz);

    const cForm = qs('#modal-leadership-form');

    cForm.elements['full-name-ru'].value = currentLeadership.name.ru,
    cForm.elements['full-name-kz'].value = currentLeadership.name.kz,
    cForm.elements['position-ru'].value = currentLeadership.position.ru,
    cForm.elements['position-kz'].value = currentLeadership.position.kz;
    cForm.elements['photo'].value = currentLeadership.photo;

    this.setState({
      modalDate: new Date(currentLeadership.createdAt),
    });

    qs('#modal-save-button').setAttribute('data-id', currentLeadership._id);
  }

  removeLeadershipButtonHandler(e) {
    checkedCheckBoxes = qsa('input:checked');

    checkedCheckBoxes.forEach((checkbox) => {
      Meteor.call('leadership.remove', checkbox.getAttribute('data-id'), (err) => {
        if(err) {
          Bert.alert( err.reason, 'danger', 'growl-top-right' );
        }
        else {
          Bert.alert( "Член руководства успешно удален", 'success', 'growl-top-right' );
        }
      });
    });
  }

  saveChangesButtonHandler(e) {
    e.preventDefault();

    const id = e.target.getAttribute('data-id'),
          cForm = qs('#modal-leadership-form');

    const name = {
            ru: cForm.elements['full-name-ru'].value,
            kz: cForm.elements['full-name-kz'].value,
          },
          position = {
            ru: cForm.elements['position-ru'].value,
            kz: cForm.elements['position-kz'].value,
          },
          biography = {
            ru: getEditorValue('modalBiographyRu'),
            kz: getEditorValue('modalBiographyKz'),
          },
          info = {
            ru: getEditorValue('modalInfoRu'),
            kz: getEditorValue('modalInfoKz'),
          },
          photo = cForm.elements['photo'].value,
          createdAt = Date.parse(this.state.modalDate);

    Meteor.call('leadership.edit', id, {
      info, biography, name, position, photo, createdAt
    }, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Новость успешно изменена', 'success', 'growl-top-right' );
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

  getLeadershipJSX() {
    if(!this.props.leadership || !this.props.leadership.length)
      return [];

    return this.props.leadership.map((leadershipItem) => {
      const date = moment(leadershipItem.createdAt).format('L');
      return (
        <tr key={leadershipItem._id}>
          <td><input className='leadership-checkbox' data-id={leadershipItem._id} type="checkbox" /></td>
          <td>{leadershipItem.name.ru}</td>
          <td>{leadershipItem.name.kz}</td>
          <td>{date}</td>
        </tr>
      );
    });
  }

  /* END GENERATED JSX*/

  render() {
    const {regions, projects, leadership} = this.props;

    return (
      <div>
        <ModeratorLeadershipHelmet />
        <ModeratorLeadership
          addLeadershipButtonHandler={this.addLeadershipButtonHandler.bind(this)}
          leadershipJSX={this.getLeadershipJSX()}
          editLeadershipButtonHandler={this.editLeadershipButtonHandler.bind(this)}
          saveChangesButtonHandler={this.saveChangesButtonHandler.bind(this)}
          removeLeadershipButtonHandler={this.removeLeadershipButtonHandler.bind(this)}
          dateValue={this.state.date}
          dateChangeHandler={this.dateChangeHandler.bind(this)}
          modalDateValue={this.state.modalDate}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    leadership: LeadershipCollection.find({}, {sort: {createdAt: -1}}).fetch(),
  };
}, ModeratorLeadershipContainer)
