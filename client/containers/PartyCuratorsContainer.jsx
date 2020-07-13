import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';

import PartyCurators from '../components/PartyCurators.jsx';
import Header from '../components/stateless/Header.jsx';
import Footer from '../components/stateless/Footer.jsx';
import SliderBlock from '../components/stateless/SliderBlock.jsx';
import EnterPartyButtonStateless from '../components/stateless/EnterPartyButtonStateless.jsx';
import PublicReceptionStateless from '../components/stateless/PublicReceptionStateless.jsx';
import FileLinkStateless from '../components/stateless/FileLinkStateless.jsx';

import {notReady, addScript, prepareCarousels, cookie} from '../lib/coreLib.js';

import PartyCuratorsHelmet from '../helmets/PartyCuratorsHelmet.jsx';

import {mpStrings} from '../lib/main-page-localization.js';
import {PartyCuratorsCollection} from '../../api/PartyCurators.js';

class PartyCuratorsContainer extends Component {
  componentWillMount() {
    Meteor.subscribe('PartyCurators');
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
    if(notReady(this.props.partyCurators))
      return <div className="preload-image"></div>;

    const currentPartyCurators = this.props.partyCurators[0],
          headerWithAttrs = <Header
            lang={this.state.lang}
            setLang={this.setLang.bind(this)}
            mpStrings={mpStrings[this.state.lang]} />,
          footerWithAttrs = <Footer lang={this.state.lang} />,
          sliderBlock = <SliderBlock />,
          enterPartyButtonJSX = <EnterPartyButtonStateless lang={this.state.lang}/>,
          publicReceptionJSX = <PublicReceptionStateless mpStrings={mpStrings[this.state.lang]}/>,
          partyCuratorsFilesJSX = currentPartyCurators.blobs[this.state.lang].map((blob, index) => {
            return <FileLinkStateless key={index} blob={blob} />;
          });

    return (
      <div>
        <PartyCuratorsHelmet />
        <PartyCurators
          header={headerWithAttrs}
          footer={footerWithAttrs}
          sliderBlock={sliderBlock}
          lang={this.state.lang}
          mpStrings={mpStrings[this.state.lang]}
          enterPartyButtonJSX={enterPartyButtonJSX}
          publicReceptionJSX={publicReceptionJSX}
          currentPartyCurators={currentPartyCurators[this.state.lang]}
          partyCuratorsFilesJSX={partyCuratorsFilesJSX}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user(),
    partyCurators: PartyCuratorsCollection.find({_id: "1"}).fetch()
  }
}, PartyCuratorsContainer);
