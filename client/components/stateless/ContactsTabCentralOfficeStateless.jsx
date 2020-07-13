import React, {Component} from 'react';

export default class ContactsTabBranches extends Component {
  render() {
    return (
      <div dangerouslySetInnerHTML={{__html: this.props.contacts[this.props.lang]}}>
      </div>
    );
  }
}
