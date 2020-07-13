import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';

import Contacts from '../components/Contacts.jsx';
import Header from '../components/stateless/Header.jsx';
import Footer from '../components/stateless/Footer.jsx';
import SliderBlock from '../components/stateless/SliderBlock.jsx';
import EnterPartyButtonStateless from '../components/stateless/EnterPartyButtonStateless.jsx';
import PublicReceptionStateless from '../components/stateless/PublicReceptionStateless.jsx';
import ContactsTabBranchesStateless from '../components/stateless/ContactsTabBranchesStateless.jsx';
import ContactsTabCentralOfficeStateless from '../components/stateless/ContactsTabCentralOfficeStateless.jsx';

import {notReady, addScript, prepareCarousels, cookie} from '../lib/coreLib.js';

import ContactsHelmet from '../helmets/ContactsHelmet.jsx';

import {mpStrings} from '../lib/main-page-localization.js';
import {RegionsCollection} from '../../api/Regions.js';
import {ContactsCollection} from '../../api/Contacts.js';

class ContactsContainer extends Component {
  componentWillMount() {
    Meteor.subscribe('RegionContacts');
    Meteor.subscribe('Contacts');
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
      activeTab: tab && tab < 2 ? parseInt(tab) : 0
    }
  }

  setActiveTab(e) {
    e.preventDefault();
    const newTab = e.currentTarget.getAttribute('data-tab');
    this.setState({activeTab: parseInt(newTab)})
    browserHistory.push(this.props.location.pathname + "?tab=" + newTab);
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
    if(notReady(this.props.regions))
      return <div className="preload-image" />;

    const {regions, contacts} = this.props,
          headerWithAttrs = <Header
            lang={this.state.lang}
            setLang={this.setLang.bind(this)}
            mpStrings={mpStrings[this.state.lang]} />,
          footerWithAttrs = <Footer lang={this.state.lang} />,
          sliderBlock = <SliderBlock />,
          enterPartyButtonJSX = <EnterPartyButtonStateless lang={this.state.lang}/>,
          publicReceptionJSX = <PublicReceptionStateless mpStrings={mpStrings[this.state.lang]}/>,
          tabs = [
            <ContactsTabCentralOfficeStateless contacts={contacts[0]} lang={this.state.lang}/>,
            <ContactsTabBranchesStateless regions={regions} lang={this.state.lang}/>,
          ];

    return (
      <div>
        <ContactsHelmet />
        <Contacts
          header={headerWithAttrs}
          footer={footerWithAttrs}
          sliderBlock={sliderBlock}
          lang={this.state.lang}
          mpStrings={mpStrings[this.state.lang]}
          enterPartyButtonJSX={enterPartyButtonJSX}
          publicReceptionJSX={publicReceptionJSX}
          activeTabNumber={this.state.activeTab}
          activeTabJSX={tabs[this.state.activeTab]}
          setActiveTab={this.setActiveTab.bind(this)}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user(),
    regions: RegionsCollection.find().fetch(),
    contacts: ContactsCollection.find({_id: "1"}).fetch()
  }
}, ContactsContainer);
