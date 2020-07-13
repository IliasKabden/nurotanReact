import React, {Component} from 'react';

export default class FileLinkStateless extends Component {
  render() {
    const {blob} = this.props,
          fileNameArray = blob.filename.split('.'),
          filetype = fileNameArray[fileNameArray.length - 1];

    return (
      <a href={blob.url}>
        <span className="pdf-file">
          <img src={"custom/img/icons/" + filetype + "-icon.png"} alt={filetype + "-icon"} />
          <span className="name-file">{blob.filename}</span>
          <span className="clearfix" />
        </span>
      </a>
    );
  }
}
