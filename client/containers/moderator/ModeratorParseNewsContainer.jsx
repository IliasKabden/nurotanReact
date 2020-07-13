import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {
        qs, qsa, addScript, notReady,
        setEditorValue, getEditorValue,
        setPhotoWidgetValue, setJqueryTagValue
      } from '../../lib/coreLib.js'

import ModeratorNewsHelmet from '../../helmets/ModeratorNewsHelmet.jsx';
import ModeratorParseNews from '../../components/moderator/ModeratorParseNews.jsx';

import {NewsCollection} from '../../../api/News.js';

import moment from '../../lib/moment-with-locales.min.js';

class ModeratorParseNewsContainer extends Component {
  constructor(props) {
    super(props);

    Meteor.subscribe('AllNews');
  }

  componentDidMount() {
    document.body.setAttribute('class', 'hold-transition skin-green-light layout-top-nav');
  }

  /* START EVENT HANDLERS */

  parseNewsButtonHandler(e) {
    e.preventDefault();

    const cForm = qs('#moderator-parse-news'),
          start = parseInt(cForm.elements['start'].value),
          end = parseInt(cForm.elements['end'].value);

    Meteor.call('news.parse', start, end, (err) => {
      if(err) {
        ;
      }
      else {
        ;
      }
    });
  }

  getNewsJSX() {
    if(!this.props.news || !this.props.news.length)
      return [];

    return this.props.news.map((newsItem) => {
      const date = moment(newsItem.createdAt).format('L');
      return (
        <tr key={newsItem._id}>
          <td><input className='news-checkbox' data-id={newsItem._id} type="checkbox" /></td>
          <td>{newsItem.title.ru}</td>
          <td>{newsItem.title.kz}</td>
          <td>{date}</td>
        </tr>
      );
    });
  }

  /* END GENERATED JSX*/

  render() {
    const {news} = this.props;

    if(notReady(news))
      return <div className="preload-image"></div>;

    return (
      <div>
        <ModeratorNewsHelmet />
        <ModeratorParseNews
          parseNewsButtonHandler={this.parseNewsButtonHandler.bind(this)}
          newsJSX={this.getNewsJSX()}
          />
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    news: NewsCollection.find({}, {sort: {createdAt: -1}}).fetch(),
  };
}, ModeratorParseNewsContainer)
