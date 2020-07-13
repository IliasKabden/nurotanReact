import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';

import Projects from '../components/Projects.jsx';
import Header from '../components/stateless/Header.jsx';
import Footer from '../components/stateless/Footer.jsx';
import SliderBlock from '../components/stateless/SliderBlock.jsx';

import {notReady, addScript, prepareCarousels, cookie} from '../lib/coreLib.js';

import ProjectsHelmet from '../helmets/ProjectsHelmet.jsx';

import {mpStrings} from '../lib/main-page-localization.js';
import {ProjectsCollection} from '../../api/Projects.js';

class ProjectsContainer extends Component {
  componentWillMount() {
    Meteor.subscribe('Projects');
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
    if(notReady(this.props.projects))
      return <div className="preload-image"></div>;

    const headerWithAttrs = <Header
            lang={this.state.lang}
            setLang={this.setLang.bind(this)}
            mpStrings={mpStrings[this.state.lang]} />,
          footerWithAttrs = <Footer lang={this.state.lang} />,
          sliderBlock = <SliderBlock />;

    return (
      <div>
        <ProjectsHelmet />
        <Projects
          header={headerWithAttrs}
          footer={footerWithAttrs}
          sliderBlock={sliderBlock}
          projects={this.props.projects}
          lang={this.state.lang}
          mpStrings={mpStrings[this.state.lang]}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user(),
    projects: ProjectsCollection.find().fetch(),
  }
}, ProjectsContainer);
