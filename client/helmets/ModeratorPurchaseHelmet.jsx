import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class ModeratorPurchaseHelmet extends Component {
  render() {
    return (
      <Helmet
        link={[
          {rel: 'stylesheet', href: '/adminlte/bootstrap/css/bootstrap.min.css'},
          {rel: 'stylesheet', href: '/adminlte/AdminLTE.min.css'},
          {rel: 'stylesheet', href: '/adminlte/skin-green-light.min.css'},
          {rel: 'stylesheet', href: '/adminlte/plugins/iCheck/flat/blue.css'},
          {rel: 'stylesheet', href: '/custom/css/custom-moderator-styles.css'},
          {rel: 'stylesheet', href: '/custom/plugins/datatables/datatables.min.css'}
        ]}
        script={[
          {type: 'text/javascript', src: '/adminlte/bootstrap/js/bootstrap.min.js'},
          {type: 'text/javascript', src: '/adminlte/plugins/slimScroll/jquery.slimscroll.min.js'},
          {type: 'text/javascript', src: '/adminlte/plugins/iCheck/icheck.min.js'},
          {type: 'text/javascript', src: '/custom/plugins/ckeditor/ckeditor.js'},
          {type: 'text/javascript', src: '/custom/plugins/datatables/datatables.min.js'}
        ]}
      />
    );
  }
}