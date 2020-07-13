import React, {Component} from 'react';

import {addScript, prepareCarousels, cookie, notReady} from '../../lib/coreLib.js';

import Header from './Header.jsx';
import Footer from './Footer.jsx';

import {mpStrings} from '../../lib/main-page-localization.js';

export default class NotFound extends Component {
  constructor(props) {
    super(props);

    let lang = cookie.get('lang');

    if(lang === '')
    {
      cookie.set('lang', 'kz', 9999);
      lang = 'kz';
    }

    this.state = {
      lang: lang
    }
  }

  setLang(lang) {
    this.setState({lang});
    cookie.set('lang', lang, 9999);
  }

  render() {
    return (
      <div>
        <Header
          lang={this.state.lang}
          setLang={this.setLang.bind(this)}
          mpStrings={mpStrings[this.state.lang]} />
        <div style={{textAlign: 'center'}}>
          <img src="/custom/img/404.png"/>
        </div>
        <Footer lang={this.state.lang} />
      </div>
    );
  }
}
