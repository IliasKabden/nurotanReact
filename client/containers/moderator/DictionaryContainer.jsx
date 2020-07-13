import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';
import {addScript} from '../../lib/coreLib.js';

import Dictionary from '../../components/moderator/Dictionary.jsx';
import DictionaryHelmet from '../../helmets/DictionaryHelmet.jsx';
import Footer from '../../components/moderator/Footer.jsx';

class DictionaryContainer extends Component {
  componentDidMount() {
    $.getScript('adminlte/plugins/iCheck/icheck.min.js', () => {
      addScript({ src: 'adminlte/app.min.js'});
    });

    document.body.setAttribute('class', 'hold-transition skin-green-light layout-top-nav');
  }

  logoutHandler(e) {
    e.preventDefault();

    Meteor.logout((err) => {
      if(err) {
        Bert.alert( err, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert( 'До свидания!', 'success', 'growl-top-right' );
      }
    });
  }

  render() {
    const footer = <Footer />;

    return (
      <div>
        <DictionaryHelmet />
        <Dictionary
          user={this.props.user}
          logoutHandler={this.logoutHandler.bind(this)}
          children={this.props.children}
          footer={footer}/>
      </div>
    );
  }
}

export default createContainer(() => {
  if(Meteor.user() === null)
  {
    browserHistory.push('/login');
  }

  return {
    user: Meteor.user()
  };
}, DictionaryContainer);
