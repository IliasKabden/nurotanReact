import React, {Component} from 'react';

import Helmet from 'react-helmet';

export default class NewsPreviewHelmet extends Component {
  render() {
    return (
      <Helmet
        link={[
          {rel: 'stylesheet', href: '/custom/bower_components/responsive/build/responsive.min.css'},
          {rel: 'stylesheet', href: '/custom/css/custom-moderator-styles.css'},
        ]}
        script={[
          
          {type: 'text/javascript', src: '/custom/js/plugins.js'},
          {type: 'text/javascript', src: '/custom/bower_components/responsive/build/responsive.js'},
          {type: 'text/javascript', src: '/custom/js/jquery.dotdotdot.min.js'},
        ]} />
    );
  }
}
