import React, {Component} from 'react';

export default class SimpleSelect extends Component {
  render() {
    const {options, label, name} = this.props;

    const optionsJSX = [];

    optionsJSX.push(<option key='0' value='0' style={{color: 'lightGrey'}}>{label}</option>);

    options.forEach((option) => {
      optionsJSX.push(<option key={option._id} value={option._id}>{option.name.ru}</option>);
    });

    return (
      <select
        name={name}
        className="form-control"
        onChange={this.props.changeHandler}
        data-state-name={this.props.dataStateName ? this.props.dataStateName : ''}
        value={this.props.value}>
        {optionsJSX}
      </select>
    );
  }
}
