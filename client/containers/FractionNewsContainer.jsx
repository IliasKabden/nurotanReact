import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';

import FractionNews from '../components/FractionNews.jsx';
import Header from '../components/stateless/Header.jsx';
import Footer from '../components/stateless/Footer.jsx';
import SliderBlock from '../components/stateless/SliderBlock.jsx';
import CalendarContainer from './CalendarContainer.jsx';

import moment from '../lib/moment-with-locales.min.js';

import {addScript, prepareCarousels, cookie, notReady} from '../lib/coreLib.js';

import FractionNewsHelmet from '../helmets/FractionNewsHelmet.jsx';

import {mpStrings} from '../lib/main-page-localization.js';
import {NewsCollection} from '../../api/News.js';

class FractionNewsContainer extends Component {
  componentWillMount() {
    Meteor.subscribe('AllNews');
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
      currentDate: undefined,
    }
  }

  setLang(lang) {
    this.setState({lang});
    cookie.set('lang', lang, 9999);
  }

  dateSelectHandler(date) {
    this.setState({
      currentDate: date
    })
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
    let {news} = this.props;

    if(notReady(news)) {
      return <div className="preload-image" />;
    }

    news = news.filter((newsItem) => newsItem.aboutFraction);
    news = news.filter((newsItem) => newsItem.title[this.state.lang] !== "");

    if(this.state.currentDate) {
      news = news.filter((newsItem) => {
        return moment(newsItem.createdAt).isSame(this.state.currentDate, 'day');
      });
    }


    const headerWithAttrs = <Header
            lang={this.state.lang}
            setLang={this.setLang.bind(this)}
            mpStrings={mpStrings[this.state.lang]} />,
          footerWithAttrs = <Footer lang={this.state.lang} />,
          sliderBlock = <SliderBlock />,
          calendarJSX = <CalendarContainer
            lang={this.state.lang}
            onDateSelect={this.dateSelectHandler.bind(this)}/>;

    return (
      <div>
        <FractionNewsHelmet />
        <FractionNews
          header={headerWithAttrs}
          footer={footerWithAttrs}
          sliderBlock={sliderBlock}
          news={news}
          lang={this.state.lang}
          mpStrings={mpStrings[this.state.lang]}
          calendarJSX={calendarJSX}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user(),
    news: NewsCollection.find({}, {sort: {createdAt: -1}}).fetch()
  }
}, FractionNewsContainer);
