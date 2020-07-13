import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';

import Structure from '../components/Structure.jsx';
import Header from '../components/stateless/Header.jsx';
import Footer from '../components/stateless/Footer.jsx';
import SliderBlock from '../components/stateless/SliderBlock.jsx';
import EnterPartyButtonStateless from '../components/stateless/EnterPartyButtonStateless.jsx';
import PublicReceptionStateless from '../components/stateless/PublicReceptionStateless.jsx';
import StructureTabCentralOffice from '../components/stateless/StructureTabCentralOffice.jsx';
import StructureTabBodies from '../components/stateless/StructureTabBodies.jsx';
import FileLinkStateless from '../components/stateless/FileLinkStateless.jsx';

import {notReady, addScript, prepareCarousels, cookie} from '../lib/coreLib.js';

import StructureHelmet from '../helmets/StructureHelmet.jsx';

import {mpStrings} from '../lib/main-page-localization.js';
import {CentralOfficeCollection} from '../../api/CentralOffice.js';
import {BodiesCollection} from '../../api/Bodies.js';

class StructureContainer extends Component {
  componentWillMount() {
    Meteor.subscribe('CentralOffice');
    Meteor.subscribe('Bodies');
  }

  constructor(props) {
    super(props);

    let lang = cookie.get('lang');

    if(lang === '')
    {
      cookie.set('lang', 'kz', 9999);
      lang = 'kz';
    }

    const {tab} = this.props.location.query;

    this.state = {
      lang: lang,
      isOpen: false,
      items: [],
      activeTab: tab && tab < 3 ? parseInt(tab) : 0,
    }
  }

  setLang(lang) {
    this.setState({lang});
    cookie.set('lang', lang, 9999);
  }

  setActiveTab(e) {
    e.preventDefault();
    const newTab = e.currentTarget.getAttribute('data-tab');

    if(parseInt(newTab) === this.state.activeTab)
      return ;

    browserHistory.push(this.props.location.pathname + "?tab=" + newTab);
    window.location.reload();
  }

  componentWillReceiveProps(newProps) {
    const {tab} = newProps.location.query;
    this.setState({activeTab: parseInt(tab)});
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
    if(notReady(this.props.bodies) || notReady(this.props.centralOffice))
      return <div className="preload-image" />

    const {bodies, centralOffice} = this.props,
          headerWithAttrs = <Header
            lang={this.state.lang}
            setLang={this.setLang.bind(this)}
            mpStrings={mpStrings[this.state.lang]} />,
          footerWithAttrs = <Footer lang={this.state.lang} />,
          sliderBlock = <SliderBlock />,
          enterPartyButtonJSX = <EnterPartyButtonStateless lang={this.state.lang}/>,
          publicReceptionJSX = <PublicReceptionStateless mpStrings={mpStrings[this.state.lang]}/>,
          tabs = [
            <StructureTabBodies lang={this.state.lang} bodies={bodies[0]}/>,
            <StructureTabCentralOffice lang={this.state.lang} centralOffice={centralOffice[0]}/>
          ],
          bodiesFilesJSX = bodies[0].blobs[this.state.lang].map((blob, index) => {
            return <FileLinkStateless key={index} blob={blob} />;
          });

    return (
      <div>
        <StructureHelmet />
        <Structure
          header={headerWithAttrs}
          footer={footerWithAttrs}
          sliderBlock={sliderBlock}
          enterPartyButtonJSX={enterPartyButtonJSX}
          publicReceptionJSX={publicReceptionJSX}
          activeTabJSX={tabs[this.state.activeTab]}
          activeTabNumber={this.state.activeTab}
          setActiveTab={this.setActiveTab.bind(this)}
          bodiesFilesJSX={bodiesFilesJSX}
          mpStrings={mpStrings[this.state.lang]}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user(),
    bodies: BodiesCollection.find().fetch(),
    centralOffice: CentralOfficeCollection.find().fetch()
  }
}, StructureContainer);
