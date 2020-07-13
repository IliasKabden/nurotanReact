import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';

import News from '../components/News.jsx';
import Header from '../components/stateless/Header.jsx';
import Footer from '../components/stateless/Footer.jsx';
import SliderBlock from '../components/stateless/SliderBlock.jsx';
import VideosStateless from '../components/stateless/VideosStateless.jsx';
import PhotoLargeBlockStateless from '../components/stateless/PhotoLargeBlockStateless.jsx';
import PhotoMediumBlockStateless from '../components/stateless/PhotoMediumBlockStateless.jsx';
import NewsTabNews from '../components/stateless/NewsTabNews.jsx';
import NewsTabPressRelease from '../components/stateless/NewsTabPressRelease.jsx';
import NewsTabArticles from '../components/stateless/NewsTabArticles.jsx';
import CalendarContainer from './CalendarContainer.jsx';

import {addScript, prepareCarousels, cookie, areSameDate} from '../lib/coreLib.js';

import {PhotosCollection} from '../../api/Photos.js';
import {VideosCollection} from '../../api/Videos.js';
import {NewsCollection} from '../../api/News.js';
import {ArticlesCollection} from '../../api/Articles.js';
import {PressReleasesCollection} from '../../api/PressReleases.js';

import NewsHelmet from '../helmets/NewsHelmet.jsx';

import {mpStrings} from '../lib/main-page-localization.js';

import moment from '../lib/moment-with-locales.min.js';

import {PhotoSwipe} from 'react-photoswipe';

