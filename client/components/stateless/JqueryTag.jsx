import React, {Component} from 'react';
import {addScript} from '../../lib/coreLib.js';

export default class JqueryTag extends Component {
  componentWillMount() {
    addScript({src: '/custom/js/vendor/jquery.tagsinput.min.js'});
    addScript({src: '/custom/js/vendor/jquery-ui.js'});
  }

  componentDidMount() {
    $.getScript('/custom/js/vendor/jquery.tagsinput.min.js', () => {
      $.getScript('/custom/js/vendor/jquery-ui.js', () => {
        const {name, source} = this.props;

        const sources = source.map((sourceItem) => sourceItem.name);

        $(this.el).tagsInput({
          width:'auto',
          autocomplete_url: sources
        });
      });
    });
  }

  render() {
    const {name} = this.props;

    return <input ref={(el) => {this.el = el;}} name={name} id={name} type="text" style={{marginTop: '1em'}} className="form-control"/>
  }
}
