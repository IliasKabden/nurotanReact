import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import ModeratorLogs from '../../components/moderator/ModeratorLogs.jsx';
import {LogsCollection} from '../../../api/_logs_.js';
import ModeratorDeputyRequestsHelmet from '../../helmets/ModeratorDeputyRequestsHelmet.jsx';

class ModeratorLogsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subscriptionReady: false
    };
  }

  componentWillMount() {
    const logsSub = Meteor.subscribe('Logs', {
      onReady: () => {
        this.setState({subscriptionReady: true});
      }
    });
  }

  getLogsJSX() {
    return this.props.logs.map((log) => {
      return (
        <tr key={log._id}>
          <td>{log._id}</td>
          <td>{log.author}</td>
          <td>{log.action}</td>
          <td>{log.objectId}</td>
          <td>{log.createdAt}</td>
        </tr>
      );
    });
  }

  render() {
    if(!this.state.subscriptionReady)
      return <div>Загрузка</div>;

    console.log(this.props.logs);

    return (
      <div>
        <ModeratorDeputyRequestsHelmet />
        <ModeratorLogs
          logsJSX={this.getLogsJSX()}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    logs: LogsCollection.find({}, {sort: {createdAt: -1}}).fetch()
  };
}, ModeratorLogsContainer);
