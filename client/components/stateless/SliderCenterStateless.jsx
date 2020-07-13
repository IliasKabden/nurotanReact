import React, {Component} from 'react';
import {addScript, keepRunningTillLoaded} from '../../lib/coreLib.js';
import { Link } from 'react-router';
import {cookie} from '/client/lib/coreLib.js';

export default class SliderCenterStateless extends Component {
  componentDidMount() {
    $.getScript('/custom/js/slider/owl.carousel.min.js', () => {
      $('#slider-center .item.premount').removeClass('premount');

      $(this.sc).owlCarousel({
         loop: true,
         items: 1,
         margin: 10,
         nav: true,
         pagination: true,
         navText: ["<", ">"],
         responsive: {
             0: {
                 items: 2
             },
             960: {
                 items: 3
             }
         }
     });

     this.props.context.setState({sliderActiveTab: 0});
    });
  }

  render() {
    const {projects, sliderActiveTab, context} = this.props,
          lang = cookie.get('lang'),
          projectsJSX = projects.map((project) => {
            return (
              <div key={project._id} className="item premount">
                <Link to={"/single-project?id="+project._id}><img src={project.photo + "-/scale_crop/211x164/"} alt={project.title} /></Link>
              </div>
            );
          });
    return (
      <div id="slider-center" className="project-custom">
        <h2>
          <a
            href="#"
            onClick={e => {e.preventDefault(); context.setState({sliderActiveTab: 0})}}
            className="articles-theme-button"
            style={{color: ''}}
          >
            <i>
              {this.props.mpStrings.projects}
            </i>
          </a>{'  '}
        </h2>
        <div
          style={{display: sliderActiveTab === 0 ? '' : 'none'}}
          ref={(sc) => {this.sc = sc;}}
          className="columns-project"
        >
          {projectsJSX}
        </div>
      </div>
    );
  }
}
