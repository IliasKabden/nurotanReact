import React, {Component} from 'react';

export default class LeadershipInfoStateless extends Component {
  render() {
    const {biographyClickHandler, position, name, info, id, lang, photo} = this.props;

    return (
      <div className="leadership-item ">
        <img src={photo + '-/scale_crop/302x201/'}  alt="назарбаев" className="none-padding" />
        <div className="leadership-description none-padding">
          <h3 className="green uppercase">{position[lang]}</h3>
          <h2>{name[lang]}</h2>
          <div dangerouslySetInnerHTML={{__html: info[lang]}} />
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}
