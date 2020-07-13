import React, {Component} from 'react';
import {cookie, addStyle, removeStyle} from '../../lib/coreLib.js';

export default class VisuallyImpairedBlock extends Component {

  componentDidMount() {

  }

  componentDidUpdate() {
    var dmcookiesimg = cookie.get("uGostimgfordk");
    if (dmcookiesimg == 'imgnone') {
        jQuery(document).ready(function() {
            jQuery("img").addClass("none");
            jQuery("a.dmdisableimage").addClass("dmimageActive");
            jQuery("a.dmenableimage").removeClass("dmimageActive");
            jQuery('div, span, body, table, td, tr, a, li, ul').css({
                background: 'none'
            });
        });

    } else {
        jQuery(document).ready(function() {
            jQuery("img").removeClass("none");
            jQuery("a.dmenableimage").addClass("dmimageActive");
            jQuery("a.dmdisableimage").removeClass("dmimageActive");
            jQuery('div, span, body, table, td, tr, a, li, ul').css({
                background: ''
            });
        });

        const haveDynamicBg = $('[data-background]');
        haveDynamicBg.css('background', haveDynamicBg.attr('data-background'));
    }

    var dmcookiesfont = cookie.get("uGostfontfordk");

    if (dmcookiesfont == 'fontsize1' || dmcookiesfont == 'fontsize0') { //fontsize1 имеется в виду 14px
        //делаем все в 14 пикселях
        jQuery("body, div, p, span, h3, a, table, td, tr, tbody, thead, header, footer, section, li, ul").css("fontSize", "14px");
        jQuery("h1").css("fontSize", "16px");
        jQuery("h2").css("fontSize", "15px");
        jQuery("#infobardm, .dmchangea1, .dmchangea2, .dmchangea3, .dmdisableimage, .dmenableimage, .dmcolor1, .dmcolor2, .dmcolor3, .dmcolor4").css("fontSize", "14px");

        //делаем отступы в 30px
        jQuery("body, div, p, span, h3, a, table, td, tr, tbody, thead, header, footer, section, li, ul").css("line-height", "30px");
        jQuery("h1").css("line-height", "30px");
        jQuery("h2").css("line-height", "30px");
        jQuery("#infobardm, .dmchangea1, .dmchangea2, .dmchangea3, .dmdisableimage, .dmenableimage, .dmcolor1, .dmcolor2, .dmcolor3, .dmcolor4").css("line-height", "30px");

        //выделяем текущий пункт
        jQuery(document).ready(function() {
            jQuery("a.dmchangea2").removeClass("dmchangeaActive");
            jQuery("a.dmchangea1").addClass("dmchangeaActive");
            jQuery("a.dmchangea3").removeClass("dmchangeaActive");
        });
    } else {
        if (dmcookiesfont == 'fontsize2') { //fontsize2 имеется в виду 18px
            //делаем все в 27 пикселях
            jQuery("body, div, p, span, h3, a, table, td, tr, tbody, thead, header, footer, section, li, ul").css("fontSize", "18px");
            jQuery("h1").css("fontSize", "20px");
            jQuery("h2").css("fontSize", "19px");
            jQuery("#infobardm, .dmchangea1, .dmchangea2, .dmchangea3, .dmdisableimage, .dmenableimage, .dmcolor1, .dmcolor2, .dmcolor3, .dmcolor4").css("fontSize", "18px");

            //делаем отступы в 35px
            jQuery("body, div, p, span, h3, a, table, td, tr, tbody, thead, header, footer, section, li, ul").css("line-height", "35px");
            jQuery("h1").css("line-height", "35px");
            jQuery("h2").css("line-height", "35px");
            jQuery("#infobardm, .dmchangea1, .dmchangea2, .dmchangea3, .dmdisableimage, .dmenableimage, .dmcolor1, .dmcolor2, .dmcolor3, .dmcolor4").css("line-height", "35px");

            //выделяем текущий пункт
            jQuery(document).ready(function() {
                jQuery("a.dmchangea2").addClass("dmchangeaActive");
                jQuery("a.dmchangea1").removeClass("dmchangeaActive");
                jQuery("a.dmchangea3").removeClass("dmchangeaActive");
            });
        } else {
            if (dmcookiesfont == 'fontsize3') { //fontsize3 имеется в виду 23px
                //делаем все в 27 пикселях
                jQuery("body, div, p, span, h3, a, table, td, tr, tbody, thead, header, footer, section, li, ul").css("fontSize", "23px");
                jQuery("h1").css("fontSize", "25px");
                jQuery("h2").css("fontSize", "24px");
                jQuery("#infobardm, .dmchangea1, .dmchangea2, .dmchangea3, .dmdisableimage, .dmenableimage, .dmcolor1, .dmcolor2, .dmcolor3, .dmcolor4").css("fontSize", "18px");

                //делаем отступы в 40px
                jQuery("body, div, p, span, h3, a, table, td, tr, tbody, thead, header, footer, section, li, ul").css("line-height", "40px");
                jQuery("h1").css("line-height", "40px");
                jQuery("h2").css("line-height", "40px");
                jQuery("#infobardm, .dmchangea1, .dmchangea2, .dmchangea3, .dmdisableimage, .dmenableimage, .dmcolor1, .dmcolor2, .dmcolor3, .dmcolor4").css("line-height", "40px");

                //выделяем текущий пункт
                jQuery(document).ready(function() {
                    jQuery("a.dmchangea2").removeClass("dmchangeaActive");
                    jQuery("a.dmchangea1").removeClass("dmchangeaActive");
                    jQuery("a.dmchangea3").addClass("dmchangeaActive");
                });
            }
            else {
              jQuery("body, div, p, span, h3, a, table, td, tr, tbody, thead, header, footer, section, li, ul").css("fontSize", "");
              jQuery("h1").css("fontSize", "");
              jQuery("h2").css("fontSize", "");
              jQuery("#infobardm, .dmchangea1, .dmchangea2, .dmchangea3, .dmdisableimage, .dmenableimage, .dmcolor1, .dmcolor2, .dmcolor3, .dmcolor4").css("fontSize", "");

              //делаем отступы в 40px
              jQuery("body, div, p, span, h3, a, table, td, tr, tbody, thead, header, footer, section, li, ul").css("line-height", "");
              jQuery("h1").css("line-height", "");
              jQuery("h2").css("line-height", "");
              jQuery("#infobardm, .dmchangea1, .dmchangea2, .dmchangea3, .dmdisableimage, .dmenableimage, .dmcolor1, .dmcolor2, .dmcolor3, .dmcolor4").css("line-height", "");

              //выделяем текущий пункт
              jQuery(document).ready(function() {
                  jQuery("a.dmchangea2").removeClass("dmchangeaActive");
                  jQuery("a.dmchangea1").removeClass("dmchangeaActive");
                  jQuery("a.dmchangea3").addClass("dmchangeaActive");
              });
            }
        }
    }

    var dmcookiescolor = cookie.get("uGostcolorfordk");

    if (dmcookiescolor == 'color1') {
        addStyle({href: '/custom/css/ucoz/style2.css'});
        removeStyle({href: '/custom/css/ucoz/style1.css'});
        removeStyle({href: '/custom/css/ucoz/style3.css'});
    }
    else if (dmcookiescolor == 'color2') {
        addStyle({href: '/custom/css/ucoz/style1.css'});
        removeStyle({href: '/custom/css/ucoz/style3.css'});
        removeStyle({href: '/custom/css/ucoz/style2.css'});
    }
    else if (dmcookiescolor == 'color3') {
        addStyle({href: '/custom/css/ucoz/style3.css'});
        removeStyle({href: '/custom/css/ucoz/style2.css'});
        removeStyle({href: '/custom/css/ucoz/style1.css'});
    }
    else {
        removeStyle({href: '/custom/css/ucoz/style3.css'});
        removeStyle({href: '/custom/css/ucoz/style2.css'});
        removeStyle({href: '/custom/css/ucoz/style1.css'});
    }
  }

