import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class CalendarHelmet extends Component {
  render() {
    return (
      <Helmet
        link={[
          {rel: 'stylesheet', href: '/custom/plugins/pikaday/pikaday.css'},
        ]}
      />
    );
  }
}