class NewsContainer extends Component {
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
      activeTab: tab && tab < 2 ? parseInt(tab) : 0,
      currentDate: undefined,
      newsNumber: 12,
      articlesNumber: 12,
    }
  }

  setLang(lang) {
    cookie.set('lang', lang, 9999);
    this.setState = {
      lang
    }
    window.location.reload();
  }

  setActiveTab(e) {
    e.preventDefault();
    const newTab = e.currentTarget.getAttribute('data-tab');
    browserHistory.push('/news?tab=' + newTab);
    this.setState({activeTab: parseInt(newTab)});
    this.resetDate();
  }

  componentWillMount() {
    Meteor.subscribe('Photos');
    Meteor.subscribe('KzVideos');
    Meteor.subscribe('RuVideos');
    Meteor.subscribe('AllRuNews', this.state.newsNumber);
    Meteor.subscribe('AllKzNews', this.state.newsNumber);
    Meteor.subscribe('AllRuArticles', this.state.articlesNumber);
    Meteor.subscribe('AllKzArticles', this.state.articlesNumber);
    Meteor.subscribe('RuPressReleases');
    Meteor.subscribe('KzPressReleases');
  }

  componentWillReceiveProps(newProps) {
    const {tab} = newProps.location.query;
    this.setState({activeTab: parseInt(tab)});
  }

  componentDidMount() {
    addScript({
      src: 'custom/js/main.js'
    });

    $('.preload-image').removeClass('top');
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

    const nextDay = new Date(date.getFullYear(),  date.getMonth(), date.getDate() + 1),
          prevDay = new Date(date.getFullYear(),  date.getMonth(), date.getDate());

    Meteor.subscribe('AllRuNews', this.state.newsNumber, {nextDay, prevDay}, () => {
      this.setState({
        newsNumber: NewsCollection.find().count()
      });
    });
    Meteor.subscribe('AllKzNews', this.state.newsNumber, {nextDay, prevDay}, () => {
      this.setState({
        newsNumber: NewsCollection.find().count()
      });
    });
  }

  instagramButtonHandler(e) {
    e.preventDefault();

    const photoId = e.currentTarget.getAttribute('data-id'),
          currentPhoto = this.props.photos.filter((photo) => photo._id === photoId)[0],
          items = [],
          prefix = currentPhoto.photos,
          photosNum = parseInt(prefix.split('~')[1]),
          height = parseInt($(window).height()),
          width = parseInt($(window).width());

    let photosLeft = photosNum;

    document.body.style.cursor = 'wait';
    $('.category a, .topic a, .topic a img').css('cursor', 'wait');

    for(let i = 0; i < photosNum; i++) {
      const src = prefix + 'nth/' + i + '/-/preview/'+
                  width+'x'+height+'/',
            img = new Image();

      img.setAttribute('src', src);

      img.onload = () => {
        items.push({
          src,
          w: img.width,
          h: img.height,
          title: currentPhoto.title[this.state.lang]
        });
        photosLeft --;

        if(!photosLeft) {
          document.body.style.cursor = '';
          $('.category a').css('cursor', '');
          this.setState({
            isOpen: true,
            items,
          });

          $('.scrollup').fadeOut();
        }
      }
    }
  }

  newsLoadMoreHandler(e) {
    e.preventDefault();

    let newsNumber = this.state.newsNumber;
    newsNumber = newsNumber + 12;

    Meteor.subscribe('AllRuNews', newsNumber);
    Meteor.subscribe('AllKzNews', newsNumber);
    this.setState({newsNumber});
  }

  articlesLoadMoreHandler(e) {
    e.preventDefault();

    let articlesNumber = this.state.articlesNumber;
    articlesNumber = articlesNumber + 12;

    Meteor.subscribe('AllRuArticles', articlesNumber);
    Meteor.subscribe('AllKzArticles', articlesNumber);
    this.setState({articlesNumber});
  }

  pressReleasesLoadMoreHandler(e) {
    e.preventDefault();
  }

  photoSwipeCloseHandler(e) {
    this.setState({
      isOpen: false
    });
  }

  render() {
    let {videos, photos, news, articles, pressReleases} = this.props;

    if(!videos || !videos.length || !photos || !photos.length
        || !news || !news.length || !articles || !articles.length
      || !pressReleases || !pressReleases.length)
      return <div className="preload-image"></div>;

    news = news.filter((newsItem) => newsItem.title[this.state.lang] !== "").slice(0, this.state.newsNumber);
    photos = photos.filter((photo) => photo.title[this.state.lang] !== "");
    videos = videos.filter((video) => video.title[this.state.lang] !== "");
    articles = articles.filter((article) => article.lang === this.state.lang).slice(0, this.state.articlesNumber);
    pressReleases = pressReleases.filter((pressRelease) => pressRelease.title[this.state.lang] !== "");

    if(this.state.currentDate) {
      news = news.filter((newsItem) => {
        return areSameDate(newsItem.createdAt, this.state.currentDate);
      });

      articles = articles.filter((article) => {
        return areSameDate(article.createdAt, this.state.currentDate);
      });

      pressReleases = pressReleases.filter((pressRelease) => {
        return areSameDate(pressRelease.createdAt, this.state.currentDate);
      })
    }

    const headerWithAttrs = <Header
            lang={this.state.lang}
            setLang={this.setLang.bind(this)}
            mpStrings={mpStrings[this.state.lang]} />,
          footerWithAttrs = <Footer lang={this.state.lang} />,
          sliderBlock = <SliderBlock />,
          videosJSX = <VideosStateless videos={videos} lang={this.state.lang}/>,
          photoLargeBlockJSX = <PhotoLargeBlockStateless
            instagramButtonHandler={this.instagramButtonHandler.bind(this)}
            lang={this.state.lang}
            photo={photos[0]}/>,
          photoMediumBlockJSX = photos.slice(1).map((photo, index) => <PhotoMediumBlockStateless
            instagramButtonHandler={this.instagramButtonHandler.bind(this)}
            lang={this.state.lang}
            photo={photo}
            key={index} />),
          tabs = [
            <NewsTabNews
              loadMoreHandler={this.newsLoadMoreHandler.bind(this)}
              news={news}
              lang={this.state.lang}
              mpStrings={mpStrings[this.state.lang]}/>,
            <NewsTabArticles
              loadMoreHandler={this.articlesLoadMoreHandler.bind(this)}
              articles={articles}
              lang={this.state.lang}
              mpStrings={mpStrings[this.state.lang]}/>,
            <NewsTabPressRelease
              loadMoreHandler={this.pressReleasesLoadMoreHandler.bind(this)}
              mpStrings={mpStrings[this.state.lang]}
              pressReleases={pressReleases}
              lang={this.state.lang}
              mpStrings={mpStrings[this.state.lang]}/>],
          calendarJSX = <CalendarContainer
            lang={this.state.lang}
            onDateSelect={this.dateSelectHandler.bind(this)}/>;

    return (
      <div>
        <NewsHelmet />
        <News
          header={headerWithAttrs}
          footer={footerWithAttrs}
          lang={this.state.lang}
          photoLargeBlockJSX={photoLargeBlockJSX}
          photoMediumBlockJSX={photoMediumBlockJSX}
          videosJSX={videosJSX}
          activeTabJSX={tabs[this.state.activeTab]}
          setActiveTab={this.setActiveTab.bind(this)}
          activeTabNumber={this.state.activeTab}
          mpStrings={mpStrings[this.state.lang]}
          calendarJSX={calendarJSX}/>
        <PhotoSwipe
          isOpen={this.state.isOpen}
          items={this.state.items}
          onClose={this.photoSwipeCloseHandler.bind(this)}
          options={{history: false, shareEl: false}}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user(),
    photos: PhotosCollection.find().fetch(),
    videos: VideosCollection.find().fetch(),
    news: NewsCollection.find({}, {sort: {createdAt: -1}}).fetch(),
    articles: ArticlesCollection.find({}, {sort: {createdAt: -1}}).fetch(),
    pressReleases: PressReleasesCollection.find({}, {sort: {createdAt: -1}}).fetch()
  }
}, NewsContainer);
