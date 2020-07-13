import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import {renderRoutes} from './routes.js';
import { ReactRouterSSR } from 'meteor/reactrouter:react-router-ssr';
import Helmet from 'react-helmet';

Meteor.startup(function() {
  if(Meteor.isClient) {
    function adaptiveText() {
       $(window).resize(function(){
           if ( parseInt($(window).width()) <= 1280) {
               $('#main-banner .adaptive-text').css('font-size', parseInt($(window).width() / 40) + "px");
               $('#main-banner .white').css('font-size', parseInt($(window).width() / 60) + "px");
           } else {
               $('#main-banner .adaptive-text').css('font-size', "1.3em");
               $('#main-banner .white').css('font-size', "0.8em");
               $('.small-menu').hide();
           }
       });
    }

    //adaptiveText();

    const root = document.createElement('div');
    root.setAttribute('id', 'root');
    document.body.appendChild(root);
  }

  ReactRouterSSR.Run(renderRoutes(), {
    props: {
      onUpdate() {

      },
    }
  }, {
    htmlHook(html) {
      const head = Helmet.rewind();
      return html.replace('<head>', '<head>' + head.title + head.base + head.meta + head.link + head.script);
    }
  });
});
