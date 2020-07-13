import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';

import {Link} from 'react-router';

import StaffRegions from '../components/StaffRegions.jsx';
import Header from '../components/stateless/Header.jsx';
import Footer from '../components/stateless/Footer.jsx';
import SliderBlock from '../components/stateless/SliderBlock.jsx';

import {addScript, prepareCarousels, cookie} from '../lib/coreLib.js';

import StaffRegionsHelmet from '../helmets/StaffRegionsHelmet.jsx';

import {mpStrings} from '../lib/main-page-localization.js';

import {StaffRegionsCollection} from '../../api/StaffRegions.js';
import {RegionsCollection} from '../../api/Regions.js';

import moment from '../lib/moment-with-locales.min.js';

class StaffRegionsContainer extends Component {
  componentWillMount() {
    Meteor.subscribe('AllStaffRegions');
    Meteor.subscribe('Regions');
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
          {staffRegions, regions} = this.props,
          staffRegionsJSX = staffRegions.map((staffRegionsItem) => {
            moment.locale(this.state.lang);
            const date = moment(staffRegionsItem.date).format('LL'),
                  region = regions.filter((regionItem) => regionItem._id === staffRegionsItem.region)[0];

            blobsJSX = staffRegionsItem.blobs[this.state.lang].map((blob, index) => {
              const filetype = blob.filename.split('.')[1];

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
              <tr key={staffRegionsItem._id}>
                <td>
                {region.name[this.state.lang]}
                </td>
                <td>
                  {blobsJSX}
                </td>
              </tr>
            );
          });

    return (
      <div>
        <StaffRegionsHelmet />
        <StaffRegions
          header={headerWithAttrs}
          footer={footerWithAttrs}
          sliderBlock={sliderBlock}
          mpStrings={mpStrings[this.state.lang]}
          staffRegionsJSX={staffRegionsJSX}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user(),
    staffRegions: StaffRegionsCollection.find({}, {sort: {createdAt: -1}}).fetch(),
    regions: RegionsCollection.find().fetch()
  }
}, StaffRegionsContainer);
