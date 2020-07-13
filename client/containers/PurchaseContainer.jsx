import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';

import Purchase from '../components/Purchase.jsx';
import Header from '../components/stateless/Header.jsx';
import Footer from '../components/stateless/Footer.jsx';
import SliderBlock from '../components/stateless/SliderBlock.jsx';
import FontSizeBlockStateless from '../components/stateless/FontSizeBlockStateless.jsx';

import {notReady, addScript, prepareCarousels, cookie} from '../lib/coreLib.js';

import PurchaseHelmet from '../helmets/PurchaseHelmet.jsx';

import {mpStrings} from '../lib/main-page-localization.js';

import {PurchaseCollection} from '../../api/Purchase.js';

import moment from '../lib/moment-with-locales.min.js';

class PurchaseContainer extends Component {
  componentWillMount() {
    Meteor.subscribe('AllRuPurchase', this.state.purchaseNumber);
    Meteor.subscribe('AllKzPurchase', this.state.purchaseNumber);
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
      purchaseNumber: 12,
    }
  }

  purchaseLoadMoreHandler(e) {
    e.preventDefault();

    let purchaseNumber = this.state.purchaseNumber;
    purchaseNumber = purchaseNumber + 12;

    Meteor.subscribe('AllRuPurchase', purchaseNumber);
    Meteor.subscribe('AllKzPurchase', purchaseNumber);
    this.setState({purchaseNumber});
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
    let {purchase} = this.props;

    if(notReady(purchase))
      return <div className="preload-image"></div>;

    purchase = purchase.filter((purchaseItem) => purchaseItem.title[this.state.lang] !== "");

    moment.locale(this.state.lang);

    const headerWithAttrs = <Header
            lang={this.state.lang}
            setLang={this.setLang.bind(this)}
            mpStrings={mpStrings[this.state.lang]} />,
          footerWithAttrs = <Footer lang={this.state.lang} />,
          sliderBlock = <SliderBlock />,
          fontSizeBlockJSX = <FontSizeBlockStateless />,
          purchaseJSX = purchase.slice(0, this.state.purchaseNumber).map((purchaseItem) => {
            const date = moment(purchaseItem.createdAt).format('LL'),
                  blob = purchaseItem.blobs[this.state.lang] && purchaseItem.blobs[this.state.lang].length ? purchaseItem.blobs[this.state.lang][0] : {},
                  techJSX = blob.url ? (<a href={blob.url}>({mpStrings[this.state.lang].technicalSpecification})</a>) : [];

            return (
              <div key={purchaseItem._id} className="purchase-block">
                <span className="date none-bg">
                  <strong><i>{date}</i></strong>
                </span>
                <p>
                  <a href={"/single-purchase?id=" + purchaseItem._id} className="green link">
                    {purchaseItem.title[this.state.lang]}
                  </a>
                </p>
                <p>
                  {techJSX}
                </p>
              </div>
            );
          });

    return (
      <div>
        <PurchaseHelmet />
        <Purchase
          loadMoreHandler={this.purchaseLoadMoreHandler.bind(this)}
          header={headerWithAttrs}
          footer={footerWithAttrs}
          sliderBlock={sliderBlock}
          fontSizeBlockJSX={fontSizeBlockJSX}
          purchaseJSX={purchaseJSX}
          mpStrings={mpStrings[this.state.lang]}
          lang={this.state.lang}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user(),
    purchase: PurchaseCollection.find({},{sort: {createdAt: -1}}).fetch()
  }
}, PurchaseContainer);
