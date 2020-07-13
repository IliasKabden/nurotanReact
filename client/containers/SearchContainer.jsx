import React, {Component} from 'react';
import Search from '../components/Search.jsx';
import {createContainer} from 'meteor/react-meteor-data';
import {Link} from 'react-router'

import {addScript, prepareCarousels, qs, qsa, cookie, addStyle} from '../lib/coreLib.js';

import Header from '../components/stateless/Header.jsx';
import Footer from '../components/stateless/Footer.jsx';
import FontSizeBlockStateless from '../components/stateless/FontSizeBlockStateless.jsx';
import VisuallyImpairedBlock from '../components/stateless/VisuallyImpairedBlock.jsx';
import ScrollUpButtonStateless from '../components/stateless/ScrollUpButtonStateless.jsx';

import SearchHelmet from '../helmets/SearchHelmet.jsx';

import {NewsCollection} from '../../api/News.js';
import {ArticlesCollection} from '../../api/Articles.js';

import {mpStrings} from '../lib/main-page-localization.js';

import moment from '../lib/moment-with-locales.min.js';

class SearchContainer extends Component {
  constructor(props) {
    super(props);

    let lang = cookie.get('lang');

    if(lang === '')
    {
      cookie.set('lang', 'kz', 9999);
      lang = 'kz';
    }

    const {expression} = this.props.location.query;

    this.state = {
      lang: lang,
      searchExpression: expression || ''
    }
  }

  setLang(lang) {
    this.setState({lang});
    cookie.set('lang', lang, 9999);
  }

  searchValueChangeHandler(e) {
    this.setState({
      searchExpression: e.currentTarget.value
    })
  }

  componentWillMount() {
    Meteor.subscribe('KzNews');
    Meteor.subscribe('RuNews');
    Meteor.subscribe('KzArticles');
    Meteor.subscribe('RuArticles');
  }

  visuallyImpairedButtonHandler(e) {
    e.preventDefault();
    $('#infobardm').css('display', '');
    addStyle({href: '/custom/css/ucoz/allstyles.css'});
  }

  render() {
    let {news, articles} = this.props;

    if(!news || !news.length || !articles || !articles.length)
      return <div className="preload-image"></div>;

    news = news.filter((newsItem) => newsItem.title[this.state.lang] !== "");

    moment.locale(this.state.lang);

    const headerWithAttrs = <Header
            lang={this.state.lang}
            setLang={this.setLang.bind(this)}
            mpStrings={mpStrings[this.state.lang]}
            visuallyImpairedButtonHandler={this.visuallyImpairedButtonHandler.bind(this)}/>,
          footerWithAttrs = <Footer lang={this.state.lang} />,
          scrollUpButtonJSX = <ScrollUpButtonStateless lang={this.state.lang}/>,
          fontSizeBlockJSX = <FontSizeBlockStateless />,
          visuallyImpairedJSX = <VisuallyImpairedBlock />,
          newsSearchResults = news.filter((newsItem) => {
            const sexp = new RegExp(this.state.searchExpression, 'i');

            return newsItem.text[this.state.lang].match(sexp)
                    || newsItem.title[this.state.lang].match(sexp);
          }).map((newsItem) => {
            const date = moment(newsItem.createdAt).format('LL');

            return (
              <div key={newsItem._id} className="purchase-block">
                <span className="date none-bg">
                  <strong><i>{date}</i></strong>
                </span>
                <p>
                  <Link to={"/single-news?id=" + newsItem._id+"&lang="+this.state.lang} className="green link">{newsItem.title[this.state.lang]}</Link>
                </p>
              </div>
            );
          }),
          articlesSearchResults = articles.filter((article) => {
            const sexp = new RegExp(this.state.searchExpression, 'i');

            return article.lang === this.state.lang && (
              article.title.match(sexp) ||
              article.text.match(sexp)
            );
          }).map((article) => {
            const date = moment(article.createdAt).format('LL');

            return (
              <div key={article._id} className="purchase-block">
                <span className="date none-bg">
                  <strong><i>{date}</i></strong>
                </span>
                <p>
                  <Link to={"/single-article?id=" + article._id + "&lang="+this.state.lang} className="green link">{article.title}</Link>
                </p>
              </div>
            );
          });

    return (
      <div>
        <SearchHelmet />
        <Search
          header={headerWithAttrs}
          footer={footerWithAttrs}
          lang={this.state.lang}
          mpStrings={mpStrings[this.state.lang]}
          scrollUpButtonJSX={scrollUpButtonJSX}
          fontSizeBlockJSX={fontSizeBlockJSX}
          visuallyImpairedJSX={visuallyImpairedJSX}
          newsSearchResults={newsSearchResults}
          articlesSearchResults={articlesSearchResults}
          searchExpression={this.state.searchExpression}
          searchValueChangeHandler={this.searchValueChangeHandler.bind(this)}
          />
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    news: NewsCollection.find({}, {sort: {createdAt: -1}}).fetch(),
    articles: ArticlesCollection.find({}, {sort: {createdAt: -1}}).fetch(),
  }
}, SearchContainer);
