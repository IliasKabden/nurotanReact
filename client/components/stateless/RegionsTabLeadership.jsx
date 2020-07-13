import React, {Component} from 'react';

export default class RegionsTabLeadership extends Component {
  render() {
    ;
    return (
      <div id="main-video" className="center">
        <div className="content-news" dangerouslySetInnerHTML={{__html: this.props.currentRegion.leadership[this.props.lang]}}>
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}
