import React, {Component} from 'react';

export default class Login extends Component {
  render() {
    return (
      <div className="login-box">
        <div className="login-logo">
          <a href="#"><b>Нұр Отан</b></a>
        </div>
        {/* /.login-logo */}
        <div className="login-box-body">
          <p className="login-box-msg">Авторизация</p>
          <form action="../../index2.html" method="post">
            <div className="form-group has-feedback">
              <input id="login" type="text" className="form-control" placeholder="логин" />
              <span className="glyphicon glyphicon-envelope form-control-feedback" />
            </div>
            <div className="form-group has-feedback">
              <input id="password" type="password" className="form-control" placeholder="Пароль" />
              <span className="glyphicon glyphicon-lock form-control-feedback" />
            </div>
            <div className="row">
              <div className="col-xs-8">
              </div>
              {/* /.col */}
              <div className="col-xs-4">
                <button onClick={this.props.loginButtonHandler} type="submit" className="btn btn-primary btn-block btn-flat">Войти</button>
              </div>
              {/* /.col */}
            </div>
          </form>
          {/* /.social-auth-links */}
        </div>
        {/* /.login-box-body */}
      </div>
    );
  }
}
