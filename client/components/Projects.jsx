import React, {Component} from 'react';
import {Link} from 'react-router';
import InnerSearchBarStateless from './stateless/InnerSearchBarStateless.jsx';

export default class Projects extends Component {
  render() {
    const {projects, lang, mpStrings} = this.props,
          projectsJSX = projects.map((project, index) => {
            return (
              <div className="purchase-block cell-4 text-center projects-custom">
                <div className="projects">
                  <Link to={"/single-project?id=" + project._id}>
                    <img src={project.photo} alt="Проект" />
                  </Link>
                </div>
                <p className="grey uppercase">
                  <Link to={"/single-project?id=" + project._id}>
                    {project.title[lang]}
                  </Link>
                </p>
              </div>
            );
          });

    return(
      <div>
        {this.props.header}
        {/* Main*/}
        <div id="main" className="all-video-page">
          {/*Theme blog*/}
          <div id="theme-blog" className="theme-search center">
            <div className="left-theme">
              <h1 className="purchase">{mpStrings.projects.toUpperCase()}</h1>
            </div>
            <div className="right-theme">
              <InnerSearchBarStateless search={mpStrings.search} searchButton={mpStrings.searchButton} />
            </div>
            <div className="clearfix" />
          </div>
          {/*Theme block*/}
          <div id="theme" className="theme center">
            <ul>
              <li><span className="active">{mpStrings.allProjects}</span></li>
              <div className="clearfix" />
            </ul>
          </div>
          {/*End theme block*/}
          {/*Main video*/}
          <div id="main-video" className="center">
            <div className="content-news">
              <div id="blog" className="cell-12">
                {projectsJSX}
              </div>
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
      </div>
    );
  }
}
