import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';

import SinglePurchase from '../components/SinglePurchase.jsx';

import Header from '../components/stateless/Header.jsx';
import Footer from '../components/stateless/Footer.jsx';
import SliderBlock from '../components/stateless/SliderBlock.jsx';
import ShareButtonsStateless from '../components/stateless/ShareButtonsStateless.jsx';
import FontSizeBlockStateless from '../components/stateless/FontSizeBlockStateless.jsx';
import EnterPartyButtonStateless from '../components/stateless/EnterPartyButtonStateless.jsx';
import PublicReceptionStateless from '../components/stateless/PublicReceptionStateless.jsx';
import PurchaseContentStateless from '../components/stateless/PurchaseContentStateless.jsx';

import {PurchaseCollection} from '../../api/Purchase.js';

import {mpStrings} from '../lib/main-page-localization.js';
import moment from '../lib/moment-with-locales.min.js';

import {addScript, prepareCarousels, qs, qsa, notReady, cookie} from '../lib/coreLib.js';

class SinglePurchaseContainer extends Component {
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
    Meteor.subscribe('Purchase', this.props.location.query.id);
  }

  setLang(lang) {
    this.setState({lang});
    cookie.set('lang', lang, 9999);
  }

  render() {
    const {id} = this.props.location.query,
          {purchase} = this.props;

    if(notReady(purchase))
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
          currentPurchase = purchase.filter((purchase) => purchase._id === id)[0],
          shareButtonsJSX = <ShareButtonsStateless lang={this.state.lang}
            title={currentPurchase.title[lang]}
            url={window.location.href}
            image={currentPurchase.photo}/>,
          fontSizeBlockJSX = <FontSizeBlockStateless />;

    moment.locale(lang);
    const date = moment(currentPurchase.createdAt).format('LL'),
          {title, text} = currentPurchase,
          purchaseContentJSX = <PurchaseContentStateless
            title={title[lang]}
            text={text[lang]}
            date={date}
            shareButtonsJSX={shareButtonsJSX} />,
          purchaseFilesJSX = currentPurchase.blobs[this.state.lang].map((blob, index) => {
            const filetype = blob.filename.split('.')[1];

            if(index) {
              return (
                <a key={index} href={blob.url}>
                  <span className="pdf-file">
                    <img src={"custom/img/icons/doc-icon.png"} alt={filetype + "-icon"} />
                    <span className="name-file">{blob.filename}</span>
                    <span className="clearfix" />
                  </span>
                </a>
              );
            }
            else {
              return (
                <a key={index} href={blob.url}>
                  <span className="pdf-file">
                    <img src={"custom/img/icons/doc-icon.png"} alt={filetype + "-icon"} />
                    <span className="name-file">{mpStrings[lang].technicalSpecification}</span>
                    <span className="clearfix" />
                  </span>
                </a>
              );
            }
          });

    return (
      <SinglePurchase
        header={headerWithAttrs}
        footer={footerWithAttrs}
        sliderBlock={sliderBlock}
        purchaseContentJSX={purchaseContentJSX}
        fontSizeBlockJSX={fontSizeBlockJSX}
        enterPartyButtonJSX={enterPartyButtonJSX}
        publicReceptionJSX={publicReceptionJSX}
        purchaseFilesJSX={purchaseFilesJSX}
        mpStrings={mpStrings[this.state.lang]}/>
    );
  }
}

export default createContainer(() => {
  return {
    purchase: PurchaseCollection.find().fetch()
  }
}, SinglePurchaseContainer);
