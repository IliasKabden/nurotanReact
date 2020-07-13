import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {qs, qsa, addScript, getEditorValue, setEditorValue} from '../../lib/coreLib.js'
import {prepareCheckboxes} from '../../lib/dictionary-main-page.js';

import ModeratorFinancialReportsHelmet from '../../helmets/ModeratorFinancialReportsHelmet.jsx';
import ModeratorFinancialReports from '../../components/moderator/ModeratorFinancialReports.jsx';

import {FinancialReportsCollection} from '../../../api/FinancialReports.js';

class ModeratorFinancialReportsContainer extends Component {
  constructor(props) {
    super(props);

    Meteor.subscribe('FinancialReports');

    const d = new Date();

    this.state = {
      financialReportYear: d.getFullYear(),
      modalFinancialReportYear: undefined
    };
  }

  componentDidMount() {
    document.body.setAttribute('class', 'hold-transition skin-green-light layout-top-nav');
  }

  componentDidUpdate() {
    $('.financial-report-checkbox').iCheck({
      checkboxClass: 'icheckbox_flat-blue',
      radioClass: 'iradio_flat-blue'
    });
  }

  /* START EVENT HANDLERS */

  addFinancialReportButtonHandler(e) {
    e.preventDefault();

    const text = {
            ru: getEditorValue('financialReportRu'),
            kz: getEditorValue('financialReportKz'),
          },
          year = this.state.financialReportYear;

    Meteor.call('financialReports.add', {text, year}, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Финансовый отчет успешно добавлен', 'success', 'growl-top-right' );
        setEditorValue('financialReportRu', "");
        setEditorValue('financialReportKz', "");
        const d = new Date();
        this.setState({financialReportYear: d.getFullYear()})
      }
    });
  }

  editFinancialReportButtonHandler(e) {
    checkedCheckBoxes = qsa('.financial-report-checkbox:checked');

    if(!checkedCheckBoxes.length)
    {
      Bert.alert( 'Вы ничего не выбрали!', 'danger', 'growl-top-right' );
      return;
    }

    if(checkedCheckBoxes.length > 1)
    {
      Bert.alert( 'Выберите не больше одного финансового отчета в списке!', 'danger', 'growl-top-right' );
      return;
    }

    $('#financial-report-edit-modal').modal('show');
    const id = checkedCheckBoxes[0].getAttribute('data-id');

    const {financialReports} = this.props;

    const currentFinancialReport = financialReports.filter((financialReportItem) => {
      return financialReportItem._id === id;
    })[0];

    setEditorValue('modalFinancialReportRu', currentFinancialReport.text.ru);
    setEditorValue('modalFinancialReportKz', currentFinancialReport.text.kz);

    this.setState({modalFinancialReportYear: currentFinancialReport.year});

    qs('#modal-save-button').setAttribute('data-id', currentFinancialReport._id);
  }

  removeFinancialReportsButtonHandler(e) {
    checkedCheckBoxes = qsa('input:checked');

    checkedCheckBoxes.forEach((checkbox) => {
      Meteor.call('financialReports.remove', checkbox.getAttribute('data-id'), (err) => {
        if(err) {
          Bert.alert( err.reason, 'danger', 'growl-top-right' );
        }
        else {
          Bert.alert( "Финансовый отчет успешно удален", 'success', 'growl-top-right' );
        }
      });
    });
  }

  saveChangesButtonHandler(e) {
    const id = qs('#modal-save-button').getAttribute('data-id'),
          text = {
            ru: getEditorValue('modalFinancialReportRu'),
            kz: getEditorValue('modalFinancialReportKz'),
          },
          year = this.state.modalFinancialReportYear;

    Meteor.call('financialReports.edit', id, {text, year}, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Финансовый отчет успешно изменен', 'success', 'growl-top-right' );
        qs('#financial-report-text-kz-input').form.reset();
      }
    });
  }

  /* END EVENT HANDLERS */

  stateValueChangeHandler(e) {
    const stateName = e.currentTarget.getAttribute('data-state-name'),
          value = e.currentTarget.value;

    this.setState({
      [stateName]: value
    });
  }

  /* START GENERATED JSX*/

  getFinancialReportsJSX() {
    if(!this.props.financialReports || !this.props.financialReports.length)
      return [];

    return this.props.financialReports.map((financialReportItem) => {
      return (
        <tr key={financialReportItem._id}>
          <td><input className='financial-report-checkbox' data-id={financialReportItem._id} type="checkbox" /></td>
          <td>{financialReportItem.year}</td>
        </tr>
      );
    });
  }

  /* END GENERATED JSX*/

  render() {
    return (
      <div>
        <ModeratorFinancialReportsHelmet />
        <ModeratorFinancialReports
          addFinancialReportButtonHandler={this.addFinancialReportButtonHandler.bind(this)}
          financialReportsJSX={this.getFinancialReportsJSX()}
          editFinancialReportButtonHandler={this.editFinancialReportButtonHandler.bind(this)}
          saveChangesButtonHandler={this.saveChangesButtonHandler.bind(this)}
          removeFinancialReportsButtonHandler={this.removeFinancialReportsButtonHandler.bind(this)}
          financialReportYear={this.state.financialReportYear}
          modalFinancialReportYear={this.state.modalFinancialReportYear}
          stateValueChangeHandler={this.stateValueChangeHandler.bind(this)}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    financialReports: FinancialReportsCollection.find({}, {sort: {createdAt: -1}}).fetch(),
  };
}, ModeratorFinancialReportsContainer)
