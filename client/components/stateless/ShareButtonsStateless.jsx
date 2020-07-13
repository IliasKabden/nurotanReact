import React, {Component} from 'react';
import {addScript} from '../../lib/coreLib.js';
import {mpStrings} from '../../lib/main-page-localization.js';

export default class ShareButtonStateless extends Component {
  componentDidMount() {
    $.getScript('https://yastatic.net/share2/share.js', () => {
    });
  }

  render() {
    const {title, url, image, lang} = this.props;

    return (
      <div>
        <div
          className="ya-share2"
          data-services="facebook,vkontakte,odnoklassniki,gplus,twitter,linkedin,whatsapp,skype,telegram">
        </div>
      </div>
    )
  }
}
