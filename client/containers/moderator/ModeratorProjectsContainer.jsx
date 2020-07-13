import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {qs, qsa, addScript, getEditorValue, setEditorValue} from '../../lib/coreLib.js'
import {prepareCheckboxes} from '../../lib/dictionary-main-page.js';

import ModeratorProjectsHelmet from '../../helmets/ModeratorProjectsHelmet.jsx';
import ModeratorProjects from '../../components/moderator/ModeratorProjects.jsx';

import {ProjectsCollection} from '../../../api/Projects.js';

class ModeratorProjectsContainer extends Component {
  constructor(props) {
    super(props);

    Meteor.subscribe('Projects');
  }

  componentDidMount() {
    document.body.setAttribute('class', 'hold-transition skin-green-light layout-top-nav');

    var photoUploadWidget = uploadcare.SingleWidget('[role=uploadcare-uploader]');
  }

  componentDidUpdate() {
    $('.project-checkbox').iCheck({
      checkboxClass: 'icheckbox_flat-blue',
      radioClass: 'iradio_flat-blue'
    });
  }

  /* START EVENT HANDLERS */

  addProjectButtonHandler(e) {
    e.preventDefault();

    const cForm = qs('#moderator-projects-form');

    const title = {
            ru: cForm.elements['title-ru'].value,
            kz: cForm.elements['title-kz'].value,
          },
          text = {
            ru: getEditorValue('textEditorRu'),
            kz: getEditorValue('textEditorKz'),
          },
          photo = cForm.elements['photo'].value;

    Meteor.call('projects.add', {title, text, photo}, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Проект успешно добавлен', 'success', 'growl-top-right' );
        window.location.reload();
      }
    });
  }

  editProjectButtonHandler(e) {
    checkedCheckBoxes = qsa('.project-checkbox:checked');

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

    $('#project-edit-modal').modal('show');
    const id = checkedCheckBoxes[0].getAttribute('data-id'),
          cForm = qs('#modal-projects-form');

    const {projects} = this.props;

    const currentProject = projects.filter((projectItem) => {
      return projectItem._id === id;
    })[0];

    const photoWidget = uploadcare.Widget('#modal-photo-input');
    photoWidget.value(currentProject.photo)

    cForm.elements['title-ru'].value = currentProject.title.ru;
    cForm.elements['title-kz'].value = currentProject.title.kz;
    cForm.elements['photo'].value = currentProject.photo;

    setEditorValue('modalTextEditorRu', currentProject.text.ru);
    setEditorValue('modalTextEditorKz', currentProject.text.kz);

    qs('#modal-save-button').setAttribute('data-id', currentProject._id);
  }

  removeProjectsButtonHandler(e) {
    checkedCheckBoxes = qsa('input:checked');

    checkedCheckBoxes.forEach((checkbox) => {
      Meteor.call('projects.remove', checkbox.getAttribute('data-id'), (err) => {
        if(err) {
          Bert.alert( err.reason, 'danger', 'growl-top-right' );
        }
        else {
          Bert.alert( "Проект успешно удален", 'success', 'growl-top-right' );
        }
      });
    });
  }

  saveChangesButtonHandler(e) {
    const id = qs('#modal-save-button').getAttribute('data-id'),
          cForm = qs('#modal-projects-form');
          title = {
            ru: cForm.elements['title-ru'].value,
            kz: cForm.elements['title-kz'].value
          },
          text = {
            ru: getEditorValue('modalTextEditorRu'),
            kz: getEditorValue('modalTextEditorKz'),
          },
          photo = cForm.elements['photo'].value;

    Meteor.call('projects.edit', id, {title, text, photo}, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Проект успешно изменена', 'success', 'growl-top-right' );
        window.location.reload();
      }
    });
  }

  /* END EVENT HANDLERS */

  /* START GENERATED JSX*/

  getProjectsJSX() {
    if(!this.props.projects || !this.props.projects.length)
      return [];

    return this.props.projects.map((projectItem) => {
      return (
        <tr key={projectItem._id}>
          <td><input className='project-checkbox' data-id={projectItem._id} type="checkbox" /></td>
          <td>{projectItem.title.en}</td>
          <td>{projectItem.title.ru}</td>
          <td>{projectItem.title.kz}</td>
        </tr>
      );
    });
  }

  /* END GENERATED JSX*/

  render() {
    return (
      <div>
        <ModeratorProjectsHelmet />
        <ModeratorProjects
          addProjectButtonHandler={this.addProjectButtonHandler.bind(this)}
          projectsJSX={this.getProjectsJSX()}
          editProjectButtonHandler={this.editProjectButtonHandler.bind(this)}
          saveChangesButtonHandler={this.saveChangesButtonHandler.bind(this)}
          removeProjectsButtonHandler={this.removeProjectsButtonHandler.bind(this)} />
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    projects: ProjectsCollection.find({}, {sort: {createdAt: -1}}).fetch(),
  };
}, ModeratorProjectsContainer)
