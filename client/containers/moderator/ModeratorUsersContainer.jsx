import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {qs, qsa, addScript, setEditorValue, getEditorValue} from '../../lib/coreLib.js'
import {prepareCheckboxes} from '../../lib/dictionary-main-page.js';

import ModeratorUsersHelmet from '../../helmets/ModeratorUsersHelmet.jsx';
import ModeratorUsers from '../../components/moderator/ModeratorUsers.jsx';

import {UsersCollection} from '../../../api/Users.js';

class ModeratorUsersContainer extends Component {
  constructor(props) {
    super(props);

    Meteor.subscribe('Users');
  }

  componentDidMount() {
    document.body.setAttribute('class', 'hold-transition skin-green-light layout-top-nav');
  }

  /* START EVENT HANDLERS */

  addUserButtonHandler(e) {
    e.preventDefault();

    const cForm = qs('#user-form'),
          login = cForm.elements['login'].value,
          password = cForm.elements['password'].value,
          password2 = cForm.elements['password-2'].value;

    if(password !== password2) {
      Bert.alert("Пароли не совпадают", 'danger', 'growl-top-right' );
      return ;
    }


    Meteor.call('users.add', {username: login, password}, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Пользователь успешно добавлен', 'success', 'growl-top-right' );
        window.location.reload();
      }
    });
  }

  editUserButtonHandler(e) {
    checkedCheckBoxes = qsa('.user-checkbox:checked');

    if(!checkedCheckBoxes.length)
    {
      Bert.alert( 'Вы ничего не выбрали!', 'danger', 'growl-top-right' );
      return;
    }

    if(checkedCheckBoxes.length > 1)
    {
      Bert.alert( 'Выберите не больше одного пользователя в списке!', 'danger', 'growl-top-right' );
      return;
    }

    $('#user-edit-modal').modal('show');
    const id = checkedCheckBoxes[0].getAttribute('data-id');

    const {users} = this.props;

    const currentUser = users.filter((userItem) => {
      return userItem._id === id;
    })[0],
          cForm = qs('#modal-user-form');

    cForm.elements['login'].value = currentUser.username;
    cForm.elements['password'].value = 'password';

    qs('#modal-save-button').setAttribute('data-id', currentUser._id);
  }

  removeUsersButtonHandler(e) {
    checkedCheckBoxes = qsa('input:checked');

    checkedCheckBoxes.forEach((checkbox) => {
      Meteor.call('users.remove', checkbox.getAttribute('data-id'), (err) => {
        if(err) {
          Bert.alert( err.reason, 'danger', 'growl-top-right' );
        }
        else {
          Bert.alert( "Пользователь успешно удален", 'success', 'growl-top-right' );
        }
      });
    });
  }

  saveChangesButtonHandler(e) {
    const id = qs('#modal-save-button').getAttribute('data-id'),
          cForm = qs('#modal-user-form'),
          login = cForm.elements['login'].value,
          password = cForm.elements['password'].value;

    Meteor.call('users.edit', id, {login, password}, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Пользователь успешно изменен', 'success', 'growl-top-right' );
        cForm.reset();
      }
    });
  }

  /* END EVENT HANDLERS */

  /* START GENERATED JSX*/

  getUsersJSX() {
    if(!this.props.users || !this.props.users.length)
      return [];

    return this.props.users.filter((user) => !user.profile.roles.includes('superadmin')).map((userItem) => {
      return (
        <tr key={userItem._id}>
          <td><input className='user-checkbox' data-id={userItem._id} type="checkbox" /></td>
          <td>{userItem.username}</td>
        </tr>
      );
    });
  }

  /* END GENERATED JSX*/

  render() {

    if(Meteor.user() && Meteor.user().profile.roles.includes('superadmin'))
      return (
        <div>
          <ModeratorUsersHelmet />
          <ModeratorUsers
            addUserButtonHandler={this.addUserButtonHandler.bind(this)}
            usersJSX={this.getUsersJSX()}
            editUserButtonHandler={this.editUserButtonHandler.bind(this)}
            saveChangesButtonHandler={this.saveChangesButtonHandler.bind(this)}
            removeUsersButtonHandler={this.removeUsersButtonHandler.bind(this)} />
        </div>
      );
    else
      return <div>Эта страница доступна только суперадмину</div>;
  }
}

export default createContainer(() => {
  return {
    users: UsersCollection.find({}, {sort: {createdAt: -1}}).fetch(),
  };
}, ModeratorUsersContainer)
