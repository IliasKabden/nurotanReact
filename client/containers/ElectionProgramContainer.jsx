import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';

import ElectionProgram from '../components/ElectionProgram.jsx';
import Header from '../components/stateless/Header.jsx';
import Footer from '../components/stateless/Footer.jsx';
import SliderBlock from '../components/stateless/SliderBlock.jsx';
import EnterPartyButtonStateless from '../components/stateless/EnterPartyButtonStateless.jsx';
import PublicReceptionStateless from '../components/stateless/PublicReceptionStateless.jsx';
import FileLinkStateless from '../components/stateless/FileLinkStateless.jsx';

import {addScript, prepareCarousels, cookie, notReady} from '../lib/coreLib.js';

import ElectionProgramHelmet from '../helmets/ElectionProgramHelmet.jsx';

import {mpStrings} from '../lib/main-page-localization.js';

import {ElectionProgramCollection} from '../../api/ElectionProgram.js';

class ElectionProgramContainer extends Component {
  componentWillMount() {
    Meteor.subscribe('ElectionProgram');
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
    if(notReady(this.props.electionProgram))
      return <div className="preload-image"></div>;

    const {electionProgram} = this.props,
          headerWithAttrs = <Header
            lang={this.state.lang}
            setLang={this.setLang.bind(this)}
            mpStrings={mpStrings[this.state.lang]} />,
          footerWithAttrs = <Footer lang={this.state.lang} />,
          sliderBlock = <SliderBlock />,
          enterPartyButtonJSX = <EnterPartyButtonStateless lang={this.state.lang}/>,
          publicReceptionJSX = <PublicReceptionStateless mpStrings={mpStrings[this.state.lang]}/>,
          currentElectionProgram = electionProgram[0],
          electionProgramFilesJSX = currentElectionProgram.blobs[this.state.lang].map((blob, index) => {
            return <FileLinkStateless key={index} blob={blob} />;
          });

    return (
      <div>
        <ElectionProgramHelmet />
        <ElectionProgram
          header={headerWithAttrs}
          footer={footerWithAttrs}
          sliderBlock={sliderBlock}
          enterPartyButtonJSX={enterPartyButtonJSX}
          publicReceptionJSX={publicReceptionJSX}
          electionProgram={currentElectionProgram[this.state.lang]}
          electionProgramFilesJSX={electionProgramFilesJSX}
          mpStrings={mpStrings[this.state.lang]}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user(),
    electionProgram: ElectionProgramCollection.find({_id:"1"}).fetch(),
  }
}, ElectionProgramContainer);
