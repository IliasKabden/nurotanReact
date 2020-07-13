import React, {Component} from 'react';

export default class DeputyRequestContentStateless extends Component {
  componentDidMount() {
    if(this.props.info === "")
      window.location.href = '/';
  }

  render() {
    const {
      date, shareButtonsJSX, mpStrings, participants,
      dateAndRegistrationNumber, initiator,
      addressee, info, answerDateAndRegistrationNumber,
      answerInfo
    } = this.props;

    return(
      <div id="blocks-news" className="cell-8 single-press-release-content-stateless">
        <h2>{info}</h2>
        <div>
          <span className="date-news">{date}</span>
        </div>
        <p>{mpStrings.requestDateAndRegistrationNumber}: <b>{dateAndRegistrationNumber}</b></p>
        <p>{mpStrings.requestInitiator}: <b>{initiator}</b></p>
        <p>{mpStrings.requestParticipants}: <b>{participants}</b></p>
        <p>{mpStrings.requestAddressee}: <b>{addressee}</b></p>
        <p>{mpStrings.requestInfo}: <b>{info}</b></p>
        <hr/>
        <h2>{mpStrings.answer}</h2>
        <p>{mpStrings.requestDateAndRegistrationNumber}: <b>{answerDateAndRegistrationNumber}</b></p>
        <p>{mpStrings.requestAnswerInfo}: <b>{answerInfo}</b></p>
        {shareButtonsJSX}
      </div>
    );
  }
}
