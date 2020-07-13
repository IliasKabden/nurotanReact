import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';

import PPO from '../components/PPO.jsx';
import Header from '../components/stateless/Header.jsx';
import SliderBlock from '../components/stateless/SliderBlock.jsx';
import Footer from '../components/stateless/Footer.jsx';
import VideosStateless from '../components/stateless/VideosStateless.jsx';
import PhotoLargeBlockStateless from '../components/stateless/PhotoLargeBlockStateless.jsx';
import PhotoMediumBlockStateless from '../components/stateless/PhotoMediumBlockStateless.jsx';
import ShareButtonsStateless from '../components/stateless/ShareButtonsStateless.jsx';
import FileLinkStateless from '../components/stateless/FileLinkStateless.jsx';

import {addScript, prepareCarousels, cookie, notReady} from '../lib/coreLib.js';

import PPOHelmet from '../helmets/PPOHelmet.jsx';

import {PhotosCollection} from '../../api/Photos.js';
import {VideosCollection} from '../../api/Videos.js';

import {mpStrings} from '../lib/main-page-localization.js';
import {PPOCollection} from '../../api/PPO.js';

class PPOContainer extends Component {
  componentWillMount() {
    Meteor.subscribe('PPO');
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
    cookie.set('lang', lang, 9999);
    window.location.reload();
  }

  componentWillMount() {
    Meteor.subscribe('Photos');
    Meteor.subscribe('RuVideos');
    Meteor.subscribe('KzVideos');
    Meteor.subscribe('PPO');
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
    let {videos, photos, ppo} = this.props;

    if(!videos || !videos.length || !photos || !photos.length || notReady(ppo))
      return <div className="preload-image"></div>;

    videos = videos.filter((video) => video.title[this.state.lang] !== "");
    photos = photos.filter((photo) => photo.title[this.state.lang] !== "");

    const headerWithAttrs = <Header
            lang={this.state.lang}
            setLang={this.setLang.bind(this)}
            mpStrings={mpStrings[this.state.lang]} />,
          footerWithAttrs = <Footer lang={this.state.lang} />,
          sliderBlock = <SliderBlock />,
          videosJSX = <VideosStateless
            lang={this.state.lang}
            videos={videos} />,
          photoLargeBlockJSX = <PhotoLargeBlockStateless
            instagramButtonHandler={this.instagramButtonHandler.bind(this)}
            lang={this.state.lang}
            photo={photos[0]}/>,
          photoMediumBlockJSX = photos.slice(1).map((photo, index) => <PhotoMediumBlockStateless
            instagramButtonHandler={this.instagramButtonHandler.bind(this)}
            lang={this.state.lang}
            photo={photo}
            key={index} />),
          shareButtonsJSX = <ShareButtonsStateless lang={this.state.lang}
            url={window.location.href}
            title='ППО'
            image=''/>,
          currentPPO = ppo.filter((ppoItem) => ppoItem._id === "1")[0],
          ppoFilesJSX = currentPPO.blobs[this.state.lang].map((blob, index) => {
            return <FileLinkStateless key={index} blob={blob} />;
          });

    return (
      <div>
        <PPOHelmet />
        <PPO
          header={headerWithAttrs}
          footer={footerWithAttrs}
          videosJSX={videosJSX}
          photoLargeBlockJSX={photoLargeBlockJSX}
          photoMediumBlockJSX={photoMediumBlockJSX}
          sliderBlock={sliderBlock}
          shareButtonsJSX={shareButtonsJSX}
          ppo={currentPPO[this.state.lang]}
          mpStrings={mpStrings[this.state.lang]}
          ppoFilesJSX={ppoFilesJSX}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user(),
    photos: PhotosCollection.find().fetch(),
    videos: VideosCollection.find().fetch(),
    ppo: PPOCollection.find({_id:"1"}).fetch()
  }
}, PPOContainer);
