import React, {Component} from 'react';

import Helmet from 'react-helmet';

export default class PhotosHelmet extends Component {
  render() {
    return (
      <Helmet
        link={[
          {rel: 'stylesheet', href: 'https://rawgit.com/vn38minhtran/react-photoswipe/master/dist/photoswipe.css'},
        ]}
        script={[
          
          {type: 'text/javascript', src: '/custom/js/plugins.js'},
          {type: 'text/javascript', src: '/custom/js/slider/owl.carousel.min.js'},
          {type: 'text/javascript', src: '/custom/bower_components/responsive/build/responsive.min.js'}
        ]} />
    );
  }
}