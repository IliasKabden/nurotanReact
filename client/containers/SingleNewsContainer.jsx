import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';

import SingleNews from '../components/SingleNews.jsx';

import SingleNewsHelmet from '../helmets/SingleNewsHelmet.jsx';

import Header from '../components/stateless/Header.jsx';
import Footer from '../components/stateless/Footer.jsx';
import SliderBlock from '../components/stateless/SliderBlock.jsx';
import VideosStateless from '../components/stateless/VideosStateless.jsx';
import PhotoLargeBlockStateless from '../components/stateless/PhotoLargeBlockStateless.jsx';
import PhotoMediumBlockStateless from '../components/stateless/PhotoMediumBlockStateless.jsx';
import NewsContentStateless from '../components/stateless/NewsContentStateless.jsx';
import ShareButtonsStateless from '../components/stateless/ShareButtonsStateless.jsx';
import FontSizeBlockStateless from '../components/stateless/FontSizeBlockStateless.jsx';
import EnterPartyButtonStateless from '../components/stateless/EnterPartyButtonStateless.jsx';
import PublicReceptionStateless from '../components/stateless/PublicReceptionStateless.jsx';
import RecommendationContentStateless from '../components/stateless/RecommendationContentStateless.jsx';

import {NewsCollection} from '../../api/News.js';
import {PhotosCollection} from '../../api/Photos.js';
import {VideosCollection} from '../../api/Videos.js';

import {mpStrings} from '../lib/main-page-localization.js';
import moment from '../lib/moment-with-locales.min.js';

import {addScript, prepareCarousels, qs, qsa, notReady, cookie} from '../lib/coreLib.js';

import {PhotoSwipe} from 'react-photoswipe';

class SingleNewsContainer extends Component {

  constructor(props) {
    super(props);

    let lang = undefined;

    if(this.props.location.query.lang) {
      lang = this.props.location.query.lang;
      cookie.set('lang', lang, 9999);
    }
    else if(cookie.get('lang')) {
      lang = cookie.get('lang');
    }

    if(lang === '')
    {
      cookie.set('lang', 'kz', 9999);
      lang = 'kz';
    }

    this.state = {
      lang: lang,
      isOpen: false,
      items: [],
    }
  }

  componentWillMount() {
    Meteor.subscribe('AllRuNews');
    Meteor.subscribe('AllKzNews');
    Meteor.subscribe('Photos');
    Meteor.subscribe('RuVideos');
    Meteor.subscribe('KzVideos');
  }

  setLang(lang) {
    cookie.set('lang', lang, 9999);
    window.location.reload();
    const {pathname} = this.props.location,
          {id} = this.props.location.query;

    window.location.href = `${pathname}?id=${id}&lang=${lang}`;
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

  photoSwipeCloseHandler(e) {
    this.setState({
      isOpen: false
    });
  }

  render() {
    let {news, videos, photos} = this.props;

    if(notReady(news) || notReady(videos) || notReady(photos))
      return <div className="preload-image"></div>;

    videos = videos.filter((video) => video.title[this.state.lang] !== "");
    photos = photos.filter((photo) => photo.title[this.state.lang] !== "");

    videosFiltered = videos.filter((video) => video.title[lang] !== "");

    let lang = this.state.lang;

    const {id} = this.props.location.query;

    const url = `http://nurotan.kz${this.props.location.pathname}/${this.props.location.search}`,
          headerWithAttrs = <Header
            lang={lang}
            setLang={this.setLang.bind(this)}
            mpStrings={mpStrings[lang]}
            pathname={this.props.location.pathname}/>,
          footerWithAttrs = <Footer lang={lang} />,
          sliderBlock = <SliderBlock />,
          videosJSX = <VideosStateless lang={lang} videos={videosFiltered} />,
          photoLargeBlockJSX = <PhotoLargeBlockStateless
            instagramButtonHandler={this.instagramButtonHandler.bind(this)}
            lang={lang}
            photo={photos[0]}/>,
          photoMediumBlockJSX = photos.slice(1).map((photo, index) => <PhotoMediumBlockStateless
            instagramButtonHandler={this.instagramButtonHandler.bind(this)}
            lang={lang}
            photo={photo}
            key={index} />),
          enterPartyButtonJSX = <EnterPartyButtonStateless lang={lang}/>,
          publicReceptionJSX = <PublicReceptionStateless mpStrings={mpStrings[lang]}/>,
          currentNews = news.filter((newsItem) => newsItem._id === id)[0],
          recommendations = news.filter((newsItem) => newsItem.title[lang] !== '' && newsItem.recommendation).slice(0, 4);

    const   shareButtonsJSX = <ShareButtonsStateless lang={lang}
              title={currentNews.title[lang]}
              url={url}
              image={currentNews.photo}/>,
          fontSizeBlockJSX = <FontSizeBlockStateless />;

    moment.locale(lang);
    const date = moment(currentNews.createdAt).format('LL'),
          {title, info, text, photo} = currentNews,
          newsContentJSX = <NewsContentStateless
            title={title[lang]}
            info={info[lang]}
            text={text[lang]}
            photo={Meteor.isServer ? '' : photo}
            date={date}
            shareButtonsJSX={shareButtonsJSX}
            />,
          recommendationsJSX = recommendations.map((recommendation) => {
            return <RecommendationContentStateless
              key={recommendation._id}
              news={recommendation}
              lang={lang}/>;
          }),
          photoswipe = <PhotoSwipe
            isOpen={this.state.isOpen}
            items={this.state.items}
            onClose={this.photoSwipeCloseHandler.bind(this)}
            options={{history: false, shareEl: false}}/>;

    return (
      <div>
        <SingleNewsHelmet
          title={title[lang]}
          description={title[lang]}
          image={photo}
          url={url}/>
        {photoswipe}
        <SingleNews
          header={headerWithAttrs}
          footer={footerWithAttrs}
          sliderBlock={sliderBlock}
          photoLargeBlockJSX={photoLargeBlockJSX}
          photoMediumBlockJSX={photoMediumBlockJSX}
          videosJSX={videosJSX}
          newsContentJSX={newsContentJSX}
          fontSizeBlockJSX={fontSizeBlockJSX}
          enterPartyButtonJSX={enterPartyButtonJSX}
          publicReceptionJSX={publicReceptionJSX}
          recommendationsJSX={recommendationsJSX}
          mpStrings={mpStrings[lang]}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    news: NewsCollection.find({}, {sort: {createdAt: -1}}).fetch(),
    videos: VideosCollection.find().fetch(),
    photos: PhotosCollection.find().fetch(),
  }
}, SingleNewsContainer);
