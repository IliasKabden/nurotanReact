import React, {Component} from 'react';

export default class RegionsTabContacts extends Component {
  render() {
    return (
      <div id="main-video" className="center">
        <div className="content-news">
          <div id="blog" className="cell-12 none-margin-top">
            <div className="description-topic">
              <p>
                <span className="black uppercase large-text">{this.props.currentRegion.contactsTitle[this.props.lang]}</span>
              </p>
            </div>
            <div dangerouslySetInnerHTML={{__html: this.props.currentRegion.contacts[this.props.lang]}}>
            </div>
          </div>
          <div className="clearfix" />
        </div>
      </div>
    );
  }
}
