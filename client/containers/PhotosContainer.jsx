import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';

import Photos from '../components/Photos.jsx';
import Header from '../components/stateless/Header.jsx';
import Footer from '../components/stateless/Footer.jsx';
import SliderBlock from '../components/stateless/SliderBlock.jsx';
import PhotoBlockStateless from '../components/stateless/PhotoBlockStateless.jsx';
import CalendarContainer from './CalendarContainer.jsx';

import moment from '../lib/moment-with-locales.min.js';

import {addScript, prepareCarousels, cookie} from '../lib/coreLib.js';

import PhotosHelmet from '../helmets/PhotosHelmet.jsx';

import {PhotosCollection} from '../../api/Photos.js';

import {PhotoSwipe} from 'react-photoswipe';

import {mpStrings} from '../lib/main-page-localization.js';

class PhotosContainer extends Component {
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
      photosNumber: 8,
      loading: false
    }
  }

  componentWillMount() {
    Meteor.subscribe('Photos');
  }

  dateSelectHandler(date) {
    this.setState({
      currentDate: date
    })
  }

  setLang(lang) {
    this.setState({lang});
    cookie.set('lang', lang, 9999);
  }

  componentWillMount() {
    Meteor.subscribe('AllRuPhotos', this.state.photosNumber);
    Meteor.subscribe('AllKzPhotos', this.state.photosNumber);
  }

  componentDidMount() {
    addScript({
      src: 'custom/js/main.js'
    });

    $.getScript('/custom/js/slider/owl.carousel.min.js', () => {
      prepareCarousels();
    });
  }

  resetDate() {
    this.setState({
      currentDate: undefined
    });
  }

  photosLoadMoreHandler(e) {
    e.preventDefault();

    let photosNumber = this.state.photosNumber;
    photosNumber = photosNumber + 8;

    Meteor.subscribe('AllRuPhotos', photosNumber);
    Meteor.subscribe('AllKzPhotos', photosNumber);
    this.setState({photosNumber});
  }

  dateSelectHandler(date) {
    this.setState({
      currentDate: date
    });

    const nextDay = new Date(date.getFullYear(),  date.getMonth(), date.getDate() + 1),
          prevDay = new Date(date.getFullYear(),  date.getMonth(), date.getDate());

    Meteor.subscribe('AllRuPhotos', this.state.photosNumber, {nextDay, prevDay}, () => {
      this.setState({
        photosNumber: PhotosCollection.find().count()
      });
    });
    Meteor.subscribe('AllKzPhotos', this.state.photosNumber, {nextDay, prevDay}, () => {
      this.setState({
        photosNumber: PhotosCollection.find().count()
      });
    });
  }

  /*BEGIN EVENT LISTENERS*/

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

  /*END EVENT LISTENERS*/

  render() {
    let {photos} = this.props;

    if(!photos || !photos.length)
      return <div className="preload-image"></div>;

    photos = photos.filter((photo) => photo.title[this.state.lang] !== "");

    if(this.state.currentDate) {
      photos = photos.filter((photosItem) => {
        return moment(photosItem.createdAt).isSame(this.state.currentDate, 'day');
      });
    }

    const headerWithAttrs = <Header
            lang={this.state.lang}
            setLang={this.setLang.bind(this)}
            mpStrings={mpStrings[this.state.lang]} />,
          footerWithAttrs = <Footer lang={this.state.lang} />,
          sliderBlock = <SliderBlock />,
          photoBlocksJSX = photos.map((photo, index) => <PhotoBlockStateless
            instagramButtonHandler={this.instagramButtonHandler.bind(this)}
            lang={this.state.lang}
            photo={photo}
            key={index} />),
          photoSmallBlockJSX = photos.filter((photo, index) => {
              return index > 4;
            }).map((photo, index) => <photoSmallBlockJSX lang={this.state.lang} photo={photo} key={index}/>),
          calendarJSX = <CalendarContainer
            lang={this.state.lang}
            onDateSelect={this.dateSelectHandler.bind(this)}/>;

    const images = [];

    photos.forEach((photo) => {
      images.push(...photo.photos);
    });

    return (
      <div>
        <PhotosHelmet />
        <Photos
          header={headerWithAttrs}
          footer={footerWithAttrs}
          sliderBlock={sliderBlock}
          photoBlocksJSX={photoBlocksJSX}
          mpStrings={mpStrings[this.state.lang]}
          calendarJSX={calendarJSX}
          resetDate={this.resetDate.bind(this)}
          dateSelectHandler={this.dateSelectHandler.bind(this)}
          loadMoreHandler={this.photosLoadMoreHandler.bind(this)}
          loading={this.state.loading}
        />
        <PhotoSwipe
          isOpen={this.state.isOpen}
          items={this.state.items}
          options={{history: false, shareEl: false}}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user(),
    photos: PhotosCollection.find({},{sort: {createdAt: -1}}).fetch()
  }
}, PhotosContainer);
