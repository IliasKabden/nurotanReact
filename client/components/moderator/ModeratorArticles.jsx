import React, {Component} from 'react';

export default class ModeratorArticles extends Component {
  componentDidMount() {
    $.getScript('/custom/plugins/ckeditor/ckeditor.js', () => {
      CKEDITOR.replace('textEditor');
      CKEDITOR.replace('textEditorRu');
      CKEDITOR.replace('textEditorKz');
      CKEDITOR.replace('modalEditor');
    });

    const photoUploaders = $('[role=uploadcare-uploader]');

    for(let i = 0, len = photoUploaders.length; i < len; i++) {
      var photoUploadWidget = uploadcare.SingleWidget(photoUploaders[i]);
      photoUploadWidget.onChange(this.props.photoChangeHandler);
    }
  }

  render() {
    const {urlChangeHandler} = this.props;

    return (
      <div className="container">
        <section className="content-header">
          <h1>
            Страница добавления и редактирования статей
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
                  <h3 className="box-title">Добавление новой статьи</h3>
                </div>
                {/* /.box-header */}
                {/* form start */}
                <form id="moderator-article-form" role="form">
                  <div className="col-xs-12">
                    {/* Custom Tabs */}
                    <div className="nav-tabs-custom">
                      <ul className="nav nav-tabs">
                        <li><a href="#tab-table" data-toggle="tab">Таблица</a></li>
                        <li className="active"><a onFocus={this.props.tabClickHandler} data-tab-name="tabGeneral" href="#tab-general" data-toggle="tab">Общее | Жалпы</a></li>
                        <li><a onFocus={this.props.tabClickHandler} data-tab-name="tabRu" href="#tab-ru" data-toggle="tab">Рус</a></li>
                        <li><a onFocus={this.props.tabClickHandler} data-tab-name="tabKz" href="#tab-kz" data-toggle="tab">Каз</a></li>
                      </ul>
                      <div className="tab-content">
                        <div className="tab-pane" id="tab-table">
                          <div className="box box-primary">
                            <div className="box-header with-border">
                              <h3 className="box-title">Таблица статей</h3>
                              <div className="box-tools pull-right">
                                <div className="has-feedback">
                                  <input type="text" className="form-control input-sm" placeholder="Поиск термина" />
                                  <span className="glyphicon glyphicon-search form-control-feedback" />
                                </div>
                              </div>
                              {/* /.box-tools */}
                            </div>
                            {/* /.box-header */}
                            <div className="box-body no-padding">
                              <div className="mailbox-controls">
                                {/* Check all button */}
                                <button type="button" className="btn btn-default btn-sm checkbox-toggle"><i className="fa fa-square-o" />
                                </button>
                                <div className="btn-group">
                                  <button onClick={this.props.removeArticlesButtonHandler} type="button" className="btn btn-default btn-sm"><i className="fa fa-trash-o" /></button>
                                  <button onClick={this.props.editArticleButtonHandler} type="button" className="btn btn-default btn-sm"><i className="fa fa-edit" /></button>
                                </div>
                                {/* /.btn-group */}
                                <div className="pull-right">
                                  <div className="btn-group">
                                    <button type="button" className="btn btn-default btn-sm"><i className="fa fa-chevron-left" /></button>
                                    <button type="button" className="btn btn-default btn-sm"><i className="fa fa-chevron-right" /></button>
                                  </div>
                                  {/* /.btn-group */}
                                </div>
                                {/* /.pull-right */}
                              </div>
                              <div className="table-responsive mailbox-messages">
                                <table className="table table-hover table-striped">
                                  <tbody>
                                    <tr>
                                      <th></th>
                                      <th>Название статьи</th>
                                      <th>Язык</th>
                                    </tr>
                                    {this.props.articlesJSX}
                                  </tbody>
                                </table>
                                {/* /.table */}
                              </div>
                              {/* /.mail-box-messages */}
                            </div>
                            {/* /.box-body */}
                            <div className="box-footer no-padding">
                              <div className="mailbox-controls">
                                {/* Check all button */}
                                <button type="button" className="btn btn-default btn-sm checkbox-toggle"><i className="fa fa-square-o" />
                                </button>
                                <div className="btn-group">
                                  <button onClick={this.props.removeArticlesButtonHandler} type="button" className="btn btn-default btn-sm"><i className="fa fa-trash-o" /></button>
                                  <button onClick={this.props.editArticleButtonHandler} type="button" className="btn btn-default btn-sm"><i className="fa fa-edit" /></button>
                                </div>
                                {/* /.btn-group */}
                                <div className="pull-right">
                                  <div className="btn-group">
                                    <button type="button" className="btn btn-default btn-sm"><i className="fa fa-chevron-left" /></button>
                                    <button type="button" className="btn btn-default btn-sm"><i className="fa fa-chevron-right" /></button>
                                  </div>
                                  {/* /.btn-group */}
                                </div>
                                {/* /.pull-right */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane active" id="tab-general">
                          <div className="form-group">
                            <label>Адрес | </label><br />
                            <input onChange={urlChangeHandler} name="url" placeholder="http://www.liter.kz/putin_priehal" className="form-control" /><br />
                          </div>
                          <div className="form-group">
                            <label>Название | Тақырыптама</label><br />
                            <input data-state-name="title" onChange={this.props.dateChangeHandler} name="title" placeholder="..." className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Фото</label>
                            <input type="text" name="photo" className="form-control" disabled/> <br />
                          </div>
                          <div className="form-group">
                            <label>Краткое содержание | Қысқаша мазмұны</label><br />
                            <textarea data-state-name="info" onChange={this.props.dateChangeHandler} name="info" className="form-control" rows="5" placeholder="..."></textarea>
                          </div>
                          <div className="form-group">
                            <label>Текст | Жаңалық мәтіні</label><br />
                            <textarea id="textEditor" name="text" className="form-control" rows="20" placeholder="..."></textarea>
                            <input type="hidden" name="lang" />
                          </div>
                          <div className="form-group">
                            <label>Дата и время | </label><br />
                            <input name="date" className="form-control" defaultValue={new Date()}/>
                          </div>
                          <div className="form-group">
                            <label>
                              <input
                                name="recommendation"
                                type="checkbox" />
                              В рекомендации
                            </label>
                          </div>
                        </div>
                        <div className="tab-pane" id="tab-ru">
                          <div className="form-group">
                            <label>Название</label><br />
                            <input data-state-name="title" onChange={this.props.dateChangeHandler} name="ru" placeholder="..." className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Фото</label><br />
                            <input
                              name="photo-ru"
                              type="hidden"
                              role="uploadcare-uploader"
                              className="form-control"
                              />
                          </div>
                          <div className="form-group">
                            <label>Краткое содержание</label><br />
                            <textarea data-state-name="info" onChange={this.props.dateChangeHandler} name="ru" className="form-control" rows="5" placeholder="..."></textarea>
                          </div>
                          <div className="form-group">
                            <label>Текст</label><br />
                            <textarea id="textEditorRu" name="text-ru" className="form-control" rows="20" placeholder="..."></textarea>
                            <input type="hidden" name="lang-manual" />
                          </div>
                          <div className="form-group">
                            <label>Дата и время</label><br />
                            <input name="date-ru" className="form-control" defaultValue={new Date()}/>
                          </div>
                          <div className="form-group">
                            <label>
                              <input
                                name="recommendation-ru"
                                type="checkbox" />
                              В рекомендации
                            </label>
                          </div>
                        </div>
                        <div className="tab-pane" id="tab-kz">
                          <div className="form-group">
                            <label>Тақырыптама</label><br />
                            <input data-state-name="title" onChange={this.props.dateChangeHandler} name="kz" placeholder="..." className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Фото</label><br />
                            <input
                              name="photo-kz"
                              type="hidden"
                              role="uploadcare-uploader"
                              className="form-control"
                              />
                          </div>
                          <div className="form-group">
                            <label>Қысқаша мазмұны</label><br />
                            <textarea data-state-name="info" onChange={this.props.dateChangeHandler} name="kz" className="form-control" rows="5" placeholder="..."></textarea>
                          </div>
                          <div className="form-group">
                            <label>Жаңалық мәтіні</label><br />
                            <textarea id="textEditorKz" name="text-kz" className="form-control" rows="20" placeholder="..."></textarea>
                            <input type="hidden" name="lang-manual" />
                          </div>
                          <div className="form-group">
                            <label>Қосылган уақыты</label><br />
                            <input name="date-kz" className="form-control" defaultValue={new Date()}/>
                          </div>
                          <div className="form-group">
                            <label>
                              <input
                                name="recommendation-kz"
                                type="checkbox" />
                              Ұсыныс
                            </label>
                          </div>
                        </div>
                      </div>
                      {/* /.tab-content */}
                    </div>
                    {/* nav-tabs-custom */}
                  </div>
                  {/* /.box-body */}
                  <div className="box-footer">
                    <button id="add-article-button" onClick={this.props.addArticleButtonHandler} type="submit" className="btn btn-primary">Добавить статью</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <div className="modal fade" id="article-edit-modal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                <h4 className="modal-title" id="myModalLabel">Редактирование статьи/</h4>
              </div>
              <div className="modal-body">
                <form id="modal-article-form" role="form">
                  <div className="col-xs-12">
                    {/* Custom Tabs */}
                    <div className="nav-tabs-custom">
                      <ul className="nav nav-tabs">
                        <li className="active"><a href="#modal-general" data-toggle="tab">Общее | Жалпы</a></li>
                      </ul>
                      <div className="tab-content">
                        <div className="tab-pane active" id="modal-general">
                          <div className="form-group">
                            <label>Название | Тақырыптама</label><br />
                            <input name="title" placeholder="..." className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Фото</label>
                            <input type="text" name="photo" className="form-control" disabled/> <br />
                          </div>
                          <div className="form-group">
                            <label>Краткое содержание | Қысқаша мазмұны</label><br />
                            <textarea name="info" className="form-control" rows="5" placeholder="..."></textarea>
                          </div>
                          <div className="form-group">
                            <label>Текст | Жаңалық мәтіні</label><br />
                            <textarea id="modalEditor" name="text" className="form-control" rows="20" placeholder="..."></textarea>
                            <input type="hidden" name="lang" />
                          </div>
                          <div className="form-group">
                            <label>Дата и время | </label><br />
                            <input name="date" className="form-control"/>
                          </div>
                          <div className="form-group">
                            <label>
                              <input
                                name="recommendation"
                                type="checkbox" />
                              Рекоммендации
                            </label>
                          </div>
                        </div>
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
        </div>
      </div>
    );
  }
}
