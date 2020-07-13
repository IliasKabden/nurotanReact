import React, {Component} from 'react';
import moment from '../../lib/moment-with-locales.min.js';
import {addScript, qs, qsa} from '../../lib/coreLib.js';

import {Link} from 'react-router';

export default class VideosStateless extends Component {
  setCarousel() {
    $.getScript('custom/js/slider/owl.carousel.min.js', () => {
      $(this.cv).owlCarousel({
          loop: false,
          items: 1,
          margin: 10,
          nav: true,
          pagination: true,
          navText: ["<", ">"],
          responsive: {
              0: {
                  items: 1
              },
              960: {
                  items: 3
              }
          }
      });

      $('.video-title').dotdotdot();
    });
  }

  componentDidMount() {
    localStorage.setItem('sliderVideoNum', qsa('.video.item').length);

    $('.video.item').css('display', '');
    this.setCarousel();
  }

  componentDidUpdate() {
    const videoItems = qsa('.video.item'),
          cv = this.cv;

    if(parseInt(localStorage.getItem('sliderVideoNum')) === videoItems.length)
      return ;

    cv.innerHTML = "";
    cv.className = "columns-video";

    for(let i = 0, len = videoItems.length; i < len; i++) {
      cv.appendChild(videoItems[i]);
    }

    this.setCarousel();
  }

  render() {
    const {videos, lang} = this.props;

    const videosJSX = videos.slice(0, 6).map((video, index) => {
      const youtubeVideoId = video.url[lang].split('=')[1];

      moment.locale(lang);
      const date = moment(video.createdAt).format('LL');

      return (
        <div className="video item" key={index} style={{display: 'none'}}>
          <iframe
            allowFullScreen="allowfullscreen"
            src={"http://www.youtube.com/embed/"+youtubeVideoId+"?enablejsapi=1&origin=nurotan.org"}
            frameBorder="0"
            width={352}
            height={280}>
          </iframe>
           <span className="date">
            <strong><i>{date}</i></strong>
          </span>
          <div className="clearfix"></div>
          <p
            className="video-title"
            title={video.title[lang]}
            style={{height: '4.3em'}}>
              {video.title[lang]}
          </p>
        </div>
      );
    });

    return (
      <div id="videos" style={{height: '500px'}}>
        <h2><Link to="/all-videos"><i>Видео</i></Link></h2>
        <div ref={(cv) => {this.cv = cv}} className="columns-video">
          {videosJSX}
        </div>
      </div>
    );
  }
}
