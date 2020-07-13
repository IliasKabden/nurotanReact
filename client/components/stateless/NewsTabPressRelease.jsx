import React, {Component} from 'react';
import moment from '../../lib/moment-with-locales.min.js';
import {Link} from 'react-router';

export default class NewsTabPressRelease extends Component {
  render() {
    moment.locale(this.props.lang);
    const {mpStrings} = this.props;

    const {pressReleases, lang} = this.props,
          pressReleasesJSX = pressReleases.map((pressRelease) => {
            const date = moment(pressRelease.createdAt).format('LL'),
                  blobsJSX = pressRelease.blobs[this.props.lang].map((blob, index) => {
                    const filetype = blob.filename.split('.')[1];
                    return (
                      <a key={index} href={blob.url}>
                        ({mpStrings.pressRelease})
                      </a>
                    );
                  });
            return (
              <div key={pressRelease._id} className="purchase-block">
                <span className="date none-bg">
                  <strong><i>{date}</i></strong>
                </span>
                <h3>
                  <Link to={"/single-press-release?id=" + pressRelease._id} className="black link">
                    {pressRelease.title[lang]}
                  </Link>
                </h3>
                <p dangerouslySetInnerHTML={{__html: pressRelease.text[lang]}}></p>
                {blobsJSX}
                <div className="clearfix" />
              </div>
            );
          });

    return (
      <div id="main-video" className="center none-margin-top">
        <div className="content-news">
          <div id="blog" className="cell-12 none-margin-top">
            {pressReleasesJSX}
          </div>
          <button onClick={this.props.loadMoreHandler} className="load-more" type="button">{mpStrings.loadMore}</button>
          <div className="clearfix" />
        </div>
      </div>
    );
  }
}
