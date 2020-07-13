import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';

import Vacancies from '../components/Vacancies.jsx';
import Header from '../components/stateless/Header.jsx';
import Footer from '../components/stateless/Footer.jsx';
import SliderBlock from '../components/stateless/SliderBlock.jsx';
import EnterPartyButtonStateless from '../components/stateless/EnterPartyButtonStateless.jsx';
import PublicReceptionStateless from '../components/stateless/PublicReceptionStateless.jsx';
import FontSizeBlockStateless from '../components/stateless/FontSizeBlockStateless.jsx';

import {addScript, prepareCarousels, cookie} from '../lib/coreLib.js';

import VacanciesHelmet from '../helmets/VacanciesHelmet.jsx';
import {VacanciesCollection} from '../../api/Vacancies.js';

import {mpStrings} from '../lib/main-page-localization.js';

import moment from '../lib/moment-with-locales.min.js';

class VacanciesContainer extends Component {
  componentWillMount() {
    Meteor.subscribe('Vacancies');
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
    const {vacancies} = this.props;

    moment.locale(this.state.lang);

    const headerWithAttrs = <Header
            lang={this.state.lang}
            setLang={this.setLang.bind(this)}
            mpStrings={mpStrings[this.state.lang]} />,
          footerWithAttrs = <Footer lang={this.state.lang} />,
          sliderBlock = <SliderBlock />,
          enterPartyButtonJSX = <EnterPartyButtonStateless lang={this.state.lang}/>,
          publicReceptionJSX = <PublicReceptionStateless mpStrings={mpStrings[this.state.lang]}/>,
          fontSizeBlockJSX = <FontSizeBlockStateless />,
          vacanciesJSX = vacancies.map((vacancy) => {
            const date = moment(vacancy.createdAt).format('LL'),
                  blobs = !vacancy.blobs || !vacancy.blobs[this.state.lang]? [] : vacancy.blobs[this.state.lang];

            blobs.reverse();

            const blobsJSX = blobs.map((blob, index) => {
              filetype = blob.filename.split('.')[1];

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
              <div key={vacancy._id} className="purchase-block">
                <span className="date none-bg">
                  <strong><i>{date}</i></strong>
                </span>
                <p>
                  <a href={"single-vacancy?id=" + vacancy._id} className="green link">
                    {vacancy.title ? vacancy.title[this.state.lang] : ''}
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
        <VacanciesHelmet />
        <Vacancies
          header={headerWithAttrs}
          footer={footerWithAttrs}
          sliderBlock={sliderBlock}
          lang={this.state.lang}
          mpStrings={mpStrings[this.state.lang]}
          enterPartyButtonJSX={enterPartyButtonJSX}
          publicReceptionJSX={publicReceptionJSX}
          fontSizeBlockJSX={fontSizeBlockJSX}
          vacanciesJSX={vacanciesJSX}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user(),
    vacancies: VacanciesCollection.find({}, {sort: {createdAt: -1}}).fetch()
  }
}, VacanciesContainer);
