  import React, {Component, PropTypes} from 'react';
  import {createContainer} from 'meteor/react-meteor-data';

  import Leadership from '../components/Leadership.jsx';
  import Header from '../components/stateless/Header.jsx';
  import Footer from '../components/stateless/Footer.jsx';
  import SliderBlock from '../components/stateless/SliderBlock.jsx';
  import LeadershipModal from '../components/stateless/LeadershipModal.jsx';
  import LeadershipInfoStateless from '../components/stateless/LeadershipInfoStateless.jsx';

  import {addScript, prepareCarousels, cookie, notReady} from '../lib/coreLib.js';

  import LeadershipHelmet from '../helmets/LeadershipHelmet.jsx';

  import {mpStrings} from '../lib/main-page-localization.js';
  import {LeadershipCollection} from '../../api/Leadership.js';

  class LeadershipContainer extends Component {
    componentWillMount() {
      Meteor.subscribe('Leadership');
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

    biographyClickHandler(e) {
      const id = e.currentTarget.getAttribute('data-leadership-id'),
            currentLeadership = this.props.leadership.filter((leadershipItem) => leadershipItem._id === id)[0];

      this.setState({
        currentLeadership
      });

      $.getScript('/custom/js/modal/jquery.arcticmodal-0.3.min.js', () => {
        $('#biographia-' + id).arcticmodal();
      });
    }

    render() {
      if(notReady(this.props.leadership))
        return <div className="preload-image" />;

      const {leadership} = this.props,
            headerWithAttrs = <Header
              lang={this.state.lang}
              setLang={this.setLang.bind(this)}
              mpStrings={mpStrings[this.state.lang]} />,
            footerWithAttrs = <Footer lang={this.state.lang} />,
            sliderBlock = <SliderBlock />,
            leadershipInfosJSX = leadership.map((leadershipItem, index) => {
              return <LeadershipInfoStateless
                        id={leadershipItem._id}
                        key={index}
                        lang={this.state.lang}
                        name={leadershipItem.name}
                        position={leadershipItem.position}
                        info={leadershipItem.info}
                        photo={leadershipItem.photo}
                        biographyClickHandler={this.biographyClickHandler.bind(this)}/>;
            }),
            leadershipModalsJSX = leadership.map((leadershipItem, index) => {
              return <LeadershipModal
                  key={index}
                  id={leadershipItem._id}
                  name={leadershipItem.name}
                  position={leadershipItem.position}
                  info={leadershipItem.info}
                  lang={this.state.lang}
                  biography={leadershipItem.biography}
                  photo={leadershipItem.photo}/>;
            });

      return (
        <div>
          <LeadershipHelmet />
          <Leadership
            header={headerWithAttrs}
            footer={footerWithAttrs}
            sliderBlock={sliderBlock}
            leadershipModalsJSX={leadershipModalsJSX}
            biographyClickHandler={this.biographyClickHandler.bind(this)}
            leadershipInfosJSX={leadershipInfosJSX}
            mpStrings={mpStrings[this.state.lang]}/>
        </div>
      );
    }
  }

  export default createContainer(() => {
    return {
      user: Meteor.user(),
      leadership: LeadershipCollection.find({}, {sort: {createdAt: -1}}).fetch()
    }
  }, LeadershipContainer);
