import React, {Component} from 'react';

import SocialFeed from '../components/SocialFeed.jsx';

export default class SocialFeedContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0
    }
  }

  setActiveTab(e) {
    e.preventDefault();

    this.setState({
      activeTab: parseInt(e.target.getAttribute('data-tab'))
    });
  }

  getTabsJSX() {
    return [
      (
        <section key="0" className="twitter-feed-container">
          <p>
            <a
              className="twitter-timeline"
              href="https://twitter.com/Nur_Otan"
              data-lang={this.props.lang}
              data-height='325'
              data-chrome="nofooter transparent">Tweets by Nur_Otan
            </a>
          </p>
        </section>
      ),
      (
        <section key="1" className="facebook-feed-container">
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fnurotan.kz&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
            width={340}
            height={360} 
            style={{border: 'none', overflow: 'hidden'}} scrolling="no" frameBorder={0} allowTransparency="true" />
        </section>
      )
    ];
  }

  render() {
    return (
      <SocialFeed
        tabs={this.getTabsJSX()}
        setActiveTab={this.setActiveTab.bind(this)}
        activeTabNumber={this.state.activeTab}/>
    );
  }
}
