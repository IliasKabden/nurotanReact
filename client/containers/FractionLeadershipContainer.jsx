import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';

import FractionLeadership from '../components/FractionLeadership.jsx';
import Header from '../components/stateless/Header.jsx';
import Footer from '../components/stateless/Footer.jsx';
import SliderBlock from '../components/stateless/SliderBlock.jsx';
import EnterPartyButtonStateless from '../components/stateless/EnterPartyButtonStateless.jsx';
import PublicReceptionStateless from '../components/stateless/PublicReceptionStateless.jsx';
import FileLinkStateless from '../components/stateless/FileLinkStateless.jsx';

import {addScript, prepareCarousels, cookie, notReady} from '../lib/coreLib.js';

import FractionLeadershipHelmet from '../helmets/FractionLeadershipHelmet.jsx';

import {mpStrings} from '../lib/main-page-localization.js';

import {FractionLeadershipCollection} from '../../api/FractionLeadership.js';

class FractionLeadershipContainer extends Component {
  componentWillMount() {
    Meteor.subscribe('FractionLeadership');
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
    if(notReady(this.props.fractionLeadership))
      return <div className="preload-image"></div>;

    const headerWithAttrs = <Header
            lang={this.state.lang}
            setLang={this.setLang.bind(this)}
            mpStrings={mpStrings[this.state.lang]} />,
          footerWithAttrs = <Footer lang={this.state.lang} />,
          sliderBlock = <SliderBlock />,
          enterPartyButtonJSX = <EnterPartyButtonStateless lang={this.state.lang}/>,
          publicReceptionJSX = <PublicReceptionStateless mpStrings={mpStrings[this.state.lang]}/>,
          fractionLeadership = this.props.fractionLeadership[0],
          fractionLeadershipFilesJSX = fractionLeadership.blobs[this.state.lang].map((blob, index) => {
            return <FileLinkStateless key={index} blob={blob} />;
          });

    return (
      <div>
        <FractionLeadershipHelmet />
        <FractionLeadership
          header={headerWithAttrs}
          footer={footerWithAttrs}
          sliderBlock={sliderBlock}
          lang={this.state.lang}
          mpStrings={mpStrings[this.state.lang]}
          enterPartyButtonJSX={enterPartyButtonJSX}
          publicReceptionJSX={publicReceptionJSX}
          fractionLeadership={fractionLeadership[this.state.lang]}
          fractionLeadershipFilesJSX={fractionLeadershipFilesJSX}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user(),
    fractionLeadership: FractionLeadershipCollection.find({_id:"1"}).fetch()
  }
}, FractionLeadershipContainer);
