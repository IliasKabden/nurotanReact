import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';

import Leader from '../components/Leader.jsx';
import Header from '../components/stateless/Header.jsx';
import Footer from '../components/stateless/Footer.jsx';
import SliderBlock from '../components/stateless/SliderBlock.jsx';
import PhotoLargeBlockStateless from '../components/stateless/PhotoLargeBlockStateless.jsx';
import PhotoMediumBlockStateless from '../components/stateless/PhotoMediumBlockStateless.jsx';
import LeaderTabLeaderStateless from '../components/stateless/LeaderTabLeaderStateless.jsx';
import LeaderTabMessagesStateless from '../components/stateless/LeaderTabMessagesStateless.jsx';
import LeaderTabPerformancesStateless from '../components/stateless/LeaderTabPerformancesStateless.jsx';
import LeaderTabQuotationsStateless from '../components/stateless/LeaderTabQuotationsStateless.jsx';
import LeaderTabPhotosStateless from '../components/stateless/LeaderTabPhotosStateless.jsx';

import {addScript, prepareCarousels, prepareColumnsDevelopments, cookie, notReady} from '../lib/coreLib.js';

import LeaderHelmet from '../helmets/LeaderHelmet.jsx';

import {ImagesCollection} from '../../api/Images.js';
import {QuotationsCollection} from '../../api/Quotations.js';
import {MessagesCollection} from '../../api/Messages.js';
import {SpeechesCollection} from '../../api/Speeches.js';

import {mpStrings} from '../lib/main-page-localization.js';

import {PhotoSwipe} from 'react-photoswipe';

class LeaderContainer extends Component {
  componentWillMount() {
    Meteor.subscribe('Messages');
    Meteor.subscribe('Events');
    Meteor.subscribe('Images');
    Meteor.subscribe('AllSpeeches');
    Meteor.subscribe('Quotations');
  }

  constructor(props) {
    super(props);

    let lang = cookie.get('lang');

    if(lang === '')
    {
      cookie.set('lang', 'kz', 9999);
      lang = 'kz';
    }

    const activeSection = parseInt(this.props.location.query.tab);

    this.state = {
      lang,
      isOpen: false,
      items: [],
      activeSection: activeSection ? activeSection : 0,
      activeEvent: undefined,
      activeMessage: undefined,
      activePerformance: undefined,
      loading: false
    }
  }

  componentWillReceiveProps(newProps) {
    const {tab} = newProps.location.query;
    this.setState({activeSection: parseInt(tab)});
  }

  photoSwipeCloseHandler(e) {
    this.setState({
      isOpen: false
    });
  }

  setActiveMaterial(e) {
    const materialName = e.currentTarget.getAttribute('data-material-name'),
          activeMaterial = e.currentTarget.getAttribute('data-material-id');

    this.setState({
      [materialName]: activeMaterial
    })
  }

  setLang(lang) {
    this.setState({lang});
    cookie.set('lang', lang, 9999);
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

  render() {
    let {speeches, messages, quotations, images} = this.props;

    if(notReady(speeches) || notReady(messages)
        || notReady(quotations) || notReady(images))
        return <div className="preload-image" />

    speeches = speeches.filter((speech) => speech.title[this.state.lang] !== "");
    messages = messages.filter((message) => message.title[this.state.lang] !== "");
    quotations = quotations.filter((quotation) => quotation.text[this.state.lang] !== "");

    const headerWithAttrs = <Header
            lang={this.state.lang}
            setLang={this.setLang.bind(this)}
            mpStrings={mpStrings[this.state.lang]} />,
          footerWithAttrs = <Footer lang={this.state.lang} />,
          sliderBlock = <SliderBlock />,
          activeSection = [
            <LeaderTabLeaderStateless />,
            <LeaderTabPerformancesStateless
              lang={this.state.lang}
              performances={speeches}
              activePerformance={this.state.activePerformance}
              setActiveMaterial={this.setActiveMaterial.bind(this)}/>,
            <LeaderTabMessagesStateless
              lang={this.state.lang}
              messages={messages}
              activeMessage={this.state.activeMessage}
              setActiveMaterial={this.setActiveMaterial.bind(this)}/>,
            <LeaderTabQuotationsStateless lang={this.state.lang} quotations={quotations}/>,
            <LeaderTabPhotosStateless
              lang={this.state.lang}
              photos={images}
              instagramButtonHandler={this.instagramButtonHandler.bind(this)}/>,
          ][this.state.activeSection];

    return (
      <div>
        <LeaderHelmet />
        <Leader
          header={headerWithAttrs}
          footer={footerWithAttrs}
          sliderBlock={sliderBlock}
          activeSection={activeSection}
          activeSectionNumber={this.state.activeSection}
          mpStrings={mpStrings[this.state.lang]}/>
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
    images: ImagesCollection.find({}, {sort: {createdAt: -1}}).fetch(),
    speeches: SpeechesCollection.find({}, {sort: {createdAt: -1}}).fetch(),
    messages: MessagesCollection.find({}, {sort: {createdAt: -1}}).fetch(),
    quotations: QuotationsCollection.find({}, {sort: {createdAt: -1}}).fetch()
  }
}, LeaderContainer);
