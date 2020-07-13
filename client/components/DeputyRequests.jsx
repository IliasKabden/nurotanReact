import React, {Component} from 'react';
import InnerSearchBarStateless from './stateless/InnerSearchBarStateless.jsx';

export default class DeputyRequests extends Component {
  render() {
    const {mpStrings} = this.props;

    return(
      <div>
        {this.props.header}
        {/* Main*/}
        <div id="main" className="all-video-page">
          <div id="theme-blog" className="theme-search city center">
            <div className="left-theme">
              <h1 className="paper">{mpStrings.deputyRequests.toUpperCase()}</h1>
            </div>
            <div className="right-theme">
              <InnerSearchBarStateless search={mpStrings.search} searchButton={mpStrings.searchButton} />
            </div>
            <div className="clearfix" />
          </div>
          <div className="center">
            <h2 className="green">{mpStrings.deputyRequests.toUpperCase()}</h2>
            <div className="table-grey">
              <table id="deputy-requests-table">
                <thead>
                  <tr className="header">
                    <th width={200}>{mpStrings.requestParticipants}</th>
                    <th width={450}>{mpStrings.requestDateAndRegistrationNumber}</th>
                    <th>{mpStrings.request}</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.deputyRequestsJSX}
                </tbody>
              </table>
              <button
                className="load-more"
                type="button"
                onClick={this.props.deputyRequestsLoadMoreHandler}
              >
                {mpStrings.loadMore}
              </button>
            </div>
          </div>
          {this.props.sliderBlock}
        </div>
        {/* End Main */}
        {this.props.footer}
        {/*Start increase and decrease*/}
        <div id="font-block-fixed">
          <button id="increase">+</button><br />
          <button id="decrease">-</button>
        </div>
        {/*End increase and decrease*/}
      </div>
    );
  }
}
