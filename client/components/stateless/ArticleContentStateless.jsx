import React, {Component} from 'react';



export default class ArticleContentStateless extends Component {
  render() {
    const {date, title, info, text, photo, shareButtonsJSX} = this.props;

    return(
      <div id="blocks-news" className="cell-8">
        <h2>{title}</h2>
        <div>
          <span className="date-news">{date}</span>
        </div>
        <div className="large-block">
          <img style={{opacity: 1}} src={photo} alt="конференция" />
        </div>
        <div className="description-topic">
          <p dangerouslySetInnerHTML={{__html: info}}></p>
        </div>
        <p dangerouslySetInnerHTML={{__html: text}}></p>
        {shareButtonsJSX}
      </div>
    );
  }
}
