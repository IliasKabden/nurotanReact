import React, {Component} from 'react';
import Calendar from '../components/Calendar.jsx';
import CalendarHelmet from '../helmets/CalendarHelmet.jsx';

import {addScript} from '../lib/coreLib.js';

export default class CalendarContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    addScript({src: '/custom/plugins/pikaday/pikaday.js'});
  }

  render() {

    const {lang, onDateSelect} = this.props,
          locales = {
            ru: {
                previousMonth : 'Пред. месяц',
                nextMonth     : 'След. месяц',
                months        : ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
                weekdays      : ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
                weekdaysShort : ['Вс','Пн','Вт','Ср','Чт','Пт','Сб']
            },
            kz: {
                previousMonth : 'Алдыңғы ай',
                nextMonth     : 'Келесі айда',
                months        : ['Қаңтар','Ақпан','Наурыз','Сәуір','Мамыр','Маусым','Шілде','Тамыз','Қыркүйек','Қазан','Қараша','Желтоксан'],
                weekdays      : ['Жексенбі','Дүйсенбі','Сейсенбі','Сәрсенбі','Бейсенбі','Жұма','Сенбі'],
                weekdaysShort : ['Жек','Дүй','Сей','Сәр','Бей','Жұм','Сен']
            }
          };

    return (
      <div>
        <CalendarHelmet />
        <Calendar
          lang={lang}
          locales={locales}
          onDateSelect={onDateSelect} />
      </div>
    );
  }
}
