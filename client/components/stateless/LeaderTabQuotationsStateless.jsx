import React, {Component} from 'react';

export default class LeaderTabLeaderStateless extends Component {
  render() {
    const {quotations, lang} = this.props,
          quotationsJSX = quotations.map((quotation, index) => {
            return (
              <div key={index} className="quotations-article" dangerouslySetInnerHTML={{__html: quotation.text[lang]}}>
              </div>
            );
          });

    return (
      <section className="green-block-color">
        <div className="quotations">
          <div className="quotations-content">
            {quotationsJSX}
          </div>
        </div>
        <div className="clearfix" />
      </section>
    );
  }
}
