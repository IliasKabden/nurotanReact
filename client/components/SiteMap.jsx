import React, {Component} from 'react';
import {Link} from 'react-router';
import InnerSearchBarStateless from './stateless/InnerSearchBarStateless.jsx';

export default class SiteMap extends Component {
  render() {
    const {mpStrings} = this.props;

    return (
      <div>
        {this.props.header}
        {/* End Header block */}
        {/* Main*/}
        <div id="main" className="hot-line-page">
          {/*Theme blog*/}
          <div id="theme-blog" className="theme-search city center">
            <div className="left-theme">
              <h1 className="paper">{mpStrings.siteMap.toUpperCase()}</h1>
            </div>
            <div className="right-theme">
              <InnerSearchBarStateless search={mpStrings.search} searchButton={mpStrings.searchButton} />
            </div>
            <div className="clearfix" />
          </div>
          {/*Main video*/}
          <div id="main-video" className="center">
            <div className="content-news">
              <div id="blocks-news" className="cell-8">
                <div className="cell-4">
                  <h3>{mpStrings.home}</h3>
                  <ul className="maps-site">
                    <li><Link to="/">{mpStrings.home}</Link></li>
                  </ul>
                  <h3>{mpStrings.party}</h3>
                  <ul className="maps-site">
                    <li><Link to="party-leader">{mpStrings.partyLeader}</Link></li>
                    <li><Link to="party-history">{mpStrings.partyHistory}</Link></li>
                    <li><Link to="charter">{mpStrings.charter}</Link></li>
                    <li><Link to="ppo">{mpStrings.ppo}</Link></li>
                    <li><Link to="leadership">{mpStrings.leadership}</Link></li>
                    <li><Link to="code">{mpStrings.code}</Link></li>
                    <li><Link to="structure">{mpStrings.structure}:</Link></li>
                    <li><Link to="press">{mpStrings.pressCenter}</Link></li>
                    <li><Link to="projects">{mpStrings.projects}</Link></li>
                    <li><Link to="purchase">{mpStrings.purchase}</Link></li>
                    <li><Link to="financial-report">{mpStrings.financialReport}</Link></li>
                    <li><Link to="vacancies">{mpStrings.vacancies}</Link></li>
                    <li><Link to="contacts">{mpStrings.contacts}.</Link></li>
                    <li><Link to="hot-line">{mpStrings.hotLine}.</Link></li>
                  </ul>
                </div>
                <div className="cell-4">
                  <h3>{mpStrings.fraction}</h3>
                  <ul className="maps-site">
                    <li><Link to="fraction">{mpStrings.aboutFraction}</Link></li>
                    <li><Link to="fraction-board">{mpStrings.fractionBoard}</Link></li>
                    <li><Link to="fraction-leadership">{mpStrings.leadership}</Link></li>
                    <li><Link to="fraction-news">{mpStrings.fractionNews}</Link></li>
                  </ul>
                  <h3>{mpStrings.programDocuments}</h3>
                  <ul className="maps-site">
                    <li><Link to="doctrine">{mpStrings.doctrine}</Link></li>
                    <li><Link to="election-program">{mpStrings.electionProgram}</Link></li>
                    <li><Link to="anti-corruption-program">{mpStrings.antiCorruptionProgram}</Link></li>
                  </ul>
                  <h3>{mpStrings.regions}</h3>
                  <ul className="maps-site">
                    <li><Link to="regions">{mpStrings.regions}</Link></li>
                  </ul>
                  <h3>{mpStrings.publicReception}</h3>
                  <ul className="maps-site">
                    <li><Link to="http://kk.nurotan.kz/">{mpStrings.publicReception}</Link></li>
                  </ul>
                  <h3>{mpStrings.siteMap}</h3>
                  <ul className="maps-site">
                    <li><Link to="site-map">{mpStrings.siteMap}</Link></li>
                  </ul>
                  <h3>Медиа галерея</h3>
                  <ul className="maps-site">
                    <li><Link to="photos">Фотогалерея</Link></li>
                    <li><Link to="videos">Видеогалерея</Link></li>
                  </ul>
                </div>
                <div className="cell-4">
                  <h3>{mpStrings.news}</h3>
                  <ul className="maps-site">
                    <li><Link to="news?tab=0">{mpStrings.allNews}</Link></li>
                    <li><Link to="news?tab=1">{mpStrings.allArticles}</Link></li>
                    <li><Link to="news?tab=2">{mpStrings.pressReleases}</Link></li>
                  </ul>
                </div>
              </div>
              <div id="blog" className="cell-4">
                <div className="cell-12">
                  {this.props.enterPartyButtonJSX}
                  {this.props.publicReceptionJSX}
                </div>
              </div>
              <div className="clearfix" />
            </div>
          </div>
          {/*End main video*/}
          {this.props.sliderBlock}
        </div>
        {/* End Main */}
        {this.props.footer}
        {/*Start increase and decrease*/}
        <div id="font-block-fixed">
          <button id="increase">+</button><br />
          <button id="decrease">-</button>
        </div>
      </div>
    );
  }
}
