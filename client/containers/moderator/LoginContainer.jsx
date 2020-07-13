import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';

import {addScript, qs, qsa} from '../../lib/coreLib.js';
import {browserHistory} from 'react-router';

import Login from '../../components/moderator/Login.jsx';
import LoginHelmet from '../../helmets/LoginHelmet.jsx';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.body.setAttribute('class', 'hold-transition login-page');
  }

  loginButtonHandler(e) {
    e.preventDefault();

    const login = qs('#login').value,
          password = qs('#password').value;

    Meteor.loginWithPassword(login, password, (err) => {
      if(err) {
        Bert.alert( 'Неправильный логин или пароль!', 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert( 'Добро пожаловать в Нуротан!', 'success', 'growl-top-right' );        
      }
    });
  }

  render() {
    return (
      <div>
        <LoginHelmet />
        <Login
          loginButtonHandler={this.loginButtonHandler.bind(this)}/>
      </div>
    );
  }
}

export default createContainer(() => {
  if(Meteor.user()){    
    if(Meteor.user().username === "frames"){
      window.location.href = '/moderator/financial-reports';
    } else{
      if(Meteor.user().username === "purchase"){
        window.location.href = '/moderator/staff-regions';
      }
     else{
      window.location.href = '/moderator/news';
     }  
    }
   
  }  
  return {    
  };
}, LoginContainer);
