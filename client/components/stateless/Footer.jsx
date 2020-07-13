import React, {Component} from 'react';

export default class Footer extends Component {
  componentDidMount() {
    /*var _zero_kz_ = _zero_kz_ || [];
    _zero_kz_.push(["id", 68193]);
    _zero_kz_.push(["type", 1]);

    (function () {
        var a = document.getElementsByTagName("script")[0],
        s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = (document.location.protocol == "https:" ? "https:" : "http:")
        + "//c.zero.kz/z.js";
        a.parentNode.insertBefore(s, a);
    })(); */

    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-91633617-1', 'auto');
    ga('send', 'pageview');
  }

  render() {
    const {lang} = this.props;

    let footerText;

    if(lang === 'ru') {
      footerText = (
        <span style={{display: "inline-block", float:"left"}}>
          © 2017  Партия “Нұр Отан”. <br />
          Все права защищены.<br />
        </span>
      );
    }
    else {
      footerText = (
        <span style={{display: "inline-block", float:"left"}}>
          © 2017  “Нұр Отан” Партиясы. <br />
          Барлық құқықтар қорғалған.<br />
        </span>
      );
    }

    return (
      <footer>
        <div className="copright">
          {footerText}
          {/*
          <span id="_zero_68193" style={{marginLeft: "10em", display: "inline-block", float:"left"}}>
            <a href="http://zero.kz/?s=68193" target="_blank">
              <img src="http://c.zero.kz/z.png?u=68193" width="88" height="31" alt="ZERO.kz" />
            </a>
          </span>
          */}
        </div>
      </footer>
    );
  }
}
