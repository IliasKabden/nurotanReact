import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';

import moment from '../lib/moment-with-locales.min.js';

import Regions from '../components/Regions.jsx';
import Header from '../components/stateless/Header.jsx';
import Footer from '../components/stateless/Footer.jsx';
import SliderBlock from '../components/stateless/SliderBlock.jsx';
import FontSizeBlockStateless from '../components/stateless/FontSizeBlockStateless.jsx';
import RegionsTabNews from '../components/stateless/RegionsTabNews.jsx';
import RegionsTabLeadership from '../components/stateless/RegionsTabLeadership.jsx';
import RegionsTabContacts from '../components/stateless/RegionsTabContacts.jsx';
import VisuallyImpairedBlock from '../components/stateless/VisuallyImpairedBlock.jsx';
import MapStateless from '../components/stateless/MapStateless.jsx';
import CalendarContainer from './CalendarContainer.jsx';

import {addScript, prepareCarousels, cookie, addStyle, notReady} from '../lib/coreLib.js';

import RegionsHelmet from '../helmets/RegionsHelmet.jsx';

import {mpStrings} from '../lib/main-page-localization.js';

import {RegionsCollection} from '../../api/Regions.js';
import {NewsCollection} from '../../api/News.js';

class RegionsContainer extends Component {
  componentWillMount() {
    Meteor.subscribe('Regions');
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
      items: [],
      activeTab: 0,
      id: '9',
      currentDate: undefined,
      newsNumber: 12,
    }

    Meteor.subscribe('AllRegionRuNews', this.state.newsNumber, this.state.id);
    Meteor.subscribe('AllRegionKzNews', this.state.newsNumber, this.state.id);
  }

  newsLoadMoreHandler(e) {
    e.preventDefault();

    let newsNumber = this.state.newsNumber;
    newsNumber = newsNumber + 12;

    Meteor.subscribe('AllRegionRuNews', newsNumber, this.state.id);
    Meteor.subscribe('AllRegionKzNews', newsNumber, this.state.id);
    this.setState({newsNumber});
  }

  setLang(lang) {
    cookie.set('lang', lang, 9999);
    window.location.reload();
  }

  setActiveTab(e) {
    e.preventDefault();
    const tab = parseInt(e.target.getAttribute('data-tab'));

    if(tab === this.state.activeTab) {
      this.setState({
        currentDate: undefined
      });
      return ;
    }


    this.setState({
      activeTab: tab,
      currentDate: undefined
    });
  }

  resetDate() {
    this.setState({
      currentDate: undefined
    });
  }

  dateSelectHandler(date) {
    this.setState({
      currentDate: date
    });
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

  changeId(id) {
    try {
      this.setState({id});
      Meteor.subscribe('AllRegionRuNews', this.state.newsNumber, id);
      Meteor.subscribe('AllRegionKzNews', this.state.newsNumber, id);
      this.setState({
        currentDate: undefined
      });
    }
    catch(err) {
      this.setState({id});
      Meteor.subscribe('AllRegionRuNews', this.state.newsNumber, id);
      Meteor.subscribe('AllRegionKzNews', this.state.newsNumber, id);
      this.setState({
        currentDate: undefined
      });
    }
  }

  visuallyImpairedButtonHandler(e) {
    e.preventDefault();
    $('#infobardm').css('display', '');
    addStyle({href: '/custom/css/ucoz/allstyles.css'});
  }

  render() {
    const {regions, news} = this.props;

    if(notReady(regions) || notReady(news))
      return <div className="preload-image"></div>;

    let newsFiltered = news.filter((newsItem) => newsItem.title[this.state.lang] !== "" && newsItem.region === this.state.id);

    if(this.state.currentDate) {
      newsFiltered = newsFiltered.filter((newsItem) => {
        return moment(newsItem.createdAt).isSame(this.state.currentDate, 'day');
      });
    }

    const currentRegion = regions.filter((region) => region._id === this.state.id)[0],
          headerWithAttrs = <Header
            lang={this.state.lang}
            setLang={this.setLang.bind(this)}
            mpStrings={mpStrings[this.state.lang]}
            visuallyImpairedButtonHandler={this.visuallyImpairedButtonHandler.bind(this)}/>,
          footerWithAttrs = <Footer lang={this.state.lang} />,
          sliderBlock = <SliderBlock />,
          fontSizeBlockJSX = <FontSizeBlockStateless />,
          tabs = [
            <RegionsTabNews
              news={newsFiltered}
              mpStrings={mpStrings[this.state.lang]}
              lang={this.state.lang}
              newsLoadMoreHandler={this.newsLoadMoreHandler.bind(this)}/>,
            <RegionsTabLeadership
              currentRegion={currentRegion}
              lang={this.state.lang}
              mpStrings={mpStrings[this.state.lang]}/>,
            <RegionsTabContacts
              currentRegion={currentRegion}
              lang={this.state.lang}
              mpStrings={mpStrings[this.state.lang]}/>],
          visuallyImpairedJSX = <VisuallyImpairedBlock />,
          map = <MapStateless lang={this.state.lang} regions={regions} changeId={this.changeId.bind(this)}/>,
          calendarJSX = <CalendarContainer
            lang={this.state.lang}
            onDateSelect={this.dateSelectHandler.bind(this)}/>;

    return (
      <div>
        <RegionsHelmet />
        <Regions
          header={headerWithAttrs}
          footer={footerWithAttrs}
          sliderBlock={sliderBlock}
          fontSizeBlockJSX={fontSizeBlockJSX}
          activeTabJSX={tabs[this.state.activeTab]}
          setActiveTab={this.setActiveTab.bind(this)}
          activeTabNumber={this.state.activeTab}
          visuallyImpairedJSX={visuallyImpairedJSX}
          map={map}
          mpStrings={mpStrings[this.state.lang]}
          calendarJSX={calendarJSX}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user(),
    regions: RegionsCollection.find().fetch(),
    news: NewsCollection.find({}, {sort: {createdAt: -1}}).fetch()
  }
}, RegionsContainer);
