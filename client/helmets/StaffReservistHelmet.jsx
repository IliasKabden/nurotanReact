import React, {Component} from 'react';

import Helmet from 'react-helmet';

export default class StaffReservistHelmet extends Component {
  render() {
    return (
      <Helmet
        script={[
          
          {type: 'text/javascript', src: '/custom/js/plugins.js'},
          {type: 'text/javascript', src: '/custom/js/slider/owl.carousel.min.js'}
        ]} />
    );
  }
}
