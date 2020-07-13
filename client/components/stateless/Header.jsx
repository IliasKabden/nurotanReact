import React, { Component } from 'react';

import { Link } from 'react-router';
import { prepareBurger, addLink } from '../../lib/coreLib.js';

import { browserHistory } from 'react-router';

export default class Header extends Component {
  componentDidMount() {
    prepareBurger();

    document.addEventListener('copy', addLink);
  }

  searchButtonHandler(e) {
    if (e.keyCode == 13) {
      browserHistory.push('/search?expression=' + e.currentTarget.value);
    }
  }

  render() {
    const { mpStrings, lang } = this.props;
    let visuallyImpairedButtonHandler;

    let pathname;

    if (Meteor.isServer) {
      pathname = this.props.pathname;
    }
    else {
      window.location.pathname.substring(1);
    }

    if (!this.props.visuallyImpairedButtonHandler)
      visuallyImpairedButtonHandler = function () {

      };
    else
      visuallyImpairedButtonHandler = this.props.visuallyImpairedButtonHandler;

    const mainBanner = {
      kazakhstan: { ru: "Казахстан", kz: "Қазақстан" },
      unity: { ru: "Единство.", kz: "Бірлік." },
      stability: { ru: "Стабильность.", kz: "Тұрақтылық." },
      creating: { ru: "Созидание.", kz: "Жасампаздық." },
      electionProgram: { ru: "Предвыборная программа", kz: "”НҰР ОТАН” партиясының" },
      party: { ru: 'Партии "НҰР ОТАН"', kz: "бағдарламасы" }
    };

    const leaderTopText = {
      leader: { ru: "ЛИДЕР", kz: "ПАРТИЯ" },
      party: { ru: "ПАРТИИ", kz: "ТӨРАҒАСЫ" },
      nazarbaev: { ru: "Н.А.Назарбаев", kz: "Н.Ә.Назарбаев" }
    };

    return (
      <header>
        <div className="banner">
          <div id="main-banner">
            <h2 className="uppercase text-left">{mainBanner.kazakhstan[lang]}</h2>
            <h2 className="yellow-block text-left">2021</h2>
            <h2 className="uppercase text-left">{mainBanner.unity[lang]}</h2>
            <h2 className="uppercase text-left">{mainBanner.stability[lang]}</h2>
            <h2 className="uppercase text-left">{mainBanner.creating[lang]}</h2>
            <h2 className="white uppercase text-left">{mainBanner.electionProgram[lang]} <br /> {mainBanner.party[lang]}</h2>
            <img src="/custom/img/icons/top-arrow.png" className="top-arrow" alt />
          </div>
        </div>
        <article id="menu-block">
          <div id="logo" className="cell-2">
            <Link to="/"><img src={"custom/img/logo.png"} alt="Нур отан логотип" /></Link>
          </div>
          <div className="on-menu cell-10">
            <div className="left-on-menu">
              <div className="block-top-right">
                <span className="language">
                  <i onClick={() => this.props.setLang('kz')} className={this.props.lang === 'kz' ? "active" : ""}>KZ</i>
                  <i onClick={() => this.props.setLang('ru')} className={this.props.lang === 'ru' ? "active" : ""}>RU</i>
                  {/* <i>EN</i> */}
                </span>
                <span>
                  <Link onClick={visuallyImpairedButtonHandler} to="#"><img src="custom/img/icons/glasses.png" alt="glasses" /></Link>
                </span>
                <span id="header-social-buttons">
                  <Link title="фэйсбук" to="https://www.facebook.com/nurotan.kz" target="_blank"><i className="fa fa-facebook-square"></i></Link>&nbsp;
                  <Link title="твиттер" to="https://twitter.com/Nur_Otan" target="_blank"><i className="fa fa-twitter-square"></i></Link>&nbsp;
                  <Link title="инстаграм" to="https://www.instagram.com/nur_otan/" target="_blank"><i className="fa fa-instagram"></i></Link>&nbsp;
                  <Link title="ютуб" to="https://www.youtube.com/channel/UCFSxyV97uoGMR4ztETM66vw" target="_blank"><i className="fa fa-youtube-square"></i></Link>
                </span>
                <span id="header-link-hot-line">
                  <Link to="hot-line"><i className="fa fa-phone-square"></i> {mpStrings.hotLine}</Link>
                </span>
              </div>
            </div>
            <div className="right-on-menu">
              <div className="block-top-right right">
                <input onKeyDown={this.searchButtonHandler.bind(this)} type="text" placeholder={mpStrings.search + "..."} className="search" />
              </div>
            </div>
          </div>
          <div className="menu dropdown dropdown-inline">
            <ul className="big-menu">
              <li>
                <Link to="/" className={pathname === "" ? "active" : ""}>{mpStrings.home}</Link>
              </li>
              <li id="long-menu"><a href="#"
                className={[
                  "leader", "party-history", "charter", "ppo",
                  "leadership", "code", "structure", "party-curators",
                  "press", "projects", "purchase", "financial-report",
                  "vacancies", "contacts", "hot-line"].indexOf(pathname) > -1 ? "active" : ""}>{mpStrings.party}</a>
                <ul className="lv-1">
                  <li><Link to="party-history">{mpStrings.history}</Link></li>
                  <li><a href="leader?tab=0">{mpStrings.partyLeader} <span className="arrow-menu"> > </span></a>
                    <ul className="lv-2">
                      <li><a href="leader?tab=1">{mpStrings.performances}</a></li>
                      <li><a href="leader?tab=2">{mpStrings.messages}</a></li>
                      <li><a href="leader?tab=3">{mpStrings.quotations}</a></li>
                      <li><a href="leader?tab=4">{mpStrings.photos}</a></li>
                    </ul>
                  </li>
                  <li><Link to="charter">{mpStrings.charter}</Link></li>
                  <li><Link to="ppo">{mpStrings.ppo}</Link></li>
                  <li><Link to="leadership">{mpStrings.leadership}</Link></li>
                  <li><Link to="code">{mpStrings.code}</Link></li>
                  <li><Link to="party-curators">{mpStrings.partyCurators}</Link></li>
                  <li><Link to="#">{mpStrings.structure} <span className="arrow-menu"> > </span></Link>
                    <ul className="lv-2">
                      <li><Link to="structure" query={{ tab: 0 }}>{mpStrings.bodies}</Link></li>
                      <li><Link to="structure" query={{ tab: 1 }}>{mpStrings.centralOffice}</Link></li>
                    </ul>
                  </li>
                  <li><Link to="press">{mpStrings.pressCenter}</Link></li>
                  <li><Link to="projects">{mpStrings.projects}</Link></li>
                  <li><Link to="purchase">{mpStrings.purchase}</Link></li>
                  <li><Link to="financial-report">{mpStrings.financialReport}</Link></li>
                  <li><Link to="vacancies">{mpStrings.vacancies}</Link></li>
                  <li><Link to="contacts">{mpStrings.contacts}</Link></li>
                  <li><Link to="hot-line">{mpStrings.hotLine}</Link></li>
                  <li><Link to="#">{mpStrings.staffReserve} <span className="arrow-menu"> > </span></Link>
                    <ul className="lv-2">
                      <li><Link to="staff-regions">{mpStrings.staffRegions}</Link></li>
                      <li><Link to="staff-competetions">{mpStrings.staffCompetetions}</Link></li>
                      <li><Link to="staff-List">{mpStrings.staffList}</Link></li>
                      <li><Link to="#">{mpStrings.staffRespublic} <span className="arrow-menu">></span></Link>
                        <ul className="lv-2">
                          <li><Link to="staff-Instructions">{mpStrings.staffInstructions}</Link></li>
                          <li><Link to="staff-reservist">{mpStrings.staffReservist}</Link></li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li><a className={[
                "fraction", "fraction-board", "fraction-leadership",
                "fraction-news", "fraction-multimedia", "deputy-requests"].indexOf(pathname) > -1 ? "active" : ""} href="#">{mpStrings.fraction}</a>
                <ul className="lv-1">
                  <li><Link to="fraction">{mpStrings.aboutFraction}</Link></li>
                  <li><Link to="fraction-board">{mpStrings.fractionBoard}</Link></li>
                  <li><Link to="fraction-leadership">{mpStrings.leadership}</Link></li>
                  <li><Link to="fraction-news">{mpStrings.fractionNews}</Link></li>
                  <li><Link to="deputy-requests">{mpStrings.deputyRequests}</Link></li>
                </ul>
              </li>
              <li><a className={[
                "news", "news", "news"].indexOf(pathname) > -1 ? "active" : ""} href="#">{mpStrings.news}</a>
                <ul className="lv-1">
                  <li><Link to="news" query={{ tab: 0 }}>{mpStrings.allNews}</Link></li>
                  <li><Link to="news" query={{ tab: 1 }}>{mpStrings.allArticles}</Link></li>
                  <li><Link to="news" query={{ tab: 2 }}>{mpStrings.pressReleases}</Link></li>
                </ul>
              </li>
              <li><a className={[
                "doctrine", "election-program",
                "anti-corruption-program"].indexOf(pathname) > -1 ? "active" : ""} href="#">{mpStrings.programDocuments}</a>
                <ul className="lv-1">
                  <li><Link to="doctrine">{mpStrings.doctrine}</Link></li>
                  <li><Link to="election-program">{mpStrings.electionProgram}</Link></li>
                  <li><Link to="anti-corruption-program">{mpStrings.antiCorruptionProgram}</Link></li>
                </ul>
              </li>
              <li><Link className={["regions"].indexOf(pathname) > -1 ? "active" : ""} to="regions">{mpStrings.regions}</Link></li>
              <li className="last"><Link to="#"><img src="custom/img/icons/burger.png" alt="burger" /></Link>
                <ul className="lv-1">
                  <li><a href="http://kk.nurotan.kz/">{mpStrings.publicReception}</a></li>
                  <li><Link to="site-map">{mpStrings.siteMap}</Link></li>
                  <li><Link to="#">{mpStrings.mediaGallery} <span className="arrow-menu"> > </span></Link>
                    <ul className="lv-2">
                      <li><Link to="photos">{mpStrings.photoGallery}</Link></li>
                      <li><Link to="all-videos">{mpStrings.videoGallery}</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="burger"><Link to="#"><img src="custom/img/icons/burger.png" alt="burger" /></Link></li>
            </ul>
            <ul className="small-menu">
              <li className="punkt-1"><Link to="/" className="active">{mpStrings.home}</Link></li>
              <li className="punkt-1 tree-menu"><Link to="#">{mpStrings.party} </Link>
                <ul className="lv-1">
                  <li><Link to="leader" query={{ tab: 0 }}>{mpStrings.partyLeader}</Link>
                    <ul className="lv-2">
                      <li><Link to="leader" query={{ tab: 1 }}>{mpStrings.performances}</Link></li>
                      <li><Link to="leader" query={{ tab: 2 }}>{mpStrings.messages}</Link></li>
                      <li><Link to="leader" query={{ tab: 3 }}>{mpStrings.quotations}</Link></li>
                      <li><Link to="leader" query={{ tab: 4 }}>{mpStrings.photos}</Link></li>
                    </ul>
                  </li>
                  <li><Link to="party-history">{mpStrings.history}</Link></li>
                  <li><Link to="charter">{mpStrings.charter}</Link></li>
                  <li><Link to="ppo">{mpStrings.ppo}</Link></li>
                  <li><Link to="leadership">{mpStrings.leadership}</Link></li>
                  <li><Link to="code">{mpStrings.code}</Link></li>
                  <li><Link to="structure" query={{ tab: 0 }}>{mpStrings.structure} - {mpStrings.bodies}</Link></li>
                  <li><Link to="structure" query={{ tab: 1 }}>{mpStrings.structure} - {mpStrings.centralOffice}</Link></li>
                  <li><Link to="party-curators">{mpStrings.partyCurators}</Link></li>
                  <li><Link to="press">{mpStrings.pressCenter}</Link></li>
                  <li><Link to="projects">{mpStrings.projects}</Link></li>
                  <li><Link to="purchase">{mpStrings.purchase}</Link></li>
                  <li><Link to="financial-report">{mpStrings.financialReport}</Link></li>
                  <li><Link to="vacancies">{mpStrings.vacancies}</Link></li>
                  <li><Link to="contacts">{mpStrings.contacts}</Link></li>
                  <li><Link to="hot-line">{mpStrings.hotLine}</Link></li>
                  <li><Link to="#">{mpStrings.staffReserve} </Link>
                    <ul className="lv-2">

                      <li><Link to="staff-regions">{mpStrings.staffRegions}</Link></li>
                      <li><Link to="staff-competetions">{mpStrings.staffCompetetions}</Link></li>

                      <li><Link to="staff-list">{mpStrings.staffList}</Link></li>
                      <li><Link to="staff-respublic">{mpStrings.staffRespublic}</Link></li>

                    </ul>
                  </li>
                </ul>
              </li>
              <li className="punkt-1 tree-menu"><a href="#">{mpStrings.fraction} </a>
                <ul className="lv-1">
                  <li><Link to="fraction">{mpStrings.aboutFraction}</Link></li>
                  <li><Link to="fraction-board">{mpStrings.fractionBoard}</Link></li>
                  <li><Link to="fraction-leadership">{mpStrings.leadership}</Link></li>
                  <li><Link to="fraction-news">{mpStrings.fractionNews}</Link></li>
                  <li><Link to="deputy-requests">{mpStrings.deputyRequests}</Link></li>
                </ul>
              </li>
              <li className="punkt-1 tree-menu"><a href="#">{mpStrings.news} </a>
                <ul className="lv-1">
                  <li><Link to="news" query={{ tab: 0 }}>{mpStrings.allNews}</Link></li>
                  <li><Link to="news" query={{ tab: 1 }}>{mpStrings.allArticles}</Link></li>
                  <li><Link to="news" query={{ tab: 2 }}>{mpStrings.pressReleases}</Link></li>
                </ul>
              </li>
              <li className="punkt-1 tree-menu"><a href="#">{mpStrings.programDocuments} </a>
                <ul className="lv-1">
                  <li><Link to="doctrine">{mpStrings.doctrine}</Link></li>
                  <li><Link to="election-program">{mpStrings.electionProgram}</Link></li>
                  <li><Link to="anti-corruption-program">{mpStrings.antiCorruptionProgram}</Link></li>
                </ul>
              </li>
              <li className="punkt-1"><Link to="regions">{mpStrings.regions}</Link></li>
              <li className="punkt-1"><a href="http://kk.nurotan.kz/">{mpStrings.publicReception}</a></li>
              <li className="punkt-1"><Link to="site-map">{mpStrings.siteMap}</Link></li>
              <li className="punkt-1 tree-menu"><a href="#">{mpStrings.mediaGallery} </a>
                <ul className="lv-1">
                  <li><Link to="photos">{mpStrings.photoGallery}</Link></li>
                  <li><Link to="all-videos">{mpStrings.videoGallery}</Link></li>
                </ul>
              </li>
            </ul>
          </div>
          <Link id="header-election-program-image-link" to="election-program"></Link>
          <Link id="header-leader-image-link" to="leader">{mpStrings.partyLeader[lang]}</Link>
          <div className="leader-top-text">
            <h3 id="item1" className="green uppercase">{leaderTopText.leader[lang]}</h3>
            <h3 id="item2" className="green uppercase">{leaderTopText.party[lang]}</h3>
            <h3 id="item3">{leaderTopText.nazarbaev[lang]}</h3>
          </div>
        </article>
      </header>
    );
  }
}
