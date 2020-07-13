import React, {Component} from 'react';

export default class LeaderTabLeaderStateless extends Component {
  componentDidMount() {
    $.getScript('/custom/js/slider/owl.carousel.min.js', () => {
      const isMulti = ($('.development.item').length > 1) ? true : false;

      $(this.cd).owlCarousel({
         loop: isMulti,
         items: 1,
         margin: 10,
         nav: true,
         pagination: true,
         navText: ["<", ">"]
     });
    });
  }

  render() {
    const {messages, lang, setActiveMaterial} = this.props;
    let {activeMessage} = this.props;

    if(!activeMessage)
      activeMessage = messages[0];
    else {
      activeMessage = messages.filter((message) => message._id === activeMessage)[0];
    }

    const messageJSX = (
            <div className="cell-8">
              <div className="content-vertical-tabs">
                <h2>{activeMessage.title[lang]}</h2>
                <div
                  className="content-vertical-tabs-scroll"
                  dangerouslySetInnerHTML={{__html: activeMessage.text[lang]}}>
                </div>
              </div>
              <div className="clearfix" />
            </div>
          ),
          messageGroups = [];

      let messagePosition = 0;
      messages.forEach((message, index) => {
        if(!messageGroups[messagePosition])
          messageGroups.push([]);

        if(messageGroups[messagePosition].length === 6) {
          messagePosition ++;
          messageGroups.push([]);
        }

        messageGroups[messagePosition].push(message);
      });

    const messageGroupsJSX = messageGroups.map((group, index) => {
      const messagesJSX = group.map((message, index) => {
        return (
          <div
            key={index}
            className="vertical-tabs"
            onClick={setActiveMaterial}
            data-material-id={message._id}
            data-material-name="activeMessage">
            {message.title[lang]}
          </div>
        );
      });

      return (
        <div key={index} className="development item">
          {messagesJSX}
        </div>
      );
    });

    return (
      <section className="green-block-color">
        {messageJSX}
        <div className="cell-4">
          <div ref={(cd) => {this.cd = cd}} className="columns-developments">
            {messageGroupsJSX}
          </div>
          <div className="clearfix" />
        </div>
        <div className="clearfix" />
      </section>
    );
  }
}
