import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';

import SingleStaffCompetetion from '../components/SingleStaffCompetetion.jsx';

import Header from '../components/stateless/Header.jsx';
import Footer from '../components/stateless/Footer.jsx';
import SliderBlock from '../components/stateless/SliderBlock.jsx';
import ShareButtonsStateless from '../components/stateless/ShareButtonsStateless.jsx';
import FontSizeBlockStateless from '../components/stateless/FontSizeBlockStateless.jsx';
import EnterPartyButtonStateless from '../components/stateless/EnterPartyButtonStateless.jsx';
import PublicReceptionStateless from '../components/stateless/PublicReceptionStateless.jsx';
import StaffCompetetionContentStateless from '../components/stateless/StaffCompetetionContentStateless.jsx';

import {StaffCompetetionsCollection} from '../../api/StaffCompetetions.js';

import {mpStrings} from '../lib/main-page-localization.js';
import moment from '../lib/moment-with-locales.min.js';

import {addScript, prepareCarousels, qs, qsa, notReady, cookie} from '../lib/coreLib.js';

class SingleStaffCompetetionContainer extends Component {
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
    }
  }

  componentWillMount() {
    Meteor.subscribe('StaffCompetetions', this.props.location.query.id);
  }

  setLang(lang) {
    this.setState({lang});
    cookie.set('lang', lang, 9999);
  }

  render() {
    const {id} = this.props.location.query,
          {staffCompetetions} = this.props;

    if(notReady(staffCompetetions))
      return <div className="preload-image"></div>;

    const {lang} = this.state,
          headerWithAttrs = <Header
            lang={this.state.lang}
            setLang={this.setLang.bind(this)}
            mpStrings={mpStrings[this.state.lang]} />,
          footerWithAttrs = <Footer lang={this.state.lang} />,
          sliderBlock = <SliderBlock />,
          enterPartyButtonJSX = <EnterPartyButtonStateless lang={this.state.lang}/>,
          publicReceptionJSX = <PublicReceptionStateless mpStrings={mpStrings[this.state.lang]}/>,
          currentStaffCompetetion = staffCompetetions.filter((staffCompetetion) => staffCompetetion._id === id)[0],
          shareButtonsJSX = <ShareButtonsStateless lang={this.state.lang}
            title={currentStaffCompetetion.title[lang]}
            url={window.location.href}
            image={currentStaffCompetetion.photo}/>,
          fontSizeBlockJSX = <FontSizeBlockStateless />;

    moment.locale(lang);
    const date = moment(currentStaffCompetetion.createdAt).format('LL'),
          {title, text} = currentStaffCompetetion,
          staffCompetetionContentJSX = <StaffCompetetionContentStateless
            title={title[lang]}
            text={text[lang]}
            date={date}
            shareButtonsJSX={shareButtonsJSX} />,
          staffCompetetionFilesJSX = currentStaffCompetetion.blobs[this.state.lang].map((blob, index) => {
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
      <SingleStaffCompetetion
        header={headerWithAttrs}
        footer={footerWithAttrs}
        sliderBlock={sliderBlock}
        staffCompetetionContentJSX={staffCompetetionContentJSX}
        fontSizeBlockJSX={fontSizeBlockJSX}
        enterPartyButtonJSX={enterPartyButtonJSX}
        publicReceptionJSX={publicReceptionJSX}
        staffCompetetionFilesJSX={staffCompetetionFilesJSX}
        mpStrings={mpStrings[this.state.lang]}/>
    );
  }
}

export default createContainer(() => {
  return {
    staffCompetetions: StaffCompetetionsCollection.find().fetch()
  }
}, SingleStaffCompetetionContainer);
