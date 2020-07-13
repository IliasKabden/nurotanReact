import React, {Component} from 'react';
import {browserHistory} from 'react-router';

export default class InnerSearchBarStateless extends Component {
  searchButtonHandler(e) {
    browserHistory.push(`/search?expression=${this.sf.value}`)
  }

  render() {
    const {search, searchButton} = this.props;

    return (
      <div>
        <input type="text" ref={(sf) => {this.sf = sf;}} id="search-field" placeholder={search + "..."} />
        <button onClick={this.searchButtonHandler.bind(this)} type="button">{searchButton}</button>
      </div>
    );
  }
}
