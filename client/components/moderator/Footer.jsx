import React, {Component} from 'react';

export default class Footer extends Component {
  render() {
    let userInfo = (
      <div>
        Все права защищены. © 2017  Партия “Нұр Отан”.
      </div>
    );

    if(Meteor.user() !== undefined) {
      if(Meteor.user())
      {
        userInfo = (
          <div>
            Пользователь: <strong>{Meteor.user().username}</strong>
          </div>
        );
      }
    }

    return (
      <footer className="main-footer">
        <div className="container">
          <div className="pull-right hidden-xs">
            <b>Версия</b> 1.0
          </div>
          {userInfo}
        </div>
        {/* /.container */}
      </footer>
    );
  }
}
