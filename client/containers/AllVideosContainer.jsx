import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import AllVideos from '../components/AllVideos.jsx';

import Header from '../components/stateless/Header.jsx';
import Footer from '../components/stateless/Footer.jsx';
import SliderBlock from '../components/stateless/SliderBlock.jsx';
import VisuallyImpairedBlock from '../components/stateless/VisuallyImpairedBlock.jsx';
import FontSizeBlockStateless from '../components/stateless/FontSizeBlockStateless.jsx';
import CalendarContainer from './CalendarContainer.jsx';

import moment from '../lib/moment-with-locales.min.js';

import {mpStrings} from '../lib/main-page-localization.js';
import {addScript, prepareCarousels, qs, qsa, cookie, addStyle, notReady} from '../lib/coreLib.js';

import AllVideosHelmet from '../helmets/AllVideosHelmet.jsx';
import {VideosCollection} from '../../api/Videos.js';

class AllVideosContainer extends Component {
  componentWillMount() {
    Meteor.subscribe('AllRuVideos', this.state.videosNumber);
    Meteor.subscribe('AllKzVideos', this.state.videosNumber);
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
      videosNumber: 6
    }
  }

  videosLoadMoreHandler(e) {
    e.preventDefault();

    let videosNumber = this.state.videosNumber;
    videosNumber = videosNumber + 6;

    Meteor.subscribe('AllRuVideos', videosNumber);
    Meteor.subscribe('AllKzVideos', videosNumber);
    this.setState({videosNumber});
  }

  dateSelectHandler(date) {
    this.setState({
      currentDate: date
    })
  }

  visuallyImpairedButtonHandler(e) {
    e.preventDefault();
    $('#infobardm').css('display', '');
    addStyle({href: '/custom/css/ucoz/allstyles.css'});
  }

  setLang(lang) {
    this.setState({lang});
    cookie.set('lang', lang, 9999);
  }

  render() {
    if(notReady(this.props.videos))
      return <div className="preload-image"></div>;

    let videos = this.props.videos.filter((video) => video.title[this.state.lang] !== "").slice(0, this.state.videosNumber);

    if(this.state.currentDate) {
      videos = videos.filter((videosItem) => {
        return moment(videosItem.createdAt).isSame(this.state.currentDate, 'day');
      });
    }

    const headerWithAttrs = <Header
            lang={this.state.lang}
            setLang={this.setLang.bind(this)}
            mpStrings={mpStrings[this.state.lang]}
            visuallyImpairedButtonHandler={this.visuallyImpairedButtonHandler.bind(this)}/>,
          footerWithAttrs = <Footer lang={this.state.lang} />,
          sliderBlock = <SliderBlock lang={this.state.lang}/>,
          fontSizeBlockJSX = <FontSizeBlockStateless />,
          videosJSX = videos.map((video, index) => {
            const youtubeVideoId = video.url[this.state.lang].split('=')[1];
            moment.locale(this.state.lang);
            const date = moment(video.createdAt).format('LL');

            return (
              <div className="video item" key={index}>
                <iframe
                  src={"http://www.youtube.com/embed/"+youtubeVideoId+"?enablejsapi=1&origin=http://example.com"}
                  frameBorder="0">
                </iframe>
                 <span className="date">
                  <strong><i>&nbsp;&nbsp;&nbsp;&nbsp;{date}</i></strong>
                </span>
                <div className="clearfix"></div>
                <p style={{height: '3em'}}>{video.title[this.state.lang]}</p>
              </div>
            );
          }),
          calendarJSX = <CalendarContainer
            lang={this.state.lang}
            onDateSelect={this.dateSelectHandler.bind(this)}/>;

    return (
      <div>
        <AllVideosHelmet />
        <AllVideos
          header={headerWithAttrs}
          footer={footerWithAttrs}
          sliderBlock={sliderBlock}
          fontSizeBlockJSX={fontSizeBlockJSX}
          videosJSX={videosJSX}
          mpStrings={mpStrings[this.state.lang]}
          calendarJSX={calendarJSX}
          dateSelectHandler={this.dateSelectHandler.bind(this)}
          videosLoadMoreHandler={this.videosLoadMoreHandler.bind(this)}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user(),
    videos: VideosCollection.find({}, {sort: {createdAt: -1}}).fetch()
  }
}, AllVideosContainer);
