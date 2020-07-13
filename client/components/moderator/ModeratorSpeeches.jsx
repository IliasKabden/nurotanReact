import React, {Component} from 'react';

export default class ModeratorSpeeches extends Component {
  prepareServices() {
    $.getScript('/custom/plugins/datatables/datatables.min.js', () => {
      $(this.t).DataTable({});
    });

    $.getScript('/custom/plugins/ckeditor/ckeditor.js', () => {
      CKEDITOR.replace('textEditorRu');
      CKEDITOR.replace('textEditorKz');
      CKEDITOR.replace('modalEditorRu');
      CKEDITOR.replace('modalEditorKz');
    });
  }

  componentDidMount() {
    this.prepareServices();
  }

  render() {
    return (
      <div className="container">
        <section className="content-header">
          <h1>
            Страница добавления и редактирования выступлений
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
                  <h3 className="box-title">Добавление нового выступления</h3>
                </div>
                {/* /.box-header */}
                {/* form start */}
                <form id="leader-speech-form" role="form">
                  <div className="col-xs-12">
                    {/* Custom Tabs */}
                    <div className="nav-tabs-custom">
                      <ul className="nav nav-tabs">
                        <li className="active"><a href="#tab-table" data-toggle="tab">Таблица</a></li>
                        <li><a href="#tab-general" data-toggle="tab">Общее</a></li>
                        <li><a href="#tab-russian" data-toggle="tab">Рус</a></li>
                        <li><a href="#tab-kazakh" data-toggle="tab">Каз</a></li>
                      </ul>
                      <div className="tab-content">
                        <div className="tab-pane active" id="tab-table">
                          <div className="box box-primary">
                            <div className="box-header with-border">
                              <h3 className="box-title">Таблица выступлений</h3>
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
                                  <button onClick={this.props.removeSpeechesButtonHandler} type="button" className="btn btn-default btn-sm"><i className="fa fa-trash-o" /></button>
                                  <button onClick={this.props.editSpeechButtonHandler} type="button" className="btn btn-default btn-sm"><i className="fa fa-edit" /></button>
                                </div>
                                {/* /.btn-group */}
                                {/* /.pull-right */}
                              </div>
                              <div className="table-responsive">
                                <table ref={(t) => {this.t = t;}} className="display">
                                  <thead>
                                    <tr>
                                      <th>#</th>
                                      <th>Название (рус)</th>
                                      <th>Название (каз)</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {this.props.speechesJSX}
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
                                  <button onClick={this.props.removeSpeechesButtonHandler} type="button" className="btn btn-default btn-sm"><i className="fa fa-trash-o" /></button>
                                  <button onClick={this.props.editSpeechButtonHandler} type="button" className="btn btn-default btn-sm"><i className="fa fa-edit" /></button>
                                </div>
                                {/* /.btn-group */}
                                {/* /.pull-right */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane" id="tab-general">
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
                            <label>Выберите фотографию</label><br />
                            <input name="photo" type="hidden" role='uploadcare-uploader'/>
                          </div>
                        </div>
                        <div className="tab-pane" id="tab-russian">
                          <div className="form-group">
                            <label>Название выступления</label>
                            <input name="name-ru" placeholder="Введите название выступления" className="form-control" /><br />
                          </div>
                          <div className="form-group">
                            <label>Текст выступления</label>
                            <textarea id="textEditorRu" name="text-ru" placeholder="Введите выступление" className="form-control" rows={16}/>
                          </div>
                        </div>
                        {/* /.tab-pane */}
                        <div className="tab-pane" id="tab-kazakh">
                          <div className="form-group">
                            <label>Название выступления</label>
                            <input name="name-kz" placeholder="Введите название выступления" className="form-control" /><br />
                          </div>
                          <div className="form-group">
                            <label>Текст выступления</label>
                            <textarea id="textEditorKz" name="text-kz" placeholder="Введите выступление" className="form-control" rows={16}/>
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
                    <button onClick={this.props.addSpeechButtonHandler} type="submit" className="btn btn-primary">Добавить выступление</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <div className="modal fade" id="speech-edit-modal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                <h4 className="modal-title" id="myModalLabel">Редактирование выступления/</h4>
              </div>
              <div className="modal-body">
                <form id="modal-leader-speech" role="form">
                  <div className="col-xs-12">
                    {/* Custom Tabs */}
                    <div className="nav-tabs-custom">
                      <ul className="nav nav-tabs">
                        <li className="active"><a href="#modal-tab-general" data-toggle="tab">Общее</a></li>
                        <li><a href="#modal-tab-russian" data-toggle="tab">Рус</a></li>
                        <li><a href="#modal-tab-kazakh" data-toggle="tab">Каз</a></li>
                      </ul>
                      <div className="tab-content">
                        <div className="tab-pane active" id="modal-tab-general">
                          <div className="form-group">
                            <label>Дата |</label><br />
                            <input
                              name="modalDate"
                              className="form-control"
                              data-state-name="modalDate"
                              onChange={this.props.dateChangeHandler}
                              value={this.props.modalDateValue} />
                          </div>
                          <div className="form-group">
                            <label>Выберите фотографию</label><br />
                            <input name="photo" type="hidden" role='uploadcare-uploader'/>
                          </div>
                        </div>
                        {/* /.tab-pane */}
                        <div className="tab-pane" id="modal-tab-russian">
                          <div className="form-group">
                            <label>Название выступления</label>
                            <input name="name-ru" placeholder="Введите название выступления" className="form-control"/><br />
                          </div>
                          <div className="form-group">
                            <label>Текст выступления</label>
                            <textarea id="modalEditorRu" name="text-ru" placeholder="Введите выступление" className="form-control" rows={16} />
                          </div>
                        </div>
                        {/* /.tab-pane */}
                        <div className="tab-pane" id="modal-tab-kazakh">
                          <div className="form-group">
                            <label>Название выступления</label>
                            <input name="name-kz" placeholder="Введите название выступления" className="form-control" /><br />
                          </div>
                          <div className="form-group">
                            <label>Текст выступления</label>
                            <textarea id="modalEditorKz" name="text-kz" placeholder="Введите выступление" className="form-control" rows={16} />
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
        </div>
      </div>
    );
  }
}
