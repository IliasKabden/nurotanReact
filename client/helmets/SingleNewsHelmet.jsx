import React, {Component} from 'react';

import Helmet from 'react-helmet';

export default class SingleNewsHelmet extends Component {
  render() {

    const {title, description, url, image} = this.props;
    const link = [
      {rel: 'stylesheet', href: 'https://rawgit.com/vn38minhtran/react-photoswipe/master/dist/photoswipe.css'},
      {rel: 'canonical', href: url},
      {rel: 'shortlink', href: url},
      {rel: 'stylesheet', href: '/custom/bower_components/responsive/build/responsive.min.css'},
    ],
          script = [
      
      {type: 'text/javascript', src: '/custom/js/plugins.js'},
      {type: 'text/javascript', src: '/custom/js/slider/owl.carousel.min.js'},
      {type: 'text/javascript', src: '/custom/bower_components/responsive/build/responsive.js'},
      {type: 'text/javascript', src: '/custom/js/jquery.dotdotdot.min.js'},
    ];

    return (
      <Helmet
        meta={[
            {name: "description", content: description},
            {name: "twitter:title", content: description},
            {name: "twitter:description", content: description},
            {name: "twitter:card", content: "summary_large_image"},
            {name: "twitter:site", content: "@Nur_Otan"},
            {name: "twitter:creator", content: "@Nur_Otan"},
            {name: "twitter:image", content: image},
            {name: "og:locale", content: "ru_RU"},
            {name: "og:locale:alternate", content: "kk_KZ"},
            {name: "og:type", content: "website"},
            {name: "og:title", content: description},
            {name: "og:url", content: url},
            {name: "og:image", content: image},
        ]}
        title={title + " | Нұр Отан"}
        link={link}
        script={script} />
    );
  }
}
