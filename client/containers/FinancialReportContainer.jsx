import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';

import FinancialReport from '../components/FinancialReport.jsx';
import Header from '../components/stateless/Header.jsx';
import Footer from '../components/stateless/Footer.jsx';
import SliderBlock from '../components/stateless/SliderBlock.jsx';
import EnterPartyButtonStateless from '../components/stateless/EnterPartyButtonStateless.jsx';
import PublicReceptionStateless from '../components/stateless/PublicReceptionStateless.jsx';
import ShareButtonsStateless from '../components/stateless/ShareButtonsStateless.jsx';

import {notReady, addScript, prepareCarousels, cookie} from '../lib/coreLib.js';

import FinancialReportHelmet from '../helmets/FinancialReportHelmet.jsx';

import {mpStrings} from '../lib/main-page-localization.js';

import {FinancialReportsCollection} from '../../api/FinancialReports.js';

class FinancialReportContainer extends Component {
  constructor(props) {
    super(props);

    let lang = cookie.get('lang');

    if(lang === '')
    {
      cookie.set('lang', 'kz', 9999);
      lang = 'kz';
    }

    const d = new Date();

    this.state = {
      lang: lang,
      activeYear: 0
    }
  }

  componentWillMount() {
    Meteor.subscribe('FinancialReports');
  }

  setLang(lang) {
    this.setState({lang});
    cookie.set('lang', lang, 9999);
  }

  setActiveYear(e) {
    this.setState({
      activeYear: parseInt(e.currentTarget.getAttribute('data-year'))
    })
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
    const {financialReports} = this.props;

    if(notReady(financialReports))
      return <div className="preload-image"></div>;

    const headerWithAttrs = <Header
            lang={this.state.lang}
            setLang={this.setLang.bind(this)}
            mpStrings={mpStrings[this.state.lang]} />,
          footerWithAttrs = <Footer lang={this.state.lang} />,
          sliderBlock = <SliderBlock />,
          enterPartyButtonJSX = <EnterPartyButtonStateless lang={this.state.lang}/>,
          publicReceptionJSX = <PublicReceptionStateless mpStrings={mpStrings[this.state.lang]}/>,
          shareButtonsJSX = <ShareButtonsStateless lang={this.state.lang}
            title="Отчет о доходах и расходах партии 'Нур Отан'"
            url={window.location.href}
            image=''/>,
          years = financialReports.map((report) => report.year ).sort((a, b) => a > b),
          yearsJSX = years.map((year, index) => {
            if(this.state.activeYear)
              return (
                <li key={year} className={parseInt(year) === parseInt(this.state.activeYear) ? 'active' : ''}>
                  <a onClick={this.setActiveYear.bind(this)} href="#" data-year={year}>{year}</a>
                </li>
              );
            else
              return (
                <li key={year} className={index === year.length - 1 ? 'active' : ''}>
                  <a onClick={this.setActiveYear.bind(this)} href="#" data-year={year}>{year}</a>
                </li>
              );
          });

    let currentFinancialReport;

    if(this.state.activeYear) {
      currentFinancialReport = financialReports.filter((report) => {
        return parseInt(report.year) === parseInt(this.state.activeYear);
      })[0];
    }
    else {
      currentFinancialReport = financialReports.filter((report) => {
        return parseInt(report.year) === parseInt(years[years.length - 1]);
      })[0];
    }

    const currentFinancialReportJSX = <div
            key={currentFinancialReport._id}
            dangerouslySetInnerHTML={{__html: currentFinancialReport.text[this.state.lang]}}></div>

    return (
      <div>
        <FinancialReportHelmet />
        <FinancialReport
          header={headerWithAttrs}
          footer={footerWithAttrs}
          sliderBlock={sliderBlock}
          lang={this.state.lang}
          mpStrings={mpStrings[this.state.lang]}
          enterPartyButtonJSX={enterPartyButtonJSX}
          publicReceptionJSX={publicReceptionJSX}
          shareButtonsJSX={shareButtonsJSX}
          currentFinancialReportJSX={currentFinancialReportJSX}
          yearsJSX={yearsJSX}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user(),
    financialReports: FinancialReportsCollection.find().fetch()
  }
}, FinancialReportContainer);
