import React, {Component} from 'react';

export default class ContactsTabBranches extends Component {
  render() {
    const {regions, lang} = this.props,
          contactsJSX = regions.map((region, index) => {
            return (
              <div key={index}>
                <div className="description-topic">
                  <p>
                    <span className="black uppercase large-text">{region.contactsTitle ? region.contactsTitle[lang] : ''}</span>
                  </p>
                </div>
                <div dangerouslySetInnerHTML={{__html: region.contacts ? region.contacts[lang] : ''}}></div>
                <hr />
              </div>
            );
          });

    return (
      <div>
        {contactsJSX}
      </div>
    );
  }
}
