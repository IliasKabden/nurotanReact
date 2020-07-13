import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';

import {Link} from 'react-router';

import DeputyRequests from '../components/DeputyRequests.jsx';
import Header from '../components/stateless/Header.jsx';
import Footer from '../components/stateless/Footer.jsx';
import SliderBlock from '../components/stateless/SliderBlock.jsx';

import {addScript, prepareCarousels, cookie} from '../lib/coreLib.js';

import DeputyRequestsHelmet from '../helmets/DeputyRequestsHelmet.jsx';

import {mpStrings} from '../lib/main-page-localization.js';

import {DeputyRequestsCollection} from '../../api/DeputyRequests.js';

import moment from '../lib/moment-with-locales.min.js';

class DeputyRequestsContainer extends Component {
  componentWillMount() {
    Meteor.subscribe('DeputyRequestsRu', this.state.deputyRequestsNumber);
    Meteor.subscribe('DeputyRequestsKz', this.state.deputyRequestsNumber);
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
      deputyRequestsNumber: 12
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

  deputyRequestsLoadMoreHandler(e) {
    e.preventDefault();

    let deputyRequestsNumber = this.state.deputyRequestsNumber;
    deputyRequestsNumber = deputyRequestsNumber + 12;

    Meteor.subscribe('DeputyRequestsRu', deputyRequestsNumber);
    Meteor.subscribe('DeputyRequestsKz', deputyRequestsNumber);

    this.setState({deputyRequestsNumber});
  }

  render() {
    const headerWithAttrs = <Header
            lang={this.state.lang}
            setLang={this.setLang.bind(this)}
            mpStrings={mpStrings[this.state.lang]} />,
          footerWithAttrs = <Footer lang={this.state.lang} />,
          sliderBlock = <SliderBlock />,
          {deputyRequests} = this.props;

    const deputyRequestsJSX = deputyRequests.filter((deputyRequest) => {
            return deputyRequest.info[this.state.lang] !== "";
          }).map((deputyRequest) => {
            const blob = deputyRequest.blobs[0];

            return (
              <tr key={deputyRequest._id}>
                <td>
                  <Link to={"/single-deputy-request?id="+deputyRequest._id}>
                    {deputyRequest.participants}
                  </Link>
                </td>
                <td>
                  <Link to={"/single-deputy-request?id="+deputyRequest._id}>
                    <span className="bold">{deputyRequest.dateAndRegistrationNumber}</span>
                    {deputyRequest.addressee[this.state.lang]}
                  </Link>
                </td>
                <td>
                  <Link to={"/single-deputy-request?id="+deputyRequest._id}>
                    {deputyRequest.info[this.state.lang]}
                  </Link>
                  <br/><a href={blob && blob[this.state.lang] ? blob[this.state.lang].url : ''}>(документ)</a>
                </td>
              </tr>
            );
          });

    return (
      <div>
        <DeputyRequestsHelmet />
        <DeputyRequests
          header={headerWithAttrs}
          footer={footerWithAttrs}
          sliderBlock={sliderBlock}
          mpStrings={mpStrings[this.state.lang]}
          deputyRequestsJSX={deputyRequestsJSX}
          deputyRequestsLoadMoreHandler={this.deputyRequestsLoadMoreHandler.bind(this)}
        />
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user(),
    deputyRequests: DeputyRequestsCollection.find({},{sort: {createdAt: -1}}).fetch()
  }
}, DeputyRequestsContainer);
