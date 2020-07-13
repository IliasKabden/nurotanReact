import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {createContainer} from 'meteor/react-meteor-data';
import MainPage from '../components/MainPage.jsx';

import {addScript, prepareCarousels, qs, qsa, cookie, addStyle, notReady} from '../lib/coreLib.js';

import SocialFeedContainer from '../containers/SocialFeedContainer.jsx';

import MainPageHelmet from '../helmets/MainPageHelmet.jsx';
import Header from '../components/stateless/Header.jsx';
import Footer from '../components/stateless/Footer.jsx';
import SliderBlock from '../components/stateless/SliderBlock.jsx';
import VideosStateless from '../components/stateless/VideosStateless.jsx';
import PhotoLargeBlockStateless from '../components/stateless/PhotoLargeBlockStateless.jsx';
import PhotoMediumBlockStateless from '../components/stateless/PhotoMediumBlockStateless.jsx';
import NewsMediumBlockStateless from '../components/stateless/NewsMediumBlockStateless.jsx';
import NewsLargeBlockStateless from '../components/stateless/NewsLargeBlockStateless.jsx';
import ArticlesStateless from '../components/stateless/ArticlesStateless.jsx';
import SliderCenterStateless from '../components/stateless/SliderCenterStateless.jsx';
import ScrollUpButtonStateless from '../components/stateless/ScrollUpButtonStateless.jsx';
import EnterPartyButtonStateless from '../components/stateless/EnterPartyButtonStateless.jsx';
import PublicReceptionStateless from '../components/stateless/PublicReceptionStateless.jsx';
import FontSizeBlockStateless from '../components/stateless/FontSizeBlockStateless.jsx';
import VisuallyImpairedBlock from '../components/stateless/VisuallyImpairedBlock.jsx';

import {NewsCollection} from '../../api/News.js';
import {MainNewsCollection} from '../../api/News.js';
import {ArticlesCollection} from '../../api/Articles.js';
import {PhotosCollection} from '../../api/Photos.js';
import {VideosCollection} from '../../api/Videos.js';
import {ProjectsCollection} from '../../api/Projects.js';

import {PhotoSwipe} from 'react-photoswipe';

import {mpStrings} from '../lib/main-page-localization.js';

class MainPageContainer extends Component {
  constructor(props) {
    super(props);

    let lang = undefined,
        {pathname} = this.props.location;

    if(Meteor.isClient) {
      if(pathname === '/ru') {
        cookie.set('lang', 'ru', 9999);
        lang = 'ru';
      }
      else if(pathname === '/kz') {
        cookie.set('lang', 'kz', 9999);
        lang = 'kz';
      }
      else if(cookie.get('lang')) {
        lang = cookie.get('lang');
      }

      if(!lang)
      {
        cookie.set('lang', 'kz', 9999);
        lang = 'kz';
      }
    }

    this.state = {
      lang: lang,
      isOpen: false,
      items: [],
      sliderActiveTab: 0
    }
  }

  setLang(lang) {
    cookie.set('lang', lang, 9999);
    window.location.reload();
  }

  componentWillMount() {
    Meteor.subscribe('KzNews');
    Meteor.subscribe('RuNews');
    Meteor.subscribe('MainNews');
    Meteor.subscribe('KzArticles');
    Meteor.subscribe('RuArticles');
    Meteor.subscribe('Photos');
    Meteor.subscribe('KzVideos');
    Meteor.subscribe('RuVideos');
    Meteor.subscribe('Projects');
  }

  componentDidMount() {
    $.getScript('custom/bower_components/responsive/build/responsive.min.js', () => {
      addScript({
        src: 'custom/js/main.js'
      });
    });
  }

  componentDidUpdate() {
    ReactDOM.findDOMNode(this).scrollTop = 0
  }

