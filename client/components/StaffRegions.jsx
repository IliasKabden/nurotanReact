import React, {Component} from 'react';
import InnerSearchBarStateless from './stateless/InnerSearchBarStateless.jsx';

export default class StaffRegions extends Component {
  render() {
    const {mpStrings} = this.props;

    return(
      <div>
        {this.props.header}
        {/* Main*/}
        <div id="main" className="all-video-page">
          <div id="theme-blog" className="theme-search city center">
            <div className="left-theme">
              <h1 className="paper">{mpStrings.staffRegions.toUpperCase()}</h1>
            </div>
            <div className="right-theme">
              <InnerSearchBarStateless search={mpStrings.search} searchButton={mpStrings.searchButton} />
            </div>
            <div className="clearfix" />
          </div>
          <div className="center">
            <h2 className="green">{mpStrings.staffRegions.toUpperCase()}</h2>
            <div className="table-grey">
              <table id="deputy-requests-table">
                <thead>
                  <tr className="header">
                    <th width={200}>{mpStrings.regions}</th>
                    <th width={450}>{mpStrings.files}</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.staffRegionsJSX}
                </tbody>
              </table>
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
