import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Leader extends Component {
  render() {
    const {setActiveSection, activeSectionNumber, mpStrings} = this.props;

    return(
      <div>
        {this.props.header}
        {/* Main*/}
        <div id="main">
          <div className="theme-bg-green center">
            <h1>{mpStrings.partyLeader}  {mpStrings.nazarbaev}</h1>
          </div>
          <div ref={(tabs) => {this.tabs = tabs}} className="tabs leader-page center" data-tabs>
            <ul id="tabs-click" className="tab-article">
              <li className={activeSectionNumber === 0 ? "active" : ""}>
                <Link to="leader" query={{tab: 0}}>{mpStrings.partyLeader}</Link>
              </li>
              <li className={activeSectionNumber === 1 ? "active" : ""}>
                <Link to="leader" query={{tab: 1}}>{mpStrings.performances}</Link>
              </li>
              <li className={activeSectionNumber === 2 ? "active" : ""}>
                <Link to="leader" query={{tab: 2}}>{mpStrings.messages}</Link>
              </li>
              <li className={activeSectionNumber === 3 ? "active" : ""}>
                <Link to="leader" query={{tab: 3}}>{mpStrings.quotations}</Link>
              </li>
              <li className={activeSectionNumber === 4 ? "active" : ""}>
                <Link to="leader" query={{tab: 4}}>{mpStrings.photos}</Link>
              </li>
            </ul>
            {/*Leader tabs content*/}
            {this.props.activeSection}
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