  instagramButtonHandler(e) {
    e.preventDefault();

    const photoId = e.currentTarget.getAttribute('data-id'),
          currentPhoto = this.props.photos.filter((photo) => photo._id === photoId)[0],
          items = [],
          prefix = currentPhoto.photos,
          photosNum = parseInt(prefix.split('~')[1]),
          height = parseInt($(window).height() * 0.7),
          width = parseInt($(window).width() * 0.7);

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

        document.body.style.cursor = '';
        $('.category a').css('cursor', '');

        if(!photosLeft) {
          this.setState({
            isOpen: true,
            items,
          });

          $('.scrollup').fadeOut();
        }
      }
    }
  }

  photoSwipeCloseHandler(e) {
    const pswp = $('.pswp.pswp--supports-fs');

    pswp.attr('aria-hidden', 'true');
    pswp.attr('class', 'pswp');
    pswp.attr('tabindex', '-1');
    pswp.attr('role', 'dialog');

    this.setState({
      isOpen: false
    });
  }

  visuallyImpairedButtonHandler(e) {
    e.preventDefault();
    $('#infobardm').css('display', '');
    addStyle({href: '/custom/css/ucoz/allstyles.css'});
  }

  render() {
    let {news, articles, videos, photos, projects, mainNews} = this.props;

    if( notReady(news) || notReady(articles) || notReady(photos)
      || notReady(videos) || notReady(projects) || notReady(mainNews))
      return <div className="preload-image"></div>;

    let images = [];

    articles = articles.filter((article) => article.lang === this.state.lang);
    news = news.filter((newsItem) => newsItem.title[this.state.lang] !== "");
    mainNews = mainNews.filter((newsItem) => newsItem.title[this.state.lang] !== "");
    photos = photos.filter((photo) => photo.title[this.state.lang] !== "");
    videos = videos.filter((video) => video.title[this.state.lang] !== "");

    news.forEach((newsItem) => {
      images.push(newsItem.photo);
    })

    articles.forEach((article) => {
      images.push(article.photo);
    })

    const headerWithAttrs = <Header
            lang={this.state.lang}
            setLang={this.setLang.bind(this)}
            mpStrings={mpStrings[this.state.lang]}
            visuallyImpairedButtonHandler={this.visuallyImpairedButtonHandler.bind(this)}/>,
          footerWithAttrs = <Footer lang={this.state.lang} />,
          sliderBlock = <SliderBlock lang={this.state.lang}/>,
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
          newsMediumBlockJSX = news.slice(0, 12).map((newsItem, index) => <NewsMediumBlockStateless
            key={index}
            news={newsItem}
            lang={this.state.lang} />),
          newsLargeBlockJSX = <NewsLargeBlockStateless
            news={mainNews[0]}
            lang={this.state.lang} />
          articlesJSX = articles.slice(0, 4).filter((article) => article.lang === this.state.lang)
                                .map((article, index) => <ArticlesStateless
            lang={this.state.lang}
            key={index}
            article={article} />),
          sliderCenterJSX = <SliderCenterStateless context={this} sliderActiveTab={this.state.sliderActiveTab} projects={projects} mpStrings={mpStrings[this.state.lang]}/>,
          socialFeedJSX = <SocialFeedContainer />,
          scrollUpButtonJSX = <ScrollUpButtonStateless lang={this.state.lang}/>,
          enterPartyButtonJSX = <EnterPartyButtonStateless lang={this.state.lang}/>,
          publicReceptionJSX = <PublicReceptionStateless mpStrings={mpStrings[this.state.lang]}/>,
          fontSizeBlockJSX = <FontSizeBlockStateless />,
          visuallyImpairedJSX = <VisuallyImpairedBlock />,
          helmetTitle = {
            ru: "Нұр Отан официальный сайт Партии",
            kz: "Нұр Отан партиясы ресми сайты"
          };

    return (
      <div>
        <MainPageHelmet title={helmetTitle[this.state.lang]}/>
        <MainPage
          header={headerWithAttrs}
          footer={footerWithAttrs}
          sliderCenterJSX={sliderCenterJSX}
          sliderBlock={sliderBlock}
          lang={this.state.lang}
          socialFeedJSX={socialFeedJSX}
          mediumBlocksJSX={newsMediumBlockJSX}
          largeBlockJSX={newsLargeBlockJSX}
          articlesJSX={articlesJSX}
          photoLargeBlockJSX={photoLargeBlockJSX}
          photoMediumBlockJSX={photoMediumBlockJSX}
          videosJSX={videosJSX}
          mpStrings={mpStrings[this.state.lang]}
          scrollUpButtonJSX={scrollUpButtonJSX}
          enterPartyButtonJSX={enterPartyButtonJSX}
          publicReceptionJSX={publicReceptionJSX}
          fontSizeBlockJSX={fontSizeBlockJSX}
          visuallyImpairedJSX={visuallyImpairedJSX}
          />
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
    news: NewsCollection.find({}, {sort: {createdAt: -1}}).fetch(),
    mainNews: NewsCollection.find({mainNews: true}, {sort: {updatedAt: -1}}).fetch(),
    articles: ArticlesCollection.find({}, {sort: {createdAt: -1}}).fetch(),
    photos: PhotosCollection.find({}, {sort: {createdAt: -1}}).fetch(),
    videos: VideosCollection.find({}, {sort: {createdAt: -1}}).fetch(),
    projects: ProjectsCollection.find().fetch(),
  }
}, MainPageContainer);
