import React, {Component} from 'react';
import {resizeText} from '../../lib/coreLib.js';

export default class FontSizeBlockStateless extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $(this.inc).on('click', function () {
        resizeText(1);
        $("header .menu ul.big-menu li").css({"paddingLeft": "0.7%"});
        
    });

    $(this.dec).on('click', function () {
        resizeText(-1);
        $("header .menu ul.big-menu li").css({"paddingLeft": "2.2%"});
        
    });
  }

  render() {
    return (
      <div id="font-block-fixed">
        <button ref={(inc) => {this.inc = inc}} id="increase">+</button><br />
        <button ref={(dec) => {this.dec = dec}} id="decrease">-</button>
      </div>
    );
  }
}
