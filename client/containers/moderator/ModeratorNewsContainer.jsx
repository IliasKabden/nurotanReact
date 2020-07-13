import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {
        qs, qsa, addScript, notReady,
        setEditorValue, getEditorValue,
        setPhotoWidgetValue, setJqueryTagValue
      } from '../../lib/coreLib.js'
import {prepareCheckboxes} from '../../lib/dictionary-main-page.js';

import ModeratorNewsHelmet from '../../helmets/ModeratorNewsHelmet.jsx';
import ModeratorNews from '../../components/moderator/ModeratorNews.jsx';

import SimpleSelect from '../../components/stateless/SimpleSelect.jsx';
import {NewsCollection} from '../../../api/News.js';
import {RegionsCollection} from '../../../api/Regions.js';
import {ProjectsCollection} from '../../../api/Projects.js';

import moment from '../../lib/moment-with-locales.min.js';

class ModeratorNewsContainer extends Component {

  componentWillMount() {
    Meteor.subscribe('AllNews');
    Meteor.subscribe('Regions');
    Meteor.subscribe('Projects');
  }

  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      recommendation: false,
      mainNews: false,
      aboutFraction: false,
      photo: "",
      project: 0,
      titleru: '',
      titlekz: '',
      inforu: '',
      infokz: '',
      tagsru: '',
      tagskz: '',

