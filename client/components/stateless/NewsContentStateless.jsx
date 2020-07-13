import React, {Component} from 'react';

import {browserHistory} from 'react-router';

export default class NewsContentStateless extends Component {
  componentDidMount() {
    if(this.props.title === "")
      window.location.href = '/';
  }

  render() {
    const {date, title, info, text, photo, shareButtonsJSX} = this.props;

    let newsTextAndShare = <div>
      <div className="large-block">
        <img style={{opacity: 1}} src={photo  + '-/preview/740x400/'} alt="конференция" />
      </div>
      <div className="description-topic">
        <p dangerouslySetInnerHTML={{__html: info}}></p>
      </div>
      <p dangerouslySetInnerHTML={{__html: text}}></p>
      {shareButtonsJSX}
    </div>;

    return(
      <div>
        <div id="blocks-news" className="cell-8 single-news-content-stateless">
          <h2>{title}</h2>
          <div>
            <span className="date-news">{date}</span>
          </div>
          {newsTextAndShare}
        </div>
      </div>
    );
  }
}
