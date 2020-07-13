import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';

import Fraction from '../components/Fraction.jsx';
import Header from '../components/stateless/Header.jsx';
import Footer from '../components/stateless/Footer.jsx';
import SliderBlock from '../components/stateless/SliderBlock.jsx';
import EnterPartyButtonStateless from '../components/stateless/EnterPartyButtonStateless.jsx';
import PublicReceptionStateless from '../components/stateless/PublicReceptionStateless.jsx';
import FileLinkStateless from '../components/stateless/FileLinkStateless.jsx';

import {addScript, prepareCarousels, cookie, notReady} from '../lib/coreLib.js';

import FractionHelmet from '../helmets/FractionHelmet.jsx';

import {mpStrings} from '../lib/main-page-localization.js';

import {FractionCollection} from '../../api/Fraction.js';

class FractionContainer extends Component {
  componentWillMount() {
    Meteor.subscribe('Fraction');
  }
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
    if(notReady(this.props.fraction))
      return <div className="preload-image"></div>;

    const {fraction} = this.props,
          headerWithAttrs = <Header
            lang={this.state.lang}
            setLang={this.setLang.bind(this)}
            mpStrings={mpStrings[this.state.lang]} />,
          footerWithAttrs = <Footer lang={this.state.lang} />,
          sliderBlock = <SliderBlock />,
          enterPartyButtonJSX = <EnterPartyButtonStateless lang={this.state.lang}/>,
          publicReceptionJSX = <PublicReceptionStateless mpStrings={mpStrings[this.state.lang]}/>,
          currentFraction = fraction[0],
          fractionFilesJSX = currentFraction.blobs[this.state.lang].map((blob, index) => {
            return <FileLinkStateless key={index} blob={blob} />;
          });

    return (
      <div>
        <FractionHelmet />
        <Fraction
          header={headerWithAttrs}
          footer={footerWithAttrs}
          sliderBlock={sliderBlock}
          lang={this.state.lang}
          mpStrings={mpStrings[this.state.lang]}
          enterPartyButtonJSX={enterPartyButtonJSX}
          publicReceptionJSX={publicReceptionJSX}
          currentFraction={currentFraction[this.state.lang]}
          mpStrings={mpStrings[this.state.lang]}
          fractionFilesJSX={fractionFilesJSX}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user(),
    fraction: FractionCollection.find({_id:"1"}).fetch()
  }
}, FractionContainer);
