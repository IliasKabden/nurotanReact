import React, {Component} from 'react';

import Helmet from 'react-helmet';

export default class LeadershipHelmet extends Component {
  render() {
    return (
      <Helmet
        link={[
          {rel: 'stylesheet', href: '/custom/css/jquery.arcticmodal-0.3.css'},
          {rel: 'stylesheet', href: '/custom/css/themes/simple.css'},
        ]}
        script={[
          
          {type: 'text/javascript', src: '/custom/js/plugins.js'},
          {type: 'text/javascript', src: '/custom/js/slider/owl.carousel.min.js'},
          {type: 'text/javascript', src: '/custom/js/modal/jquery.arcticmodal-0.3.min.js'}
        ]} />
    );
  }
}
