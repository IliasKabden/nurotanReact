import React, {Component} from 'react';
import SingleProject from '../components/SingleProject.jsx';
import {createContainer} from 'meteor/react-meteor-data';

import {addScript, cookie,notReady} from '../lib/coreLib.js';

import Header from '../components/stateless/Header.jsx';
import Footer from '../components/stateless/Footer.jsx';
import SliderBlock from '../components/stateless/SliderBlock.jsx';
import EnterPartyButtonStateless from '../components/stateless/EnterPartyButtonStateless.jsx';
import PublicReceptionStateless from '../components/stateless/PublicReceptionStateless.jsx';
import ShareButtonsStateless from '../components/stateless/ShareButtonsStateless.jsx';

import {mpStrings} from '../lib/main-page-localization.js';
import {ProjectsCollection} from '../../api/Projects.js';
import {NewsCollection} from '../../api/News.js';

class SingleProjectContainer extends Component {
  componentWillMount() {
    Meteor.subscribe('Projects');
    Meteor.subscribe('ProjectNews');
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

  render() {
    if(notReady(this.props.projects) || notReady(this.props.news))
      return <div className="preload-image" />;

    let {news} = this.props;

    const {projects} = this.props,
          headerWithAttrs = <Header
            lang={this.state.lang}
            setLang={this.setLang.bind(this)}
            mpStrings={mpStrings[this.state.lang]} />,
          footerWithAttrs = <Footer lang={this.state.lang} />,
          sliderBlock = <SliderBlock />,
          enterPartyButtonJSX = <EnterPartyButtonStateless lang={this.state.lang}/>,
          publicReceptionJSX = <PublicReceptionStateless mpStrings={mpStrings[this.state.lang]}/>,
          id = this.props.location.query.id,
          currentProject = projects.filter((project) => project._id === id)[0],
          shareButtonsJSX = <ShareButtonsStateless lang={this.state.lang}
            title={currentProject.title[this.state.lang]}
            url={window.location.href}
            image={currentProject.photo} />,
          currentNews = news.filter((newsItem) => newsItem.project === currentProject._id);

    return (
      <SingleProject
        header={headerWithAttrs}
        footer={footerWithAttrs}
        sliderBlock={sliderBlock}
        enterPartyButtonJSX={enterPartyButtonJSX}
        publicReceptionJSX={publicReceptionJSX}
        shareButtonsJSX={shareButtonsJSX}
        currentProject={currentProject}
        currentNews={currentNews}
        mpStrings={mpStrings[this.state.lang]}
        lang={this.state.lang}/>
    );
  }
}

export default createContainer(() => {
  return {
    projects: ProjectsCollection.find().fetch(),
    news: NewsCollection.find({}, {sort: {createdAt: -1}}).fetch()
  }
}, SingleProjectContainer);
