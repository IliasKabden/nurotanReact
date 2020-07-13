import React, {Component} from 'react';

export default class StructureTabCentralOffice extends Component {
  render() {
    const {lang, centralOffice} = this.props;

    return (
      <div className="cell-8 small-cell-12 leadership-page">
        <div dangerouslySetInnerHTML={{__html: centralOffice[lang]}} />
      </div>
    );
  }
}
