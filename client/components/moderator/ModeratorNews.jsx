import React, {Component} from 'react';

export default class ModeratorNews extends Component {
  componentDidMount() {
    $.getScript('/custom/plugins/ckeditor/ckeditor.js', () => {
      CKEDITOR.replace('textEditorRu');
      CKEDITOR.replace('textEditorKz');
      CKEDITOR.replace('modalEditorRu');
      CKEDITOR.replace('modalEditorKz');
    });


    const photoUploaders = $('[role=uploadcare-uploader]');

    for(let i = 0, len = photoUploaders.length; i < len; i++) {
      var photoUploadWidget = uploadcare.SingleWidget(photoUploaders[i]);
      photoUploadWidget.onChange(this.props.photoChangeHandler);
    }

    $.getScript('/custom/plugins/datatables/datatables.min.js', () => {
      $(this.t).DataTable();
    });
  }

  render() {
    const {editNewsButtonHandler, removeNewsButtonHandler} = this.props;

    return (
      <div>
        <div className="container">
          <section className="content-header">
            <h1>
              Страница добавления и редактирования новостей
              <small>словарь</small>
            </h1>
            <ol className="breadcrumb">
              <li className="active"><i className="fa fa-dashboard" /> Страница Модератора</li>
            </ol>
          </section>
          <section className="content">
            <div className="row">
              <div className="col-sm-12">
                <div className="box box-primary">
                  <div className="box-header with-border">
                    <h3 className="box-title">Добавление новой новости</h3>
                  </div>
                  {/* /.box-header */}
                  {/* form start */}
                  <form id="moderator-news-form" role="form">
                    <div className="col-xs-12">
                      {/* Custom Tabs */}
                      <div className="nav-tabs-custom">
                        <ul className="nav nav-tabs">
                          <li className="active"><a href="#tab-general" data-toggle="tab">Общее | Жалпы</a></li>
                          <li><a onClick={this.props.tabClickHandler} href="#tab-russian" data-lang="ru" data-toggle="tab">Рус</a></li>
                          <li><a onClick={this.props.tabClickHandler} href="#tab-kazakh" data-lang="kz" data-toggle="tab">Каз</a></li>
                        </ul>
                        <div className="tab-content">
                          <div id="tab-general" className="tab-pane active">
                            <div className="mailbox-controls">
                              <div className="btn-group">
                                <button type="button" className="btn btn-default btn-sm checkbox-toggle">
                                  <i className="fa fa-square-o" />
                                </button>
                                <button onClick={removeNewsButtonHandler} type="button" className="btn btn-default btn-sm">
                                  <i className="fa fa-trash-o" />
                                </button>
                                <button onClick={editNewsButtonHandler} type="button" className="btn btn-default btn-sm">
                                  <i className="fa fa-edit" />
                                </button>
                              </div>
                            </div>
                            <div className="table-responsive">
                              <table ref={(t) => {this.t = t;}} className="display">
                                <thead>
                                  <tr>
                                    <th></th>
                                    <th>Заголовок</th>
                                    <th>Тақырыптама</th>
                                    <th>Дата</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {this.props.newsJSX}
                                </tbody>
                              </table>
                            </div>
                            <div className="mailbox-controls">
                              <div className="btn-group">
                                <button type="button" className="btn btn-default btn-sm checkbox-toggle">
                                  <i className="fa fa-square-o" />
                                </button>
                                <button onClick={removeNewsButtonHandler} type="button" className="btn btn-default btn-sm">
                                  <i className="fa fa-trash-o" />
                                </button>
                                <button onClick={editNewsButtonHandler} type="button" className="btn btn-default btn-sm">
                                  <i className="fa fa-edit" />
                                </button>
                              </div>
                            </div>
                          </div>
                          {/* /.tab-pane */}
                          <div className="tab-pane" id="tab-russian">
                            <div className="form-group">
                              <button
                                className="form-control btn btn-danger"
                                onClick={() => {window.location.reload()}}>
                                Очистить форму
                              </button>
                            </div>
                            <hr />
                            <div className="form-group">
                              <label>Дата</label><br />
                              <input
                                name="date"
                                className="form-control"
                                onChange={this.props.dateChangeHandler}
                                value={this.props.dateValue}
                                data-state-name='date'/>
                            </div>
                            <div className="form-group">
                              <label>Фото</label><br />
                              <input
                                name="photo"
                                type="hidden"
                                role="uploadcare-uploader"
                                className="form-control"
                                onChange={this.props.photoChangeHandler}
                                value={this.props.photoValue}
                                data-state-name='photo'/>
                            </div>
                            <div className="form-group">
                              <label>
                                <input
                                  onClick={this.props.checkChangeHandler}
                                  checked={this.props.mainNewsValue}
                                  data-state-name='mainNews'
                                  name="main-news"
                                  type="checkbox" />
                                  Главная новость
                              </label>
                            </div>
                            <div className="form-group">
                              <label>
                                <input
                                  value={this.props.aboutFractionValue}
                                  name="about-fraction"
                                  type="checkbox"
                                  onClick={this.props.checkChangeHandler}
                                  checked={this.props.aboutFractionValue}
                                  data-state-name='aboutFraction'/> О фракции
                              </label>
                            </div>
                            <div className="form-group">
                              <label>
                                <input
                                  value={this.props.recommendationValue}
                                  name="recommendation"
                                  type="checkbox"
                                  onClick={this.props.checkChangeHandler}
                                  checked={this.props.recommendationValue}
                                  data-state-name='recommendation'/> В рекомендации
                              </label>
                            </div>
                            <div className="form-group">
                              <label>Заголовок</label>
                              <input data-state-name="titleru" onChange={this.props.dateChangeHandler} name="title-ru" placeholder="..." className="form-control" defaultValue={""} /><br />
                            </div>
                            <div className="form-group">
                              <label>Краткое содержание</label>
                              <textarea data-state-name="inforu" onChange={this.props.dateChangeHandler} name="info-ru" placeholder="..." className="form-control" rows={4} defaultValue={""} />
                            </div>
                            <div className="form-group">
                              <label>Текст новости</label>
                              <textarea id="textEditorRu" name="text-ru" placeholder="..." className="form-control " rows={40} defaultValue={""} />
                            </div>
                            <div className="form-group">
                              <label>Проект</label><br />
                              {this.props.projectSelectJSX}
                            </div>
                            <div className="form-group">
                              <label>Регион</label>
                              {this.props.regionSelectJSX}
                            </div>
                            <div className="form-group">
                              <label>Тэги</label>
                              <input data-state-name="tagsru" onChange={this.props.dateChangeHandler} name="tags-ru" placeholder="..." className="form-control" defaultValue={""} /><br />
                            </div>
                          </div>
                          {/* /.tab-pane */}
                          <div className="tab-pane" id="tab-kazakh">
                            <div className="form-group">
                              <button
                                className="form-control btn btn-danger"
                                onClick={() => {window.location.reload()}}>
                                Очистить форму
                              </button>
                            </div>
                            <hr />
                            <div className="form-group">
                              <label>Дата</label><br />
                              <input
                                name="date"
                                className="form-control"
                                onChange={this.props.dateChangeHandler}
                                value={this.props.dateValue}
                                data-state-name='date'/>
                            </div>
                            <div className="form-group">
                              <label>Фото</label><br />
                              <input
                                name="photo"
                                type="hidden"
                                role="uploadcare-uploader"
                                className="form-control"
                                onChange={this.props.photoChangeHandler}
                                value={this.props.photoValue}
                                data-state-name='photo'/>
                            </div>
                            <div className="form-group">
                              <label>
                                <input
                                  onClick={this.props.checkChangeHandler}
                                  checked={this.props.mainNewsValue}
                                  data-state-name='mainNews'
                                  name="main-news"
                                  type="checkbox" /> Негізгі жаңалық
                              </label>
                            </div>
                            <div className="form-group">
                              <label>
                                <input
                                  onClick={this.props.checkChangeHandler}
                                  checked={this.props.aboutFractionValue}
                                  data-state-name='aboutFraction'
                                  name="about-fraction"
                                  type="checkbox" /> Фракция туралы
                              </label>
                            </div>
                            <div className="form-group">
                              <label>
                                <input
                                  name="recommendation"
                                  type="checkbox"
                                  onClick={this.props.checkChangeHandler}
                                  checked={this.props.recommendationValue}
                                  data-state-name='recommendation'/> ұсыныс
                              </label>
                            </div>
                            <div className="form-group">
                              <label>Тақырыптама </label>
                              <input data-state-name="titlekz" onChange={this.props.dateChangeHandler} name="title-kz" placeholder="..." className="form-control" defaultValue={""} /><br />
                            </div>
                            <div className="form-group">
                              <label>Қысқаша мазмұны</label>
                              <textarea data-state-name="infokz" onChange={this.props.dateChangeHandler} name="info-kz" placeholder="..." className="form-control" rows={4} defaultValue={""} />
                            </div>
                            <div className="form-group">
                              <label>Жаңалық мәтіні</label>
                              <textarea id="textEditorKz" name="text-kz" placeholder="..." className="form-control " rows={16} defaultValue={""} />
                            </div>
                            <div className="form-group">
                              <label>Жоба</label><br />
                              {this.props.projectSelectJSX}
                            </div>
                            <div className="form-group">
                              <label>Аймақ</label>
                              {this.props.regionSelectJSX}
                            </div>
                            <div className="form-group">
                              <label>Тэгтер</label>
                              <input data-state-name="tagskz" onChange={this.props.dateChangeHandler} name="tags-kz" placeholder="..." className="form-control" defaultValue={""} /><br />
                            </div>
                          </div>
                          {/* /.tab-pane */}
                        </div>
                        {/* /.tab-content */}
                      </div>
                      {/* nav-tabs-custom */}
                    </div>
                    {/* /.box-body */}
                    <div className="box-footer">
                      <button onClick={this.props.addNewsButtonHandler} type="submit" className="btn btn-primary">Добавить новость</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
          <div className="modal fade" id="news-edit-modal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                  <h4 className="modal-title" id="myModalLabel">Редактирование новости/</h4>
                </div>
                <div className="modal-body">
                  <form id="modal-news-form" role="form">
                    <div className="col-xs-12">
                      {/* Custom Tabs */}
                      <div className="nav-tabs-custom">
                        <ul className="nav nav-tabs">
                          <li className="active"><a href="#modal-general" data-toggle="tab">Общее | Жалпы</a></li>
                          <li><a
                                onClick={this.props.modalTabClickHandler}
                                data-lang="ru"
                                href="#modal-russian"
                                data-toggle="tab">
                                  Рус
                                </a></li>
                          <li><a
                                onClick={this.props.modalTabClickHandler}
                                data-lang="kz"
                                href="#modal-kazakh"
                                data-toggle="tab">
                                  Каз
                                </a></li>
                        </ul>
                        <div className="tab-content">
                          <div className="tab-pane active" id="modal-general">
                            <div className="form-group">
                              <label>Регион | Аймақ</label>
                              {this.props.modalRegionSelectJSX}
                            </div>
                            <div className="form-group">
                              <label>
                                <input name="main-news" type="checkbox" /> Главная новость | Негізгі жаңалық
                              </label>
                            </div>
                            <div className="form-group">
                              <label>
                                <input name="about-fraction" type="checkbox" /> О фракции | Фракция туралы
                              </label>
                            </div>
                            <div className="form-group">
                              <label>
                                <input
                                  name="recommendation"
                                  type="checkbox"/> В рекомендации
                              </label>
                            </div>
                            <div className="form-group">
                              <label>Фото</label><br />
                              <input
                                data-state-name="modalPhoto"
                                value={this.props.modalPhotoValue}
                                name="photo"
                                type="hidden"
                                role='uploadcare-uploader'/>
                            </div>
                            <div className="form-group">
                              <label>Проект (о котором говорится в данной новости)</label><br />
                              {this.props.projectSelectJSX}
                            </div>
                            <div className="form-group">
                              <label>Дата |</label><br />
                              <input
                                name="date"
                                className="form-control"
                                data-state-name="modalDate"
                                onChange={this.props.dateChangeHandler}
                                value={this.props.modalDateValue} />
                            </div>
                          </div>
                          {/* /.tab-pane */}
                          <div className="tab-pane" id="modal-russian">
                            <div className="form-group">
                              <label>Заголовок</label>
                              <input
                                name="title-ru"
                                placeholder="..."
                                className="form-control"
                                data-state-name="modalTitleRu"
                                onChange={this.props.dateChangeHandler}
                                value={this.props.modalTitleRuValue} /><br />
                            </div>
                            <div className="form-group">
                              <label>Краткое содержание</label>
                              <textarea name="info-ru" placeholder="..." className="form-control" rows={4} defaultValue={""} />
                            </div>
                            <div className="form-group">
                              <label>Текст новости</label>
                              <textarea id="modalEditorRu" name="text-ru" placeholder="..." className="form-control" rows={16} defaultValue={""} />
                            </div>
                            <div className="form-group">
                              <label>Тэги</label>
                              <input
                                name="tags-ru"
                                placeholder="..."
                                className="form-control"
                                data-state-name="modalTagsRu"
                                onChange={this.props.dateChangeHandler}
                                value={this.props.modalTagsRuValue} /><br />
                            </div>
                          </div>
                          {/* /.tab-pane */}
                          <div className="tab-pane" id="modal-kazakh">
                            <div className="form-group">
                              <label>Тақырыптама </label>
                              <input
                                name="title-kz"
                                placeholder="..."
                                className="form-control"
                                data-state-name="modalTitleKz"
                                onChange={this.props.dateChangeHandler}
                                value={this.props.modalTitleKzValue} /><br />
                            </div>
                            <div className="form-group">
                              <label>Қысқаша мазмұны</label>
                              <textarea name="info-kz" placeholder="..." className="form-control" rows={4} defaultValue={""} />
                            </div>
                            <div className="form-group">
                              <label>Жаңалық мәтіні</label>
                              <textarea id="modalEditorKz" name="text-kz" placeholder="..." className="form-control " rows={16} defaultValue={""} />
                            </div>
                            <div className="form-group">
                              <label>Тэгтер</label>
                              <input
                                name="tags-kz"
                                placeholder="..."
                                className="form-control"
                                data-state-name="modalTagsKz"
                                onChange={this.props.dateChangeHandler}
                                value={this.props.modalTagsKzValue} /><br />
                            </div>
                          </div>
                          {/* /.tab-pane */}
                        </div>
                        {/* /.tab-content */}
                      </div>
                      {/* nav-tabs-custom */}
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Закрыть</button>
                  <button id="modal-save-button" onClick={this.props.saveChangesButtonHandler} type="button" className="btn btn-primary" data-dismiss="modal">Сохранить изменения</button>
                </div>
              </div>
            </div>
            <iframe
              scrolling="no"
              id="moderator-news-modal-iframe"
              src={"/news-preview?titleru="+this.props.modalTitleRuValue+
                    "&titlekz="+this.props.modalTitleKzValue+
                    "&date="+this.props.modalDateValue+
                    "&photo="+this.props.modalPhotoValue+
                    "&lang="+this.props.modalLang}>
            </iframe>
          </div>
        </div>
        <iframe
          scrolling="no"
          id="moderator-news-iframe"
          src={"/news-preview?titleru="+this.props.titleRuValue+
                "&titlekz="+this.props.titleKzValue+
                "&date="+this.props.dateValue+
                "&photo="+this.props.photoValue+
                "&lang="+this.props.lang}>
        </iframe>
      </div>
    );
  }
}
