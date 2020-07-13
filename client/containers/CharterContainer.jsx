import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';

import Charter from '../components/Charter.jsx';

import {addScript, prepareCarousels, cookie, notReady} from '../lib/coreLib.js';

import CharterHelmet from '../helmets/CharterHelmet.jsx';
import Header from '../components/stateless/Header.jsx';
import Footer from '../components/stateless/Footer.jsx';
import SliderBlock from '../components/stateless/SliderBlock.jsx';
import EnterPartyButtonStateless from '../components/stateless/EnterPartyButtonStateless.jsx';
import PublicReceptionStateless from '../components/stateless/PublicReceptionStateless.jsx';
import ShareButtonsStateless from '../components/stateless/ShareButtonsStateless.jsx';
import FileLinkStateless from '../components/stateless/FileLinkStateless.jsx';

import {mpStrings} from '../lib/main-page-localization.js';
import {CharterCollection} from '../../api/Charter.js';

class CharterContainer extends Component {
  componentWillMount() {
    Meteor.subscribe('Charter');
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
      lang: lang
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
    if(notReady(this.props.charter))
      return <div className="preload-image"></div>;

    const {charter} = this.props,
          headerWithAttrs = <Header
            lang={this.state.lang}
            setLang={this.setLang.bind(this)}
            mpStrings={mpStrings[this.state.lang]} />,
          footerWithAttrs = <Footer lang={this.state.lang} />,
          sliderBlock = <SliderBlock />,
          enterPartyButtonJSX = <EnterPartyButtonStateless lang={this.state.lang}/>,
          publicReceptionJSX = <PublicReceptionStateless mpStrings={mpStrings[this.state.lang]}/>,
          shareButtonsJSX = <ShareButtonsStateless lang={this.state.lang}
            url={window.location.href}
            title='Устав партии Нур Отан'
            image=''/>,
          currentCharter = charter[0],
          charterFilesJSX = currentCharter.blobs[this.state.lang].map((blob, index) => {
            return <FileLinkStateless key={index} blob={blob} />;
          });

    return (
      <div>
        <CharterHelmet />
        <Charter
          header={headerWithAttrs}
          footer={footerWithAttrs}
          sliderBlock={sliderBlock}
          enterPartyButtonJSX={enterPartyButtonJSX}
          publicReceptionJSX={publicReceptionJSX}
          shareButtonsJSX={shareButtonsJSX}
          charter={currentCharter[this.state.lang]}
          charterFilesJSX={charterFilesJSX}
          mpStrings={mpStrings[this.state.lang]}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user(),
    charter: CharterCollection.find({_id:"1"}).fetch(),
  }
}, CharterContainer);