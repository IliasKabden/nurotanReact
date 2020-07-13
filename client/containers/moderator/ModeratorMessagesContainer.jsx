import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {qs, qsa, addScript,setEditorValue, getEditorValue,} from '../../lib/coreLib.js'
import {prepareCheckboxes} from '../../lib/dictionary-main-page.js';

import ModeratorMessagesHelmet from '../../helmets/ModeratorMessagesHelmet.jsx';
import ModeratorMessages from '../../components/moderator/ModeratorMessages.jsx';

import {MessagesCollection} from '../../../api/Messages.js';

class ModeratorMessagesContainer extends Component {
  componentWillMount() {
    Meteor.subscribe('Messages');
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

    var photoUploadWidget = uploadcare.SingleWidget('[role=uploadcare-uploader]');
  }

  /* START EVENT HANDLERS */

  addMessageButtonHandler(e) {
    e.preventDefault();

    const cForm = qs('#leader-message-form'),
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

    Meteor.call('messages.add', {title, text, photo, createdAt}, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Послание успешно добавлено', 'success', 'growl-top-right' );
        window.location.reload();
      }
    });
  }

  editMessageButtonHandler(e) {
    checkedCheckBoxes = qsa('.message-checkbox:checked');

    if(!checkedCheckBoxes.length)
    {
      Bert.alert( 'Вы ничего не выбрали!', 'danger', 'growl-top-right' );
      return;
    }

    if(checkedCheckBoxes.length > 1)
    {
      Bert.alert( 'Выберите не больше одного проекта в списке!', 'danger', 'growl-top-right' );
      return;
    }

    $('#message-edit-modal').modal('show');
    const id = checkedCheckBoxes[0].getAttribute('data-id');

    const {messages} = this.props;

    const currentMessage = messages.filter((messageItem) => {
      return messageItem._id === id;
    })[0],
          cForm = qs('#modal-leader-message');

    cForm.elements['name-ru'].value = currentMessage.title.ru;
    cForm.elements['name-kz'].value = currentMessage.title.kz;
    setEditorValue('modalEditorRu', currentMessage.text.ru);
    setEditorValue('modalEditorKz', currentMessage.text.kz);

    this.setState({modalDate: new Date(currentMessage.createdAt)});

    qs('#modal-save-button').setAttribute('data-id', currentMessage._id);
  }

  removeMessagesButtonHandler(e) {
    checkedCheckBoxes = qsa('input:checked');

    checkedCheckBoxes.forEach((checkbox) => {
      Meteor.call('messages.remove', checkbox.getAttribute('data-id'), (err) => {
        if(err) {
          Bert.alert( err.reason, 'danger', 'growl-top-right' );
        }
        else {
          Bert.alert( "Послание успешно удалено", 'success', 'growl-top-right' );
        }
      });
    });
  }

  saveChangesButtonHandler(e) {
    const id = qs('#modal-save-button').getAttribute('data-id'),
          cForm = qs('#modal-leader-message'),
          title = {
            ru: cForm.elements['name-ru'].value,
            kz: cForm.elements['name-kz'].value
          },
          text = {
            ru: getEditorValue('modalEditorRu'),
            kz: getEditorValue('modalEditorKz')
          },
          photo = cForm.elements['photo'].value,
          createdAt = Date.parse(this.state.modalDate);

    Meteor.call('messages.edit', id, {title, text, photo, createdAt}, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Послание успешно изменено', 'success', 'growl-top-right' );
        cForm.form.reset();
      }
    });
  }

  /* END EVENT HANDLERS */

  /* START GENERATED JSX*/

  getMessagesJSX() {
    if(!this.props.messages || !this.props.messages.length)
      return [];

    return this.props.messages.map((messageItem) => {
      return (
        <tr key={messageItem._id}>
          <td><input className='message-checkbox' data-id={messageItem._id} type="checkbox" /></td>
          <td>{messageItem.title.en}</td>
          <td>{messageItem.title.ru}</td>
          <td>{messageItem.title.kz}</td>
        </tr>
      );
    });
  }

  /* END GENERATED JSX*/

  render() {
    return (
      <div>
        <ModeratorMessagesHelmet />
        <ModeratorMessages
          addMessageButtonHandler={this.addMessageButtonHandler.bind(this)}
          messagesJSX={this.getMessagesJSX()}
          editMessageButtonHandler={this.editMessageButtonHandler.bind(this)}
          saveChangesButtonHandler={this.saveChangesButtonHandler.bind(this)}
          removeMessagesButtonHandler={this.removeMessagesButtonHandler.bind(this)}
          dateValue={this.state.date}
          dateChangeHandler={this.dateChangeHandler.bind(this)}
          modalDateValue={this.state.modalDate} />
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    messages: MessagesCollection.find({}, {sort: {createdAt: -1}}).fetch(),
  };
}, ModeratorMessagesContainer)
