import React, {Component} from 'react';
import {addScript} from '../../lib/coreLib.js';
import LeadershipModalInfoStateless from './LeadershipModalInfoStateless.jsx';

export default class LeadershipModal extends Component {
  render() {
    const {position, name, info, biography, lang, photo, id} = this.props;

    return (
      <div style={{display: "none"}}>
        <div className="box-modal" id={"biographia-" + id}>
          <div className="box-modal_close arcticmodal-close"><img id="close-m" src="/custom/img/icons/close-modal.png" alt="close" /></div>
          <LeadershipModalInfoStateless photo={photo} biography={biography} name={name} lang={lang} info={info} position={position}/>
          <div dangerouslySetInnerHTML={{__html: biography[lang]}}/>
        </div>
      </div>
    ) ;
  }
}
