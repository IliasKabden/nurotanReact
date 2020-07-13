import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';

import SiteMap from '../components/SiteMap.jsx';
import Header from '../components/stateless/Header.jsx';
import Footer from '../components/stateless/Footer.jsx';
import SliderBlock from '../components/stateless/SliderBlock.jsx';
import EnterPartyButtonStateless from '../components/stateless/EnterPartyButtonStateless.jsx';
import PublicReceptionStateless from '../components/stateless/PublicReceptionStateless.jsx';

import {addScript, prepareCarousels, cookie} from '../lib/coreLib.js';

import SiteMapHelmet from '../helmets/SiteMapHelmet.jsx';

import {mpStrings} from '../lib/main-page-localization.js';

class SiteMapContainer extends Component {
  constructor(props) {
    super(props);

    let lang = cookie.get('lang');

    if(lang === '')
    {
      cookie.set('lang', 'kz', 9999);
      lang = 'kz';
    }

    this.state = {
      lang: lang,
      isOpen: false,
      items: []
    }
  }

  setLang(lang) {
    this.setState({lang});
    cookie.set('lang', lang, 9999);
  }

  componentDidMount() {
    addScript({
      src: 'custom/js/main.js'
    });

    $.getScript('custom/js/slider/owl.carousel.min.js', () => {
      prepareCarousels();
    });

    $('.preload-image').removeClass('top');
  }

  render() {
    const headerWithAttrs = <Header
            lang={this.state.lang}
            setLang={this.setLang.bind(this)}
            mpStrings={mpStrings[this.state.lang]} />,
          footerWithAttrs = <Footer lang={this.state.lang} />,
          sliderBlock = <SliderBlock />,
          enterPartyButtonJSX = <EnterPartyButtonStateless lang={this.state.lang}/>,
          publicReceptionJSX = <PublicReceptionStateless mpStrings={mpStrings[this.state.lang]}/>;

    return (
      <div>
        <SiteMapHelmet />
        <SiteMap
          header={headerWithAttrs}
          footer={footerWithAttrs}
          sliderBlock={sliderBlock}
          enterPartyButtonJSX={enterPartyButtonJSX}
          publicReceptionJSX={publicReceptionJSX}
          mpStrings={mpStrings[this.state.lang]}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user()
  }
}, SiteMapContainer);
