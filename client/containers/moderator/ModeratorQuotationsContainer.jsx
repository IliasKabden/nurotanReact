import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {qs, qsa, addScript, setEditorValue, getEditorValue} from '../../lib/coreLib.js'
import {prepareCheckboxes} from '../../lib/dictionary-main-page.js';

import ModeratorQuotationsHelmet from '../../helmets/ModeratorQuotationsHelmet.jsx';
import ModeratorQuotations from '../../components/moderator/ModeratorQuotations.jsx';

import {QuotationsCollection} from '../../../api/Quotations.js';

class ModeratorQuotationsContainer extends Component {
  constructor(props) {
    super(props);

    Meteor.subscribe('Quotations');
  }

  componentDidMount() {
    document.body.setAttribute('class', 'hold-transition skin-green-light layout-top-nav');
  }

  /* START EVENT HANDLERS */

  addQuotationButtonHandler(e) {
    e.preventDefault();

    const cForm = qs('#leader-quotation'),
          text = {
            ru: getEditorValue('textEditorRu'),
            kz: getEditorValue('textEditorKz'),
          };

    Meteor.call('quotations.add', {text}, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Цитата успешно добавлена', 'success', 'growl-top-right' );
        window.location.reload();
      }
    });
  }

  editQuotationButtonHandler(e) {
    checkedCheckBoxes = qsa('.quotation-checkbox:checked');

    if(!checkedCheckBoxes.length)
    {
      Bert.alert( 'Вы ничего не выбрали!', 'danger', 'growl-top-right' );
      return;
    }

    if(checkedCheckBoxes.length > 1)
    {
      Bert.alert( 'Выберите не больше одного проекта в списке!', 'danger', 'growl-top-right' );
      return;
    }

    $('#quotation-edit-modal').modal('show');
    const id = checkedCheckBoxes[0].getAttribute('data-id');

    const {quotations} = this.props;

    const currentQuotation = quotations.filter((quotationItem) => {
      return quotationItem._id === id;
    })[0],
          cForm = qs('#modal-leader-quotation');

    cForm.elements['title-ru'].value = currentQuotation.title.ru;
    cForm.elements['title-kz'].value = currentQuotation.title.kz;
    setEditorValue(modalEditorRu, currentQuotation.text.ru)
    setEditorValue(modalEditorKz, currentQuotation.text.kz)

    qs('#modal-save-button').setAttribute('data-id', currentQuotation._id);
  }

  removeQuotationsButtonHandler(e) {
    checkedCheckBoxes = qsa('input:checked');

    checkedCheckBoxes.forEach((checkbox) => {
      Meteor.call('quotations.remove', checkbox.getAttribute('data-id'), (err) => {
        if(err) {
          Bert.alert( err.reason, 'danger', 'growl-top-right' );
        }
        else {
          Bert.alert( "Цитата успешно удалена", 'success', 'growl-top-right' );
        }
      });
    });
  }

  saveChangesButtonHandler(e) {
    const id = qs('#modal-save-button').getAttribute('data-id'),
          cForm = qs('#modal-leader-quotation'),
          title = {
            ru: cForm.elements['title-ru'],
            kz: cForm.elements['title-kz']
          },
          text = {
            ru: getEditorValue('modalEditorRu'),
            kz: getEditorValue('modalEditorKz'),
          };

    Meteor.call('quotations.edit', id, {text, title}, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Цитата успешно изменена', 'success', 'growl-top-right' );
        cForm.reset();
      }
    });
  }

  /* END EVENT HANDLERS */

  /* START GENERATED JSX*/

  getQuotationsJSX() {
    if(!this.props.quotations || !this.props.quotations.length)
      return [];

    return this.props.quotations.map((quotationItem) => {
      return (
        <tr key={quotationItem._id}>
          <td><input className='quotation-checkbox' data-id={quotationItem._id} type="checkbox" /></td>
          <td>{quotationItem.text.en}</td>
          <td>{quotationItem.text.ru}</td>
          <td>{quotationItem.text.kz}</td>
        </tr>
      );
    });
  }

  /* END GENERATED JSX*/

  render() {
    return (
      <div>
        <ModeratorQuotationsHelmet />
        <ModeratorQuotations
          addQuotationButtonHandler={this.addQuotationButtonHandler.bind(this)}
          quotationsJSX={this.getQuotationsJSX()}
          editQuotationButtonHandler={this.editQuotationButtonHandler.bind(this)}
          saveChangesButtonHandler={this.saveChangesButtonHandler.bind(this)}
          removeQuotationsButtonHandler={this.removeQuotationsButtonHandler.bind(this)} />
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    quotations: QuotationsCollection.find({}, {sort: {createdAt: -1}}).fetch(),
  };
}, ModeratorQuotationsContainer)