      iframeLang: 'ru',
      modalIframeLang: 'ru',
      region: "9",
      modalTitleRu: '',
      modalTitleKz: '',
      modalPhoto: '',
      modalDate: new Date(),
      modalRegion: '',
      modalTagsRu: '',
      modalTagsKz: ''
    };
  }

  componentDidMount() {
    document.body.setAttribute('class', 'hold-transition skin-green-light layout-top-nav');
  }

  /* START EVENT HANDLERS */

  addNewsButtonHandler(e) {
    e.preventDefault();
    const cForm = qs('#moderator-news-form');

    const title = {
            ru: cForm.elements['title-ru'].value,
            kz: cForm.elements['title-kz'].value
          },
          text = {
            ru: getEditorValue('textEditorRu'),
            kz: getEditorValue('textEditorKz'),
          },
          info = {
            ru: cForm.elements['info-ru'].value,
            kz: cForm.elements['info-kz'].value,
          },
          tags = {
            ru: this.state.tagsru,
            kz: this.state.tagskz
          }
          region = this.state.region,
          photo = this.state.photo,
          mainNews = this.state.mainNews,
          aboutFraction = this.state.aboutFraction,
          project = this.state.project,
          recommendation = this.state.recommendation,
          createdAt = Date.parse(this.state.date);

    Meteor.call('news.add', {
      title, text, info, region, photo,
      mainNews, aboutFraction, recommendation,
      project, createdAt, tags
    }, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Новость успешно добавлена', 'success', 'growl-top-right' );
        document.location.reload();
      }
    });
  }

  editNewsButtonHandler(e) {
    checkedCheckBoxes = qsa('.news-checkbox:checked');

    if(!checkedCheckBoxes.length)
    {
      Bert.alert( 'Вы ничего не выбрали!', 'danger', 'growl-top-right' );
      return;
    }

    if(checkedCheckBoxes.length > 1)
    {
      Bert.alert( 'Выберите не больше одной новости в списке!', 'danger', 'growl-top-right' );
      return;
    }

    $.fn.modal.Constructor.prototype.enforceFocus = function () {
      var $modalElement = this.$element;
      $(document).on('focusin.modal', function (e) {
        var $parent = $(e.target.parentNode);
        if ($modalElement[0] !== e.target && !$modalElement.has(e.target).length
            // add whatever conditions you need here:
            &&
            !$parent.hasClass('cke_dialog_ui_input_select') && !$parent.hasClass('cke_dialog_ui_input_text')) {
            $modalElement.focus()
        }
      })
    };

    $('#news-edit-modal').modal('show');
    const id = checkedCheckBoxes[0].getAttribute('data-id');

    const {news} = this.props;

    const currentNews = news.filter((newsItem) => {
      return newsItem._id === id;
    })[0],
          currentForm = qs('#modal-news-form');

    currentForm.elements['region'].value = currentNews.region;
    currentForm.elements['main-news'].checked = currentNews.mainNews;
    currentForm.elements['about-fraction'].checked = currentNews.aboutFraction;
    currentForm.elements['recommendation'].checked = currentNews.recommendation;
    this.setState({
      modalTitleRu: currentNews.title.ru,
      modalTitleKz: currentNews.title.kz,
      modalDate: new Date(currentNews.createdAt),
      modalPhoto: currentNews.photo,
      modalRegion: currentNews.region,
      project: currentNews.project,
      modalTagsRu: currentNews.tags ? currentNews.tags.ru : '',
      modalTagsKz: currentNews.tags ? currentNews.tags.kz : ''
    });

    currentForm.elements['info-ru'].value = currentNews.info.ru;
    currentForm.elements['info-kz'].value = currentNews.info.kz;
    setEditorValue('modalEditorRu', currentNews.text.ru);
    setEditorValue('modalEditorKz', currentNews.text.kz);

    qs('#modal-save-button').setAttribute('data-id', currentNews._id);
  }

  removeNewsButtonHandler(e) {
    checkedCheckBoxes = qsa('input:checked');

    checkedCheckBoxes.forEach((checkbox) => {
      Meteor.call('news.remove', checkbox.getAttribute('data-id'), (err) => {
        if(err) {
          Bert.alert( err.reason, 'danger', 'growl-top-right' );
        }
        else {
          Bert.alert( "Новость успешно удалена", 'success', 'growl-top-right' );
        }
      });
    });
  }

  saveChangesButtonHandler(e) {
    e.preventDefault();

    const id = e.target.getAttribute('data-id'),
          cForm = qs('#modal-news-form');

    const title = {
            ru: cForm.elements['title-ru'].value,
            kz: cForm.elements['title-kz'].value
          },
          text = {
            ru: getEditorValue('modalEditorRu'),
            kz: getEditorValue('modalEditorKz'),
          },
          info = {
            ru: cForm.elements['info-ru'].value,
            kz: cForm.elements['info-kz'].value,
          },
          tags = {
            ru: this.state.modalTagsRu,
            kz: this.state.modalTagsKz
          },
          region = cForm.elements['region'].value,
          photo = cForm.elements['photo'].value,
          mainNews = cForm.elements['main-news'].checked,
          aboutFraction = cForm.elements['about-fraction'].checked,
          recommendation = cForm.elements['recommendation'].checked,
          project = cForm.elements['project'].value,
          createdAt = Date.parse(cForm.elements['date'].value);

    Meteor.call('news.edit', id, {
      title, text, info, region, photo,
      mainNews, aboutFraction, project, createdAt, recommendation,
      tags
    }, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Новость успешно изменена', 'success', 'growl-top-right' );
        window.location.reload();
      }
    });
  }

  checkChangeHandler(e) {
    const stateName = e.currentTarget.getAttribute('data-state-name'),
          stateValue = e.currentTarget.checked;

    this.setState({
      [stateName]: stateValue
    });
  }

  dateChangeHandler(e) {
    const stateName = e.currentTarget.getAttribute('data-state-name'),
          stateValue = e.currentTarget.value;

    this.setState({
      [stateName]: stateValue
    });
  }

  photoChangeHandler(file) {
    file.done((info)=>{
      this.setState({
        photo: info.cdnUrl,
        modalPhoto: info.cdnUrl
      });
    });
  }

  tabClickHandler(e) {
    this.setState({
      iframeLang: e.currentTarget.getAttribute('data-lang')
    });
  }

  modalTabClickHandler(e) {
    this.setState({
      modalIframeLang: e.currentTarget.getAttribute('data-lang')
    });
  }

  /* END EVENT HANDLERS */

  /* START GENERATED JSX*/

  getNewsJSX() {
    if(!this.props.news || !this.props.news.length)
      return [];

    return this.props.news.map((newsItem) => {
      const date = moment(newsItem.createdAt).format('L');
      return (
        <tr key={newsItem._id}>
          <td><input className='news-checkbox' data-id={newsItem._id} type="checkbox" /></td>
          <td>{newsItem.title.ru}</td>
          <td>{newsItem.title.kz}</td>
          <td>{date}</td>
        </tr>
      );
    });
  }

  /* END GENERATED JSX*/

  render() {
    const {regions, projects, news} = this.props;

    if(notReady(regions) || notReady(projects) || notReady(news) || !news.length)
      return <div className="preload-image"></div>;

    const projectsOptions = projects.map((project) => {
      return {
        _id: project._id,
        name: {
          ru: project.title.ru
        }
      }
    });

    const regionSelectJSX = <SimpleSelect
            options={regions}
            name="region"
            label="Главная (Центральный Аппарат, без региона)"
            changeHandler={this.dateChangeHandler.bind(this)}
            value={this.state.region}
            dataStateName="region"/>,
          modalRegionSelectJSX = <SimpleSelect
                  options={regions}
                  name="region"
                  label="Выберите регион | Аймақты таңдаңыз"
                  changeHandler={this.dateChangeHandler.bind(this)}
                  value={this.state.modalRegion}
                  dataStateName="modalRegion"/>,
          projectSelectJSX = <SimpleSelect
            options={projectsOptions}
            name="project"
            label="Выберите проект | Жоба таңдаңыз"
            changeHandler={this.dateChangeHandler.bind(this)}
            value={this.state.project}
            dataStateName="project"/>;

    return (
      <div>
        <ModeratorNewsHelmet />
        <ModeratorNews
          addNewsButtonHandler={this.addNewsButtonHandler.bind(this)}
          newsJSX={this.getNewsJSX()}
          editNewsButtonHandler={this.editNewsButtonHandler.bind(this)}
          saveChangesButtonHandler={this.saveChangesButtonHandler.bind(this)}
          removeNewsButtonHandler={this.removeNewsButtonHandler.bind(this)}
          regionSelectJSX={regionSelectJSX}
          projectSelectJSX={projectSelectJSX}
          dateValue={this.state.date}
          photoValue={this.state.photo}
          titleRuValue={this.state.titleru}
          titleKzValue={this.state.titlekz}
          infoRuValue={this.state.inforu}
          infoKzValue={this.state.infokz}
          mainNewsValue={this.state.mainNews}
          tagsRuValue={this.state.tagsru}
          tagsKzValue={this.state.tagskz}
          lang={this.state.iframeLang}
          modalLang={this.state.modalIframeLang}
          aboutFractionValue={this.state.aboutFraction}
          recommendationValue={this.state.recommendation}
          projectValue={this.state.project}
          regionValue={this.state.region}
          checkChangeHandler={this.checkChangeHandler.bind(this)}
          dateChangeHandler={this.dateChangeHandler.bind(this)}
          photoChangeHandler={this.photoChangeHandler.bind(this)}
          tabClickHandler={this.tabClickHandler.bind(this)}
          modalTabClickHandler={this.modalTabClickHandler.bind(this)}
          modalTitleRuValue={this.state.modalTitleRu}
          modalTitleKzValue={this.state.modalTitleKz}
          modalPhotoValue={this.state.modalPhoto}
          modalDateValue={this.state.modalDate}
          modalRegionSelectJSX={modalRegionSelectJSX}
          modalTagsRuValue={this.state.modalTagsRu}
          modalTagsKzValue={this.state.modalTagsKz}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    news: NewsCollection.find({}, {sort: {createdAt: -1}}).fetch(),
    regions: RegionsCollection.find().fetch(),
    projects: ProjectsCollection.find().fetch()
  };
}, ModeratorNewsContainer)
