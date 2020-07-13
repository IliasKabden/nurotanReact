import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class ModeratorProjectsHelmet extends Component {
  render() {
    return (
      <Helmet
        link={[
          {rel: 'stylesheet', href: '/adminlte/bootstrap/css/bootstrap.min.css'},
          {rel: 'stylesheet', href: '/adminlte/AdminLTE.min.css'},
          {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css'},
          {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css'},
          {rel: 'stylesheet', href: '/adminlte/skin-green-light.min.css'},
          {rel: 'stylesheet', href: '/adminlte/plugins/iCheck/flat/blue.css'}
        ]}
        script={[
          {type: 'text/javascript', src: '/adminlte/bootstrap/js/bootstrap.min.js'},
          {type: 'text/javascript', src: '/adminlte/plugins/slimScroll/jquery.slimscroll.min.js'},
          {type: 'text/javascript', src: '/adminlte/plugins/iCheck/icheck.min.js'},
          {type: 'text/javascript', src: '/custom/plugins/ckeditor/ckeditor.js'},
        ]}
      />
    );
  }
}