  dmdisableimage(){
    jQuery('img').css({
        display: 'none'
    });
    jQuery('div').css({
        background: 'none'
    });
    jQuery('span').css({
        background: 'none'
    });
    jQuery('body').css({
        background: 'none'
    });
    cookie.set("uGostimgfordk", "imgnone", "Mon, 01-Jan-2018 00:00:00 GMT", "/");
    this.forceUpdate()
  }

  dmenableimage(){
    jQuery('img').css({
        display: 'inherit'
    });
    jQuery("img").addClass("");
    cookie.set("uGostimgfordk", "imgyes", "Mon, 01-Jan-2018 00:00:00 GMT", "/");
    this.forceUpdate()
  }

  dmcolor1(){
    cookie.set("uGostcolorfordk", "color1", "Mon, 01-Jan-2018 00:00:00 GMT", "/");
    this.forceUpdate()
  }

  dmcolor2(){
    cookie.set("uGostcolorfordk", "color2", "Mon, 01-Jan-2018 00:00:00 GMT", "/");
    this.forceUpdate()
  }

  dmcolor3(){
    cookie.set("uGostcolorfordk", "color3", "Mon, 01-Jan-2018 00:00:00 GMT", "/");
    this.forceUpdate()
  }

  dmreset(){
    cookie.set("uGostfontfordk", "", "Mon, 01-Jan-2010 00:00:00 GMT", "/");
    cookie.set("uGostimgfordk", "", "Mon, 01-Jan-2010 00:00:00 GMT", "/");
    cookie.set("uGostcolorfordk", "", "Mon, 01-Jan-2010 00:00:00 GMT", "/");
      //новое в версии 1.2
    cookie.set("uGostSettings", "", "Mon, 01-Jan-2010 00:00:00 GMT", "/");
    //новое в версии 1.2
    this.forceUpdate();
  }

  dmhide() {
    cookie.set("uGostfontfordk", "", "Mon, 01-Jan-2010 00:00:00 GMT", "/");
    cookie.set("uGostimgfordk", "", "Mon, 01-Jan-2010 00:00:00 GMT", "/");
    cookie.set("uGostcolorfordk", "", "Mon, 01-Jan-2010 00:00:00 GMT", "/");
    cookie.set("uGostSettings", "", "Mon, 01-Jan-2010 00:00:00 GMT", "/");
    location.reload();
  }

  render() {
    return (
      <div ref={(ib) => {this.ib = ib}} style={{display: 'none'}} id="infobardm">
        Изображения <a onClick={this.dmdisableimage.bind(this)} className="dmdisableimage">Выключить</a>
        <a onClick={this.dmenableimage.bind(this)} className="dmenableimage">Включить</a>
        Цвет сайта <a onClick={this.dmcolor1.bind(this)} className="dmcolor1">Ц</a>
        <a onClick={this.dmcolor2.bind(this)} className="dmcolor2">Ц</a>
        <a onClick={this.dmcolor3.bind(this)} className="dmcolor3">Ц</a>
        <a onClick={this.dmreset.bind(this)} className="dmcolor4"><i className="fa fa-refresh"></i></a>
        <a onClick={this.dmhide.bind(this)} className="dmcolor4"><i className="fa fa-close"></i></a>
      </div>
    );
  }
}
