import React, {Component} from 'react';

export default class CalendarContainer extends Component {
  componentDidMount() {
    $.getScript('/custom/plugins/pikaday/pikaday.js', () => {
      var pickerRu = new Pikaday(
      {
          field: this.calru,
          firstDay: 1,
          minDate: new Date(2000, 1, 1),
          maxDate: new Date(2020, 12, 31),
          yearRange: [2000,2020],
          i18n: this.props.locales.ru,
          onSelect: this.props.onDateSelect
      });
      var pickerKz = new Pikaday(
      {
          field: this.calkz,
          firstDay: 1,
          minDate: new Date(2000, 1, 1),
          maxDate: new Date(2020, 12, 31),
          yearRange: [2000,2020],
          i18n: this.props.locales.kz,
          onSelect: this.props.onDateSelect
      });
    });

    if(this.props.lang === 'ru') {
      $(this.calru).show();
      $(this.calkz).hide();
    }
    else {
      $(this.calru).hide();
      $(this.calkz).show();
    }
  }

  componentDidUpdate() {
    if(this.props.lang === 'ru') {
      $(this.calru).show();
      $(this.calkz).hide();
    }
    else {
      $(this.calru).hide();
      $(this.calkz).show();
    }
  }

  componentWillUnmount() {
    $('.pika-single.is-bound.is-hidden').hide();
  }

  render() {
    return (
      <div>
        <a ref={(calru) => {this.calru = calru;}} className="active">Календарь <span className="calendar active" /></a>
        <a ref={(calkz) => {this.calkz = calkz;}} className="active">Күнтізбе <span className="calendar active" /></a>
      </div>
    );
  }
}
