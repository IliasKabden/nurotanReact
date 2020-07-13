import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';

import PartyHistory from '../components/PartyHistory.jsx';
import Header from '../components/stateless/Header.jsx';
import Footer from '../components/stateless/Footer.jsx';
import SliderBlock from '../components/stateless/SliderBlock.jsx';
import EnterPartyButtonStateless from '../components/stateless/EnterPartyButtonStateless.jsx';
import PublicReceptionStateless from '../components/stateless/PublicReceptionStateless.jsx';
import ShareButtonsStateless from '../components/stateless/ShareButtonsStateless.jsx';

import {addScript, prepareCarousels, cookie, notReady} from '../lib/coreLib.js';

import PartyHistoryHelmet from '../helmets/PartyHistoryHelmet.jsx';

import {mpStrings} from '../lib/main-page-localization.js';

import {PartyHistoryCollection} from '../../api/PartyHistory.js';

class PartyHistoryContainer extends Component {
  componentWillMount() {
    Meteor.subscribe('PartyHistory');
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
    if(notReady(this.props.partyHistory))
      return <div className="preload-image"></div>;

    const {partyHistory} = this.props,
          headerWithAttrs = <Header
            lang={this.state.lang}
            setLang={this.setLang.bind(this)}
            mpStrings={mpStrings[this.state.lang]} />,
          footerWithAttrs = <Footer lang={this.state.lang} />,
          sliderBlock = <SliderBlock />,
          enterPartyButtonJSX = <EnterPartyButtonStateless lang={this.state.lang}/>,
          publicReceptionJSX = <PublicReceptionStateless mpStrings={mpStrings[this.state.lang]}/>,
          shareButtonsJSX = <ShareButtonsStateless lang={this.state.lang}
            lang={this.state.lang}
            image='/custom/img/logo.png'
            title='ИСТОРИЯ ПАРТИИ «Нур Отан»'
            url={window.location.href} />,
          currentHistory = partyHistory[0];

    return (
      <div>
        <PartyHistoryHelmet />
        <PartyHistory
          header={headerWithAttrs}
          footer={footerWithAttrs}
          sliderBlock={sliderBlock}
          enterPartyButtonJSX={enterPartyButtonJSX}
          publicReceptionJSX={publicReceptionJSX}
          shareButtonsJSX={shareButtonsJSX}
          partyHistory={currentHistory[this.state.lang]}
          mpStrings={mpStrings[this.state.lang]}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user(),
    partyHistory: PartyHistoryCollection.find({_id:"1"}).fetch()
  }
}, PartyHistoryContainer);
