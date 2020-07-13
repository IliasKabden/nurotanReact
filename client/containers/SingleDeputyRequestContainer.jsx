import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';

import SingleDeputyRequest from '../components/SingleDeputyRequest.jsx';

import Header from '../components/stateless/Header.jsx';
import Footer from '../components/stateless/Footer.jsx';
import SliderBlock from '../components/stateless/SliderBlock.jsx';
import ShareButtonsStateless from '../components/stateless/ShareButtonsStateless.jsx';
import FontSizeBlockStateless from '../components/stateless/FontSizeBlockStateless.jsx';
import EnterPartyButtonStateless from '../components/stateless/EnterPartyButtonStateless.jsx';
import PublicReceptionStateless from '../components/stateless/PublicReceptionStateless.jsx';
import DeputyRequestContentStateless from '../components/stateless/DeputyRequestContentStateless.jsx';

import {DeputyRequestsCollection} from '../../api/DeputyRequests.js';

import {mpStrings} from '../lib/main-page-localization.js';
import moment from '../lib/moment-with-locales.min.js';

import {addScript, prepareCarousels, qs, qsa, notReady, cookie} from '../lib/coreLib.js';

class SingleDeputyRequestContainer extends Component {
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
    Meteor.subscribe('DeputyRequests');
  }

  setLang(lang) {
    this.setState({lang});
    cookie.set('lang', lang, 9999);
  }

  render() {
    const {id} = this.props.location.query,
          {deputyRequests} = this.props;

    if(notReady(deputyRequests))
      return <div className="preload-image"></div>;

    ;

    const {lang} = this.state,
          headerWithAttrs = <Header
            lang={this.state.lang}
            setLang={this.setLang.bind(this)}
            mpStrings={mpStrings[this.state.lang]} />,
          footerWithAttrs = <Footer lang={this.state.lang} />,
          sliderBlock = <SliderBlock />,
          enterPartyButtonJSX = <EnterPartyButtonStateless lang={this.state.lang}/>,
          publicReceptionJSX = <PublicReceptionStateless mpStrings={mpStrings[this.state.lang]}/>,
          currentDeputyRequest = deputyRequests.filter((deputyRequest) => deputyRequest._id === id)[0],
          shareButtonsJSX = <ShareButtonsStateless lang={this.state.lang}
            title={currentDeputyRequest.info[lang]}
            url={window.location.href}/>,
          fontSizeBlockJSX = <FontSizeBlockStateless />;

    moment.locale(lang);
    const date = moment(currentDeputyRequest.createdAt).format('LL'),
          deputyRequestContentJSX = <DeputyRequestContentStateless
            info={currentDeputyRequest.info[lang]}
            dateAndRegistrationNumber={currentDeputyRequest.dateAndRegistrationNumber}
            answerDateAndRegistrationNumber={currentDeputyRequest.answerDateAndRegistrationNumber}
            anwerInfo={currentDeputyRequest.answerInfo ? currentDeputyRequest.answerInfo[this.state.lang] : ''}
            participants={currentDeputyRequest.participants}
            addressee={currentDeputyRequest.addressee[this.state.lang]}
            info={currentDeputyRequest.info[this.state.lang]}
            date={date}
            initiator={currentDeputyRequest.initiator}
            shareButtonsJSX={shareButtonsJSX}
            mpStrings={mpStrings[lang]}/>,
          deputyRequestFilesJSX = currentDeputyRequest.blobs.map((blob, index) => {
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
          }),
          deputyRequestAnswerFilesJSX = !currentDeputyRequest.answerBlobs ? [] : currentDeputyRequest.answerBlobs.map((blob, index) => {
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
      <SingleDeputyRequest
        header={headerWithAttrs}
        footer={footerWithAttrs}
        sliderBlock={sliderBlock}
        deputyRequestContentJSX={deputyRequestContentJSX}
        deputyRequestAnswerFilesJSX={deputyRequestAnswerFilesJSX}
        fontSizeBlockJSX={fontSizeBlockJSX}
        enterPartyButtonJSX={enterPartyButtonJSX}
        publicReceptionJSX={publicReceptionJSX}
        deputyRequestFilesJSX={deputyRequestFilesJSX}
        deputyRequestAnswerFilesJSX={deputyRequestAnswerFilesJSX}
        mpStrings={mpStrings[lang]}/>
    );
  }
}

export default createContainer(() => {
  return {
    deputyRequests: DeputyRequestsCollection.find().fetch()
  }
}, SingleDeputyRequestContainer);
