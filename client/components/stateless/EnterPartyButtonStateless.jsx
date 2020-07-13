import React, {Component} from 'react';

export default class EnterPartyButtonStateless extends Component {
  render() {
    const {lang} = this.props;

    const partia = {
      ru: [<h3 key="0" className="white uppercase">Вступить</h3>, <h2 key="1" className="white uppercase">в партию</h2>],
      kz: [<h2 key="0" className="white uppercase">Партияға</h2>, <h3 key="1" className="white uppercase">өту</h3>]
    }

    return (
      <a href="http://portal.nurotan.kz/ru/cbdu_request" className="partia">
        {partia[lang]}
      </a>
    );
  }
}
