import React, {Component} from 'react';

export default class PublicReceptionStateless extends Component {
  render() {
    const {mpStrings} = this.props;

    return (
      <div className="medium-block-2 none-left-m" style={{height: '320px'}}>
        <img src="custom/img/top-block/electron.jpg" alt="Общественная Приемная" />
        <div className="topic-electron">
          <div className="content-app">
            <span>{mpStrings.electronic}</span>
            <h3><a href="http://kk.nurotan.kz/"><i>{mpStrings.publicReception}</i></a></h3>
            <span>{mpStrings.nurotanParty}</span>
            <ul>
              <li><a href="http://kk.nurotan.kz/request/agreement"><img src="custom/img/icons/edit.png" alt="edit" /> {mpStrings.appeal}</a></li>
              <li><a href="http://kk.nurotan.kz/appointment"><img src="custom/img/icons/persons.png" alt="persons" /> {mpStrings.appointment}</a></li>
              <li><a href="http://kk.nurotan.kz/blogs"><img src="custom/img/icons/question.png" alt="question" /> {mpStrings.question}</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
