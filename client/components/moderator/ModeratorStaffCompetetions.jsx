import React, {Component} from 'react';

export default class ModeratorStaffCompetetions extends Component {
  componentDidMount() {
    $.getScript('/custom/plugins/ckeditor/ckeditor.js', () => {
      CKEDITOR.replace('textEditorRu');
      CKEDITOR.replace('textEditorKz');
      CKEDITOR.replace('modalTextEditorRu');
      CKEDITOR.replace('modalTextEditorKz');
    });
  }

  render() {
    const {editStaffCompetetionsButtonHandler, removeStaffCompetetionsButtonHandler} = this.props;

    return (
      <div>
        <div className="container">
          <section className="content-header">
            <h1>
              Страница добавления и редактирования кадрового резерва - конкурсы
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
                    <h3 className="box-title">Добавление новой кадрового резерва - конкурсы</h3>
                  </div>
                  {/* /.box-header */}
                  {/* form start */}
                  <form id="moderator-staffCompetetions-form" role="form">
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
                                <button onClick={removeStaffCompetetionsButtonHandler} type="button" className="btn btn-default btn-sm">
                                  <i className="fa fa-trash-o" />
                                </button>
                                <button onClick={editStaffCompetetionsButtonHandler} type="button" className="btn btn-default btn-sm">
                                  <i className="fa fa-edit" />
                                </button>
                              </div>
                            </div>
                            <div className="table-responsive">
                              <table className="table table-bordered">
                                <tbody>
                                  <tr>
                                    <th></th>
                                    <th>Заголовок</th>
                                    <th>Тақырыптама</th>
                                    <th>Дата</th>
                                  </tr>
                                  {this.props.staffCompetetionsJSX}
                                </tbody>
                              </table>
                            </div>
                            <div className="mailbox-controls">
                              <div className="btn-group">
                                <button type="button" className="btn btn-default btn-sm checkbox-toggle">
                                  <i className="fa fa-square-o" />
                                </button>
                                <button onClick={removeStaffCompetetionsButtonHandler} type="button" className="btn btn-default btn-sm">
                                  <i className="fa fa-trash-o" />
                                </button>
                                <button onClick={editStaffCompetetionsButtonHandler} type="button" className="btn btn-default btn-sm">
                                  <i className="fa fa-edit" />
                                </button>
                              </div>
                            </div>
                          </div>
                          {/* /.tab-pane */}
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
                              <label>Название</label>
                              <input
                                data-state-name="titleru"
                                onChange={this.props.dateChangeHandler}
                                name="title-ru"
                                value={this.props.titleRuValue}
                                className="form-control"/><br />
                            </div>
                            <div className="form-group">
                              <label>Текст</label>
                              <textarea id="textEditorRu" placeholder="Введите текст" className="form-control" rows={16} defaultValue={""} />
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
                              <label>Тақырыптама</label>
                              <input
                                data-state-name="titlekz"
                                onChange={this.props.dateChangeHandler}
                                name="title-kz"
                                value={this.props.titleKzValue}
                                className="form-control"/><br />
                            </div>
                            <div className="form-group">
                              <label>Мәтін</label>
                              <textarea id="textEditorKz" placeholder="Жарыс мәтіні жазыныз" className="form-control" rows={16} defaultValue={""} />
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
                      <button onClick={this.props.addStaffCompetetionsButtonHandler} type="submit" className="btn btn-primary">Добавить конкурс</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
          <div className="modal fade" id="staffCompetetions-edit-modal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                  <h4 className="modal-title" id="myModalLabel">Редактирование кадрового резерва - конкурсы/</h4>
                </div>
                <div className="modal-body">
                  <form id="modal-staffCompetetions-form" role="form">
                    <div className="col-xs-12">
                      {/* Custom Tabs */}
                      <div className="nav-tabs-custom">
                        <ul className="nav nav-tabs">
                          {/* <li className="active"><a href="#modal-general" data-toggle="tab">Общее | Жалпы</a></li> */}
                          <li className="active"><a
                                href="#modal-russian"
                                data-toggle="tab">
                                  Рус
                                </a></li>
                          <li><a
                                href="#modal-kazakh"
                                data-toggle="tab">
                                  Каз
                                </a></li>
                        </ul>
                        <div className="tab-content">
                          {/* /.tab-pane */}
                          <div className="tab-pane active" id="modal-russian">
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
                              <label>Название</label>
                              <input
                                name="competetions-title-ru"
                                placeholder="..."
                                className="form-control"/><br />
                            </div>
                            <div className="form-group">
                              <label>Текст</label>
                              <textarea id="modalTextEditorRu" placeholder="Введите текст" className="form-control" rows={16} defaultValue={""} />
                            </div>
                            <div className="form-group">
                              <label>Файлы: <br/><ul>{this.props.modalBlobsRuJSX}</ul></label><br/>
                              <button data-blob-name="modalBlobsru" onClick={this.props.loadFileButtonHandler}>Добавить файлы</button>
                            </div>
                          </div>
                          {/* /.tab-pane */}
                          <div className="tab-pane" id="modal-kazakh">
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
                              <label>Тақырыптама</label>
                              <input
                                name="competetions-title-kz"
                                placeholder="..."
                                className="form-control"/><br />
                            </div>
                            <div className="form-group">
                              <label>Мәтін</label>
                              <textarea id="modalTextEditorKz" placeholder="Жарыс мәтіні жазыныз" className="form-control" rows={16} defaultValue={""} />
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
      </div>
    );
  }
}
