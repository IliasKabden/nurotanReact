import React, {Component} from 'react';

import Helmet from 'react-helmet';

export default class RegionsHelmet extends Component {
  render() {
    return (
      <Helmet
        link={[
          {rel: 'stylesheet', href: '/custom/css/tooltipster.bundle.min.css'},
          {rel: 'stylesheet', href: '/custom/plugins/font-awesome/css/font-awesome.min.css'},
        ]}
        script={[
          
          {type: 'text/javascript', src: '/custom/js/plugins.js'},
          {type: 'text/javascript', src: '/custom/js/slider/owl.carousel.min.js'},
          {type: 'text/javascript', src: '/adminlte/bootstrap/js/bootstrap.min.js'}
        ]} />
    );
  }
}
