import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';

import HotLine from '../components/HotLine.jsx';
import Header from '../components/stateless/Header.jsx';
import Footer from '../components/stateless/Footer.jsx';
import SliderBlock from '../components/stateless/SliderBlock.jsx';
import EnterPartyButtonStateless from '../components/stateless/EnterPartyButtonStateless.jsx';
import PublicReceptionStateless from '../components/stateless/PublicReceptionStateless.jsx';

import {notReady, addScript, prepareCarousels, cookie} from '../lib/coreLib.js';

import HotLineHelmet from '../helmets/HotLineHelmet.jsx';

import {mpStrings} from '../lib/main-page-localization.js';
import {HotLineCollection} from '../../api/HotLine.js';

class HotLineContainer extends Component {
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

  componentWillMount() {
    Meteor.subscribe('HotLine');
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
    if(notReady(this.props.hotLine))
      return <div className="preload-image"></div>;

    const {hotLine} = this.props,
          headerWithAttrs = <Header
            lang={this.state.lang}
            setLang={this.setLang.bind(this)}
            mpStrings={mpStrings[this.state.lang]} />,
          footerWithAttrs = <Footer lang={this.state.lang} />,
          sliderBlock = <SliderBlock />,
          enterPartyButtonJSX = <EnterPartyButtonStateless lang={this.state.lang}/>,
          publicReceptionJSX = <PublicReceptionStateless mpStrings={mpStrings[this.state.lang]}/>,
          currentHotLine = hotLine[0],
          hotLineFilesJSX = currentHotLine.blobs[this.state.lang].map((blob, index) => {
            return <FileLinkStateless key={index} blob={blob} />;
          });

    return (
      <div>
        <HotLineHelmet />
        <HotLine
          header={headerWithAttrs}
          footer={footerWithAttrs}
          sliderBlock={sliderBlock}
          lang={this.state.lang}
          mpStrings={mpStrings[this.state.lang]}
          enterPartyButtonJSX={enterPartyButtonJSX}
          publicReceptionJSX={publicReceptionJSX}
          currentHotLine={currentHotLine}
          hotLineFilesJSX={hotLineFilesJSX}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user(),
    hotLine: HotLineCollection.find().fetch()
  }
}, HotLineContainer);
