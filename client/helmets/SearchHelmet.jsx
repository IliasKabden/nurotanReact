import React, {Component} from 'react';

import Helmet from 'react-helmet';

export default class SearchContainerHelmet extends Component {
  render() {
    return (
      <Helmet
        link={[
        ]}
        script={[
          
          {type: 'text/javascript', src: '/custom/js/plugins.js'},
        ]} />
    );
  }
}
