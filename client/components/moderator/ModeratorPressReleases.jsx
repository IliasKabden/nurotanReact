import React, {Component} from 'react';

export default class ModeratorPressReleases extends Component {
  componentDidMount() {
    $.getScript('/custom/plugins/ckeditor/ckeditor.js', () => {
      CKEDITOR.replace('textEditorRu');
      CKEDITOR.replace('textEditorKz');
      CKEDITOR.replace('modalTextEditorRu');
      CKEDITOR.replace('modalTextEditorKz');
    });

    $.getScript('/custom/plugins/datatables/datatables.min.js', () => {
      $(this.t).DataTable();
    });
  }

  render() {
    return (
      <div className="container">
        <section className="content-header">
          <h1>
            Страница добавления и редактирования пресс-релизов
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
                  <h3 className="box-title">Добавление новой пресс-релиза</h3>
                </div>
                {/* /.box-header */}
                {/* form start */}
                <form id="moderator-pressRelease-form" role="form">
                  <div className="col-xs-12">
                    {/* Custom Tabs */}
                    <div className="nav-tabs-custom">
                      <ul className="nav nav-tabs">
                        <li className="active"><a href="#tab-table" data-toggle="tab">Таблица</a></li>
                        <li><a href="#tab-russian" data-toggle="tab">Рус</a></li>
                        <li><a href="#tab-kazakh" data-toggle="tab">Каз</a></li>
                      </ul>
                      <div className="tab-content">
                        <div className="tab-pane active" id="tab-table">
                          <div className="box box-primary">
                            <div className="box-header with-border">
                              <h3 className="box-title">Таблица пресс-релизов</h3>
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
                                  <button onClick={this.props.removePressReleasesButtonHandler} type="button" className="btn btn-default btn-sm"><i className="fa fa-trash-o" /></button>
                                  <button onClick={this.props.editPressReleaseButtonHandler} type="button" className="btn btn-default btn-sm"><i className="fa fa-edit" /></button>
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
                                <table ref={(t) => {this.t = t;}} className="display">
                                  <thead>
                                    <tr>
                                      <th>#</th>
                                      <th>Название (рус)</th>
                                      <th>Название (каз)</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {this.props.pressReleasesJSX}
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
                                  <button onClick={this.props.removePressReleasesButtonHandler} type="button" className="btn btn-default btn-sm"><i className="fa fa-trash-o" /></button>
                                  <button onClick={this.props.editPressReleaseButtonHandler} type="button" className="btn btn-default btn-sm"><i className="fa fa-edit" /></button>
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
                        <div className="tab-pane" id="tab-russian">
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
                            <label>Название пресс-релиза</label>
                            <input name="pressRelease-title-ru" placeholder="Введите название пресс-релиза" className="form-control"/>
                          </div>
                          <div className="form-group">
                            <label>Текст пресс-релиза</label>
                            <textarea id="textEditorRu" placeholder="Введите текст пресс-релиза" className="form-control" rows={16} defaultValue={""} />
                          </div>
                          <div className="form-group">
                            <label>Файлы: <br/><ul>{this.props.blobsRuJSX}</ul></label><br/>
                            <button data-blob-name="blobsru" onClick={this.props.loadFileButtonHandler}>Добавить файлы</button>
                          </div>
                        </div>
                        {/* /.tab-pane */}
                        <div className="tab-pane" id="tab-kazakh">
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
                            <label>Название пресс-релиза</label>
                            <input name="pressRelease-title-kz" placeholder="Введите название пресс-релиза" className="form-control"/>
                          </div>
                          <div className="form-group">
                            <label>Текст пресс-релиза</label>
                            <textarea id="textEditorKz" placeholder="Введите текст пресс-релиза" className="form-control" rows={16} defaultValue={""} />
                          </div>
                          <div className="form-group">
                            <label>Файлы: <br/><ul>{this.props.blobsKzJSX}</ul></label><br/>
                            <button data-blob-name="blobskz" onClick={this.props.loadFileButtonHandler}>Добавить файлы</button>
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
                    <button onClick={this.props.addPressReleaseButtonHandler} type="submit" className="btn btn-primary">Добавить пресс-релиза</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <div className="modal fade" id="pressRelease-edit-modal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                <h4 className="modal-title" id="myModalLabel">Редактирование пресс-релиза/</h4>
              </div>
              <div className="modal-body">
                <form id="modal-pressRelease-form" role="form">
                  <div className="col-xs-12">
                    {/* Custom Tabs */}
                    <div className="nav-tabs-custom">
                      <ul className="nav nav-tabs">
                        <li className="active"><a href="#modal-tab-russian" data-toggle="tab">Рус</a></li>
                        <li><a href="#modal-tab-kazakh" data-toggle="tab">Каз</a></li>
                      </ul>
                      <div className="tab-content">
                        {/* /.tab-pane */}
                        <div className="tab-pane active" id="modal-tab-russian">
                          <div className="form-group">
                            <label>Дата |</label><br />
                            <input
                              name="date"
                              className="form-control"
                              data-state-name="modalDate"
                              onChange={this.props.dateChangeHandler}
                              value={this.props.modalDateValue} />
                          </div>
                          <div className="form-group">
                            <label>Название пресс-релиза</label>
                            <input name="pressRelease-title-ru" placeholder="Введите название пресс-релиза" className="form-control"/>
                          </div>
                          <div className="form-group">
                            <label>Текст пресс-релиза</label>
                            <textarea id="modalTextEditorRu" placeholder="Введите текст пресс-релиза" className="form-control" rows={16} defaultValue={""} />
                          </div>
                          <div className="form-group">
                            <label>Файлы: <br/><ul>{this.props.modalBlobsRuJSX}</ul></label><br/>
                            <button data-blob-name="modalBlobsru" onClick={this.props.loadFileButtonHandler}>Добавить файлы</button>
                          </div>
                        </div>
                        {/* /.tab-pane */}
                        <div className="tab-pane" id="modal-tab-kazakh">
                          <div className="form-group">
                            <label>Дата |</label><br />
                            <input
                              name="date"
                              className="form-control"
                              data-state-name="modalDate"
                              onChange={this.props.dateChangeHandler}
                              value={this.props.modalDateValue} />
                          </div>
                          <div className="form-group">
                            <label>Название пресс-релиза</label>
                            <input name="pressRelease-title-kz" placeholder="Введите название пресс-релиза" className="form-control"/>
                          </div>
                          <div className="form-group">
                            <label>Текст пресс-релиза</label>
                            <textarea id="modalTextEditorKz" placeholder="Введите текст пресс-релиза" className="form-control" rows={16} defaultValue={""} />
                          </div>
                          <div className="form-group">
                            <label>Файлы: <br/><ul>{this.props.modalBlobsKzJSX}</ul></label><br/>
                            <button data-blob-name="modalBlobskz" onClick={this.props.loadFileButtonHandler}>Добавить файлы</button>
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
