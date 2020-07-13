import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {qs, qsa, addScript, setEditorValue, getEditorValue, setPhotoWidgetValue} from '../../lib/coreLib.js'
import {prepareCheckboxes} from '../../lib/dictionary-main-page.js';

import ModeratorArticlesHelmet from '../../helmets/ModeratorArticlesHelmet.jsx';
import ModeratorArticles from '../../components/moderator/ModeratorArticles.jsx';

import {ArticlesCollection} from '../../../api/Articles.js';

class ModeratorArticlesContainer extends Component {
  constructor(props) {
    super(props);
      this.state = {
        date: 'date',
        editor: 'textEditor',
        info: '',
        lang: '',
        photo: "",
        recommendation: 'recommendation',
        title: ''
      };

      Meteor.subscribe('ModeratorArticles');
  }

  componentDidMount() {
    document.body.setAttribute('class', 'hold-transition skin-green-light layout-top-nav');
  }

  componentDidUpdate() {
    $('.article-checkbox').iCheck({
      checkboxClass: 'icheckbox_flat-blue',
      radioClass: 'iradio_flat-blue'
    });
  }

  /* START EVENT HANDLERS */

  urlChangeHandler(e) {
    const urlElement = e.target,
          url = urlElement.value,
          currentForm = urlElement.form;

    urlElement.value = '...загрузка';
    urlElement.style.backgroundColor = '#f0ad4e';
    urlElement.style.color = 'white';

    Meteor.call('articles.get', url, (err, res) => {
      urlElement.value = 'загружено!';
      urlElement.style.backgroundColor = '#5cb85c';
      urlElement.style.color = 'white';

      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Статья загружена', 'success', 'growl-top-right' );

        currentForm.elements['title'].value = res.title;
        currentForm.elements['info'].value = res.info;
        setEditorValue('textEditor', res.text);
        currentForm.elements['photo'].value = res.image;
        currentForm.elements['lang'].value = res.lang;

        this.setState({title: res.title, info: res.info, lang: res.lang});

        const img = document.createElement('img');
        img.setAttribute('src', res.image);
        currentForm.elements['photo'].parentNode.appendChild(img);
        currentForm.elements['url'].removeAttribute('style');

        const addArticleButton = qs('#add-article-button');
        addArticleButton.setAttribute('disabled', 'true');

        const file = uploadcare.fileFrom('url', res.image);
        file.then((value) => {
          currentForm.elements['photo'].value = value.cdnUrl;
          addArticleButton.removeAttribute('disabled');

          this.setState({
            photo: value.cdnUrl
          });
        });
      }
    });
  }

  addArticleButtonHandler(e) {
    e.preventDefault();

    const currentForm = e.target.form;

    const title = this.state.title,
          info = this.state.info,
          text = getEditorValue(this.state.editor),
          photo = this.state.photo,
          createdAt = Date.parse(currentForm.elements[this.state.date].value),
          lang = this.state.lang,
          recommendation = currentForm.elements[this.state.recommendation].checked;

    Meteor.call('articles.add', {title, info, text, photo, createdAt, lang, recommendation}, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Статья успешно добавлена', 'success', 'growl-top-right' );
        document.location.reload();
      }
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
        photo: info.cdnUrl
      });
    });
  }

  cleanTabContent(tab) {
    const ru = document.getElementsByName('ru');
    const kz = document.getElementsByName('kz');

    if(tab === 'tabGeneral') {
      let tabContent = [ru, kz];
      tabContent.map((tag) => {
        for ( i = 0 , len = tag.length; i < len; i++) {
          tag[i].value = '';
        }
      });
    } else if ( tab === 'tabRu') {
      for ( i = 0 , len = kz.length; i < len; i++) {
        kz[i].value = '';
      }
    } else if ( tab === 'tabKz') {
      for ( i = 0 , len = ru.length; i < len; i++) {
        ru[i].value = '';
    }
  }
}

  tabClickHandler(e) {
    const tabName = e.currentTarget.getAttribute('data-tab-name');

    if (tabName === 'tabGeneral') {
      this.cleanTabContent(tabName);

      this.setState({
        date: 'date',
        editor: 'textEditor',
        info: '',
        lang: '',
        photo: "",
        recommendation: 'recommendation',
        title: ''
      });
    };
    if (tabName === 'tabRu') {
      this.cleanTabContent(tabName);

      this.setState({
        date: 'date-ru',
        editor: 'textEditorRu',
        info: '',
        lang: 'ru',
        photo: "",
        recommendation: 'recommendation-ru',
        title: ''
      });
    };
    if (tabName === 'tabKz') {
      this.cleanTabContent(tabName);

      this.setState({
        date: 'date-kz',
        editor: 'textEditorKz',
        info: '',
        lang: 'kz',
        photo: "",
        recommendation: 'recommendation-kz',
        title: ''
      });
    };
  }

  editArticleButtonHandler(e) {
    checkedCheckBoxes = qsa('.article-checkbox:checked');

    if(!checkedCheckBoxes.length)
    {
      Bert.alert( 'Вы ничего не выбрали!', 'danger', 'growl-top-right' );
      return;
    }

    if(checkedCheckBoxes.length > 1)
    {
      Bert.alert( 'Выберите не больше одной статьи в списке!', 'danger', 'growl-top-right' );
      return;
    }

    $('#article-edit-modal').modal('show');
    const id = checkedCheckBoxes[0].getAttribute('data-id');

    const {articles} = this.props,
          currentArticle = articles.filter((articleItem) => {
            return articleItem._id === id;
          })[0],
          currentForm = qs('#modal-article-form'),
          {elements} = currentForm;

    elements['title'].value = currentArticle.title;
    elements['info'].value = currentArticle.info;
    setEditorValue('modalEditor', currentArticle.text);
    elements['photo'].value = currentArticle.photo;
    elements['date'].value = new Date(currentArticle.createdAt);
    elements['recommendation'].checked = currentArticle.recommendation;

    qs('#modal-save-button').setAttribute('data-id', currentArticle._id);
  }

  removeArticlesButtonHandler(e) {
    checkedCheckBoxes = qsa('input:checked');

    checkedCheckBoxes.forEach((checkbox) => {
      Meteor.call('articles.remove', checkbox.getAttribute('data-id'), (err) => {
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
    const currentForm = qs('#modal-article-form'),
          id = e.target.getAttribute('data-id');

    const title = currentForm.elements['title'].value,
          info = currentForm.elements['info'].value,
          text = getEditorValue('modalEditor'),
          photo = currentForm.elements['photo'].value,
          createdAt = Date.parse(currentForm.elements['date'].value),
          recommendation = currentForm.elements['recommendation'].checked;

    Meteor.call('articles.edit', id, {title, info, text, photo, createdAt, recommendation}, (err) => {
      if(err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right' );
      }
      else {
        Bert.alert('Новость успешно изменена', 'success', 'growl-top-right' );
        currentForm.reset();
      }
    });
  }

  /* END EVENT HANDLERS */

  /* START GENERATED JSX*/

  getArticlesJSX() {
    if(!this.props.articles || !this.props.articles.length)
      return [];

    return this.props.articles.map((articleItem) => {
      return (
        <tr key={articleItem._id}>
          <td><input className='article-checkbox' data-id={articleItem._id} type="checkbox" /></td>
          <td>{articleItem.title}</td>
          <td>{articleItem.lang}</td>
        </tr>
      );
    });
  }

  /* END GENERATED JSX*/

  render() {

    return (
      <div>
        <ModeratorArticlesHelmet />
        <ModeratorArticles
          addArticleButtonHandler={this.addArticleButtonHandler.bind(this)}
          articlesJSX={this.getArticlesJSX()}
          dateChangeHandler={this.dateChangeHandler.bind(this)}
          editArticleButtonHandler={this.editArticleButtonHandler.bind(this)}
          photoChangeHandler={this.photoChangeHandler.bind(this)}
          saveChangesButtonHandler={this.saveChangesButtonHandler.bind(this)}
          tabClickHandler={this.tabClickHandler.bind(this)}
          removeArticlesButtonHandler={this.removeArticlesButtonHandler.bind(this)}
          urlChangeHandler={this.urlChangeHandler.bind(this)}/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    articles: ArticlesCollection.find({}, {sort: {createdAt: -1}}).fetch(),
  };
}, ModeratorArticlesContainer)
