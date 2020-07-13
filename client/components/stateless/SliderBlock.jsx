import React, {Component} from 'react';

import {cookie} from '../../lib/coreLib.js';

export default class SliderBlock extends Component {
  componentDidMount() {
    $.getScript('custom/js/slider/owl.carousel.min.js', () => {
      const $sb = $(this.sb);

      $sb.owlCarousel({
          loop: true,
          items: 1,
          margin: 0,
          nav: true,
          pagination: true,
          navText: ["<", ">"],
          responsive: {
              0: {
                  items: 2
              },
              960: {
                  items: 5
              }
          }
      });

      $sb.css('opacity', '');
    });
  }

  render() {

    const lang = cookie.get('lang') === 'ru' ? 'rus' : 'kaz',
          langShort = cookie.get('lang');

    return (
      <div style={{opacity: 0}} ref={(sb)=>{this.sb = sb;}} id="slider-block" className="slider-bottom">
        <div className="item">
          <a href="http://www.akorda.kz/kz" target="_blank">
            <img src="/custom/img/slider/slider1.png" />
          </a>
        </div>
        <div className="item">
          <a href={`http://fms.kz/index.php/${langShort}/`} target="_blank">
            <img src={`/custom/img/slider/slider9-${langShort}.jpg`} />
          </a>
        </div>
        <div className="item">
          <a href="http://www.astanatv.kz/" target="_blank">
            <img src="/custom/img/slider/slider2.png" />
          </a>
        </div>
        <div className="item">
          <a href="http://www.nurmedia.kz/" target="_blank">
            <img src="/custom/img/slider/slider3.jpg" />
          </a>
        </div>
        <div className="item">
          <a href="http://aikyn.kz" target="_blank">
            <img src="/custom/img/slider/slider5.png" />
          </a>
        </div>
        <div className="item">
          <a href="http://www.zhasotan.kz/ru" target="_blank">
            <img src="/custom/img/slider/slider4.jpg" />
          </a>
        </div>
        <div className="item">
          <a href="https://liter.kz/" target="_blank">
            <img src="/custom/img/slider/slider7.png" />
          </a>
        </div>
        <div className="item">
          <a href={`http://spm.nurotan.kz/${lang}/`} target="_blank">
            <img src="/custom/img/slider/slider8.png" />
          </a>
        </div>
        <div className="item">
          <a href={`http://cpass.kz/index.php/`} target="_blank">
            <img src="/custom/img/slider/slider9.png" />
          </a>
        </div>
      </div>
    );
  }
}
