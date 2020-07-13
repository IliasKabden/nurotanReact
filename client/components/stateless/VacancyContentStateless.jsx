import React, {Component} from 'react';

export default class VacancyContentStateless extends Component {
  render() {
    const {date, title, text, shareButtonsJSX} = this.props;

    return(
      <div id="blocks-news" className="cell-8 single-news-content-stateless">
        <h2>{title}</h2>
        <div>
          <span className="date-news">{date}</span>
        </div>
        <p dangerouslySetInnerHTML={{__html: text}}></p>
        {shareButtonsJSX}
      </div>
    );
  }
}
