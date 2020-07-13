import React, {Component} from 'react';

export default class ModeratorLogs extends Component {
  componentDidMount() {
    $.getScript('/custom/plugins/datatables/datatables.min.js', () => {
      $(this.t).DataTable({
        "ordering": false
      });
    });
  }
  render() {
    return (
      <table ref={(t) => {this.t = t;}} className="display">
        <thead>
          <tr>
            <th>#</th>
            <th>Модератор</th>
            <th>Действие</th>
            <th>ID объекта</th>
            <th>Время действия</th>
          </tr>
        </thead>
        <tbody>
          {this.props.logsJSX}
        </tbody>
      </table>
    );
  }
}
