import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {qs, qsa, addScript, setEditorValue, getEditorValue, notReady} from '../../lib/coreLib.js'
import {prepareCheckboxes} from '../../lib/dictionary-main-page.js';

import ModeratorSpeechesHelmet from '../../helmets/ModeratorSpeechesHelmet.jsx';
import ModeratorSpeeches from '../../components/moderator/ModeratorSpeeches.jsx';

import {SpeechesCollection} from '../../../api/Speeches.js';

class ModeratorSpeechesContainer extends Component {
  componentWillMount() {
    this.setState({
      speechesSubscription: Meteor.subscribe('AllSpeeches')
    });
  }

  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      modalDate: new Date(),
      speechesSubscription: undefined
    };
  }

  dateChangeHandler(e) {
    const stateName = e.currentTarget.getAttribute('data-state-name'),
          stateValue = e.currentTarget.value;

    this.setState({
      [stateName]: stateValue
    });
  }

  componentDidMount() {
    document.body.setAttribute('class', 'hold-transition skin-green-light layout-top-nav');
  }

  /* START EVENT HANDLERS */

  addSpeechButtonHandler(e) {
    e.preventDefault();

    const cForm = qs('#leader-speech-form'),
          title = {
            ru: cForm.elements['name-ru'].value,
            kz: cForm.elements['name-kz'].value
          },
          text = {
            ru: getEditorValue('textEditorRu'),
            kz: getEditorValue('textEditorKz'),
          },
          photo = cForm.elements['photo'].value,
          createdAt = Date.parse(this.state.date);

    Meteor.call('speeches.add', {title, text, photo, createdAt}, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Проект успешно добавлен', 'success', 'growl-top-right' );
        window.location.reload();
      }
    });
  }

  editSpeechButtonHandler(e) {
    checkedCheckBoxes = qsa('.speech-checkbox:checked');

    if(!checkedCheckBoxes.length)
    {
      Bert.alert( 'Вы ничего не выбрали!', 'danger', 'growl-top-right' );
      return;
    }

    if(checkedCheckBoxes.length > 1)
    {
      Bert.alert( 'Выберите не больше одного выступления в списке!', 'danger', 'growl-top-right' );
      return;
    }

    $('#speech-edit-modal').modal('show');
    const id = checkedCheckBoxes[0].getAttribute('data-id');

    const {speeches} = this.props;

    const currentSpeech = speeches.filter((speechItem) => {
      return speechItem._id === id;
    })[0],
          cForm = qs('#modal-leader-speech');

    cForm.elements['name-ru'].value = currentSpeech.title.ru;
    cForm.elements['name-kz'].value = currentSpeech.title.kz;
    setEditorValue('modalEditorRu', currentSpeech.text.ru);
    setEditorValue('modalEditorKz', currentSpeech.text.kz);

    this.setState({modalDate: new Date(currentSpeech.createdAt)});

    qs('#modal-save-button').setAttribute('data-id', currentSpeech._id);
  }

  removeSpeechesButtonHandler(e) {
    checkedCheckBoxes = qsa('input:checked');

    checkedCheckBoxes.forEach((checkbox) => {
      Meteor.call('speeches.remove', checkbox.getAttribute('data-id'), (err) => {
        if(err) {
          Bert.alert( err.reason, 'danger', 'growl-top-right' );
        }
        else {
          Bert.alert( "Выступление успешно удалено", 'success', 'growl-top-right' );
        }
      });
    });
  }

  saveChangesButtonHandler(e) {
    const id = qs('#modal-save-button').getAttribute('data-id'),
          cForm = qs('#modal-leader-speech'),
          title = {
            ru: cForm.elements['name-ru'].value,
            kz: cForm.elements['name-kz'].value
          },
          text = {
            ru: getEditorValue('modalEditorRu'),
            kz: getEditorValue('modalEditorKz'),
          },
          photo = cForm.elements['photo'].value,
          createdAt = Date.parse(this.state.modalDate);

    Meteor.call('speeches.edit', id, {title, text, photo, createdAt}, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Выступление успешно изменено', 'success', 'growl-top-right' );
        cForm.form.reset();
      }
    });
  }

  /* END EVENT HANDLERS */

  /* START GENERATED JSX*/

  getSpeechesJSX() {
    if(!this.props.speeches || !this.props.speeches.length)
      return [];

    return this.props.speeches.map((speechItem) => {
      return (
        <tr key={speechItem._id}>
          <td><input className='speech-checkbox' data-id={speechItem._id} type="checkbox" /></td>
          <td>{speechItem.title ? speechItem.title.ru : ''}</td>
          <td>{speechItem.title ? speechItem.title.kz : ''}</td>
        </tr>
      );
    });
  }

  /* END GENERATED JSX*/

  render() {
    if(!this.state.speechesSubscription || !this.state.speechesSubscription.ready())
      return <div className="preload-image"></div>;

    return (
      <div>
        <ModeratorSpeechesHelmet />
        <ModeratorSpeeches
          addSpeechButtonHandler={this.addSpeechButtonHandler.bind(this)}
          speechesJSX={this.getSpeechesJSX()}
          editSpeechButtonHandler={this.editSpeechButtonHandler.bind(this)}
          saveChangesButtonHandler={this.saveChangesButtonHandler.bind(this)}
          removeSpeechesButtonHandler={this.removeSpeechesButtonHandler.bind(this)}
          dateValue={this.state.date}
          dateChangeHandler={this.dateChangeHandler.bind(this)}
          modalDateValue={this.state.modalDate} />
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    speeches: SpeechesCollection.find({}, {sort: {createdAt: -1}}).fetch(),
  };
}, ModeratorSpeechesContainer)
