import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';

import SingleArticle from '../components/SingleArticle.jsx';

import SingleNewsHelmet from '../helmets/SingleNewsHelmet.jsx';

import Header from '../components/stateless/Header.jsx';
import Footer from '../components/stateless/Footer.jsx';
import SliderBlock from '../components/stateless/SliderBlock.jsx';
import VideosStateless from '../components/stateless/VideosStateless.jsx';
import PhotoLargeBlockStateless from '../components/stateless/PhotoLargeBlockStateless.jsx';
import PhotoMediumBlockStateless from '../components/stateless/PhotoMediumBlockStateless.jsx';
import ArticleContentStateless from '../components/stateless/ArticleContentStateless.jsx';
import ShareButtonsStateless from '../components/stateless/ShareButtonsStateless.jsx';
import EnterPartyButtonStateless from '../components/stateless/EnterPartyButtonStateless.jsx';
import PublicReceptionStateless from '../components/stateless/PublicReceptionStateless.jsx';
import RecommendationArticleContent from '../components/stateless/RecommendationArticleContent.jsx';

import {ArticlesCollection} from '../../api/Articles.js';
import {PhotosCollection} from '../../api/Photos.js';
import {VideosCollection} from '../../api/Videos.js';

import {mpStrings} from '../lib/main-page-localization.js';
import moment from '../lib/moment-with-locales.min.js';

import {PhotoSwipe} from 'react-photoswipe';

import {addScript, prepareCarousels, qs, qsa, notReady, cookie} from '../lib/coreLib.js';

class SingleArticleContainer extends Component {
  constructor(props) {
    super(props);

    let lang = undefined;

    if(Meteor.isClient) {
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
    }

    this.state = {
      lang: lang,
      isOpen: false,
      items: [],
      articleReady: false,
      ruRecommendationsReady: false,
      kzRecommendationsReady: false
    }
  }

  componentWillMount() {
    Meteor.subscribe('OneArticle', this.props.location.query.id, {
      onReady: () => {
        this.setState({articleReady: true});
      }
    });
    Meteor.subscribe('RuRecommendedArticles', {
      onReady: () => {
        this.setState({ruRecommendationsReady: true});
      }
    });
    Meteor.subscribe('KzRecommendedArticles', {
      onReady: () => {
        this.setState({kzRecommendationsReady: true});
      }
    });
    Meteor.subscribe('Photos');
    Meteor.subscribe('KzVideos');
    Meteor.subscribe('RuVideos');
  }

  setLang(lang) {
    cookie.set('lang', lang, 9999);
    window.location.reload();
  }

  instagramButtonHandler(e) {
    e.preventDefault();

    const photoId = e.currentTarget.getAttribute('data-id'),
          currentPhoto = this.props.images.filter((image) => image._id === photoId)[0];

    const items = [],
          prefix = currentPhoto.images,
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
    let {id} = this.props.location.query,
          {articles, videos, photos} = this.props;

    if(!this.state.articleReady || !this.state.ruRecommendationsReady || !this.state.kzRecommendationsReady
      || notReady(videos) || notReady(photos) || !photos.length)
      return <div className="preload-image"></div>;

    videosFiltered = videos.filter((video) => video.title[this.state.lang] !== "");

    const {lang} = this.state,
          headerWithAttrs = <Header
            lang={this.state.lang}
            setLang={this.setLang.bind(this)}
            mpStrings={mpStrings[this.state.lang]} />,
          footerWithAttrs = <Footer lang={this.state.lang} />,
          sliderBlock = <SliderBlock />,
          videosJSX = <VideosStateless lang={this.state.lang} videos={videosFiltered} />,
          photoLargeBlockJSX = <PhotoLargeBlockStateless
            instagramButtonHandler={this.instagramButtonHandler.bind(this)}
            lang={this.state.lang}
            photo={photos[0]}/>,
          photoMediumBlockJSX = photos.slice(1).map((photo, index) => <PhotoMediumBlockStateless
            instagramButtonHandler={this.instagramButtonHandler.bind(this)}
            lang={this.state.lang}
            photo={photo}
            key={index} />),
          currentArticle = articles.filter((articlesItem) => articlesItem._id === id)[0],
          shareButtonsJSX = <ShareButtonsStateless lang={this.state.lang}
            title={currentArticle.title[lang]}
            url={window.location.href}
            image={currentArticle.photo}/>,
          enterPartyButtonJSX = <EnterPartyButtonStateless lang={this.state.lang}/>,
          publicReceptionJSX = <PublicReceptionStateless mpStrings={mpStrings[this.state.lang]}/>,
          recommendations = articles.filter((article) => {
            return article.lang === lang && article.recommendation;
          }).slice(0, 4);

    moment.locale(lang);
    const date = moment(currentArticle.createdAt).format('LL'),
          {title, info, text, photo} = currentArticle,
          articleContentJSX = <ArticleContentStateless
            title={title}
            info={info}
            text={text}
            photo={photo}
            date={date}
            shareButtonsJSX={shareButtonsJSX}
            />,
          recommendationsJSX = recommendations.map((recommendation, index) => <RecommendationArticleContent
            key={index}
            news={recommendation}
            lang={this.state.lang}/>);

    return (
      <div>
        <SingleNewsHelmet
          title={title}
          description={title}
          image={photo}
          url={window.location.href}/>
        <PhotoSwipe
          isOpen={this.state.isOpen}
          items={this.state.items}
          onClose={this.photoSwipeCloseHandler.bind(this)}
          options={{history: false, shareEl: false}}/>
        <SingleArticle
          header={headerWithAttrs}
          footer={footerWithAttrs}
          sliderBlock={sliderBlock}
          photoLargeBlockJSX={photoLargeBlockJSX}
          photoMediumBlockJSX={photoMediumBlockJSX}
          videosJSX={videosJSX}
          articleContentJSX={articleContentJSX}
          enterPartyButtonJSX={enterPartyButtonJSX}
          publicReceptionJSX={publicReceptionJSX}
          recommendationsJSX={recommendationsJSX}
          mpStrings={mpStrings[this.state.lang]}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    articles: ArticlesCollection.find({}, {sort: {createdAt: -1}}).fetch(),
    videos: VideosCollection.find().fetch(),
    photos: PhotosCollection.find().fetch()
  }
}, SingleArticleContainer);
