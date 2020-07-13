import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';

import {Link} from 'react-router';

import StaffCompetetions from '../components/StaffCompetetions.jsx';
import Header from '../components/stateless/Header.jsx';
import Footer from '../components/stateless/Footer.jsx';
import SliderBlock from '../components/stateless/SliderBlock.jsx';

import {addScript, prepareCarousels, cookie} from '../lib/coreLib.js';

import StaffCompetetionsHelmet from '../helmets/StaffCompetetionsHelmet.jsx';

import {mpStrings} from '../lib/main-page-localization.js';

import {StaffCompetetionsCollection} from '../../api/StaffCompetetions.js';

import moment from '../lib/moment-with-locales.min.js';

class StaffCompetetionsContainer extends Component {
  componentWillMount() {
      Meteor.subscribe('AllStaffCompetetions', this.state.competetionsNumber);
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
      competetionsNumber: 12
    }
  }

  competetionsLoadMoreHandler(e) {
    e.preventDefault();

    let competetionsNumber = this.state.competetionsNumber;
    competetionsNumber = competetionsNumber + 12;

    Meteor.subscribe('AllStaffCompetetions', competetionsNumber);
    this.setState({competetionsNumber});
  }

  setLang(lang) {
    this.setState({lang});
    cookie.set('lang', lang, 9999);
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
    const headerWithAttrs = <Header
            lang={this.state.lang}
            setLang={this.setLang.bind(this)}
            mpStrings={mpStrings[this.state.lang]} />,
          footerWithAttrs = <Footer lang={this.state.lang} />,
          sliderBlock = <SliderBlock />,
          {staffCompetetions} = this.props,
          staffCompetetionsJSX = staffCompetetions.map((staffCompetetionsItem) => {
            moment.locale(this.state.lang);
            const date = moment(staffCompetetionsItem.createdAt).format('LL');

            blobsJSX = staffCompetetionsItem.blobs[this.state.lang].map((blob, index) => {
              // const filetype = blob.filename.split('.')[1];
              const filetype = blob.filename.split('.').reverse()[0];

              return (
                <a key={index} href={blob.url}>
                  <span className="pdf-file">
                    <img src={"custom/img/icons/" + filetype + "-icon.png"} alt={filetype + "-icon"} />
                    <span className="name-file">{blob.filename}</span>
                    <span className="clearfix" />
                  </span>
                </a>
              );
            });

            return (
              <div key={staffCompetetionsItem._id} className="purchase-block">
                <span className="date none-bg">
                  <strong><i>{date}</i></strong>
                </span>
                <p>
                  <a href={"single-staff-competetion?id=" + staffCompetetionsItem._id} className="green link">
                    {staffCompetetionsItem.title ? staffCompetetionsItem.title[this.state.lang] : ''}
                  </a>
                </p>
                <p>
                  {blobsJSX}
                </p>
              </div>
            );
          });

    return (
      <div>
        <StaffCompetetionsHelmet />
        <StaffCompetetions
          loadMoreHandler={this.competetionsLoadMoreHandler.bind(this)}
          header={headerWithAttrs}
          footer={footerWithAttrs}
          sliderBlock={sliderBlock}
          mpStrings={mpStrings[this.state.lang]}
          staffCompetetionsJSX={staffCompetetionsJSX}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user(),
    staffCompetetions: StaffCompetetionsCollection.find({}, {sort: {createdAt: -1}}).fetch(),
  }
}, StaffCompetetionsContainer);
