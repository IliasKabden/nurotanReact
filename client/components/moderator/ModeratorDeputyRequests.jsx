import React, {Component} from 'react';

export default class ModeratorDeputyRequests extends Component {
  componentDidMount() {
    $.getScript('/custom/plugins/datatables/datatables.min.js', () => {
      $(this.t).DataTable({
      });
    });
  }

  render() {
    const {stateValueChangeHandler} = this.props;

    return (
      <div className="container">
        <section className="content-header">
          <h1>
            Страница добавления и редактирования депутатских запросов
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
                  <h3 className="box-title">Добавление нового депутатского запроса</h3>
                </div>
                {/* /.box-header */}
                {/* form start */}
                <form id="deputy-request-form" role="form">
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
                              <h3 className="box-title">Таблица депутатских запросов</h3>
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
                                  <button onClick={this.props.removeDeputyRequestsButtonHandler} type="button" className="btn btn-default btn-sm"><i className="fa fa-trash-o" /></button>
                                  <button onClick={this.props.editDeputyRequestButtonHandler} type="button" className="btn btn-default btn-sm"><i className="fa fa-edit" /></button>
                                </div>
                                {/* /.btn-group */}

                                {/* /.pull-right */}
                              </div>
                              <div className="table-responsive">
                                <table ref={(t) => {this.t = t;}} className="display">
                                  <thead>
                                    <tr>
                                      <th>#</th>
                                      <th>Краткое описание (рус)</th>
                                      <th>Краткое описание (каз)</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {this.props.deputyRequestsJSX}
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
                                  <button onClick={this.props.removeDeputyRequestsButtonHandler} type="button" className="btn btn-default btn-sm"><i className="fa fa-trash-o" /></button>
                                  <button onClick={this.props.editDeputyRequestButtonHandler} type="button" className="btn btn-default btn-sm"><i className="fa fa-edit" /></button>
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
                            <label>Дата и рег. номер запроса</label>
                            <input data-state-name="dateAndRegistrationNumber" onChange={stateValueChangeHandler} value={this.props.dateAndRegistrationNumber} name="date-and-registration-number" placeholder="Введите дату и регистрационный номер" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Инициатор запроса</label>
                            <input data-state-name="initiator" onChange={stateValueChangeHandler} value={this.props.initiator} name="initiator" placeholder="ФИО инициатора запроса" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Участники запроса</label>
                            <input data-state-name="participants" onChange={stateValueChangeHandler} value={this.props.participants} name="participants" placeholder="ФИО участников запроса" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Документ: <br/><ul>{this.props.blobsJSX}</ul></label><br/>
                            <button data-blob-name="blobs" onClick={this.props.loadFileButtonHandler}>Добавить файлы</button>
                          </div>
                          <hr />
                          <div className="form-group">
                            <label>Дата и рег. номер ответа</label>
                            <input data-state-name="answerDateAndRegistrationNumber" onChange={stateValueChangeHandler} value={this.props.answerDateAndRegistrationNumber} name="answer-date-and-registration-number" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Документ-ответ: <br/><ul>{this.props.answerBlobsJSX}</ul></label><br/>
                            <button data-blob-name="answerBlobs" onClick={this.props.loadFileButtonHandler}>Добавить файлы</button>
                          </div>
                        </div>
                        <div className="tab-pane" id="tab-russian">
                          <div className="form-group">
                            <label>Адресат</label>
                            <input data-state-name="addresseeru" onChange={stateValueChangeHandler} value={this.props.addresseeru} name="addressee-ru" placeholder="Кому направлен запрос" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Краткое содержание запроса</label>
                            <input name="info-ru" placeholder="краткое содержание запроса" className="form-control" />
                          </div>
                          <hr />
                          <div className="form-group">
                            <label>Краткое содержание ответа</label>
                            <input data-state-name="answerInforu" onChange={stateValueChangeHandler} value={this.props.answerInforu} name="answer-info-ru" className="form-control" />
                          </div>
                        </div>
                        <div className="tab-pane" id="tab-kazakh">
                          <div className="form-group">
                            <label>Адресат</label>
                            <input data-state-name="addresseekz" onChange={stateValueChangeHandler} value={this.props.addresseekz} name="addressee-kz" placeholder="Кому направлен запрос" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Краткое содержание запроса</label>
                            <input data-state-name="inforu" onChange={stateValueChangeHandler} value={this.props.inforu} name="info-kz" placeholder="краткое содержание запроса" className="form-control" />
                          </div>
                          <hr />
                          <div className="form-group">
                            <label>Краткое содержание ответа</label>
                            <input data-state-name="answerInfokz" onChange={stateValueChangeHandler} value={this.props.answerInfokz} name="answer-info-kz" className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /.box-body */}
                  <div className="box-footer">
                    <button onClick={this.props.addDeputyRequestButtonHandler} type="submit" className="btn btn-primary">Добавить депутатский запрос</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <div className="modal fade" id="deputy-request-edit-modal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                <h4 className="modal-title" id="myModalLabel">Редактирование депутатского запроса/</h4>
              </div>
              <div className="modal-body">
                <form id="modal-deputy-request-form" role="form">
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
                              name="date"
                              className="form-control"
                              data-state-name="modalDate"
                              onChange={this.props.dateChangeHandler}
                              value={new Date(this.props.modalDateValue)} />
                          </div>
                          <div className="form-group">
                            <label>Дата и рег. номер запроса</label>
                            <input data-state-name="modalDateAndRegistrationNumber" onChange={stateValueChangeHandler} value={this.props.modalDateAndRegistrationNumber} name="date-and-registration-number" placeholder="Введите дату и регистрационный номер" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Инициатор запроса</label>
                            <input data-state-name="modalInitiator" onChange={stateValueChangeHandler} value={this.props.modalInitiator} name="initiator" placeholder="ФИО инициатора запроса" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Участники запроса</label>
                            <input data-state-name="modalParticipants" onChange={stateValueChangeHandler} value={this.props.modalParticipants} name="participants" placeholder="ФИО участников запроса" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Документ: <br/><ul>{this.props.modalBlobsJSX}</ul></label><br/>
                            <button data-blob-name="modalBlobs" onClick={this.props.loadFileButtonHandler}>Добавить файлы</button>
                          </div>
                          <hr />
                          <div className="form-group">
                            <label>Дата и рег. номер ответа</label>
                            <input data-state-name="modalAnswerDateAndRegistrationNumber" onChange={stateValueChangeHandler} value={this.props.modalAnswerDateAndRegistrationNumber} name="answer-date-and-registration-number" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Документ-ответ: <br/><ul>{this.props.modalAnswerBlobsJSX}</ul></label><br/>
                            <button data-blob-name="modalAnswerBlobs" onClick={this.props.loadFileButtonHandler}>Добавить файлы</button>
                          </div>
                        </div>
                        <div className="tab-pane" id="modal-tab-russian">
                          <div className="form-group">
                            <label>Адресат</label>
                            <input data-state-name="modalAddresseeru" onChange={stateValueChangeHandler} value={this.props.modalAddresseeru} name="addressee-ru" placeholder="Кому направлен запрос" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Краткое содержание запроса</label>
                            <input data-state-name="modalInforu" onChange={stateValueChangeHandler} value={this.props.modalInforu} name="info-ru" placeholder="краткое содержание запроса" className="form-control" />
                          </div>
                          <hr />
                          <div className="form-group">
                            <label>Краткое содержание ответа</label>
                            <input data-state-name="modalAnswerInforu" onChange={stateValueChangeHandler} value={this.props.modalAnswerInforu} name="answer-info-ru" className="form-control" />
                          </div>
                        </div>
                        {/* /.tab-pane */}
                        <div className="tab-pane" id="modal-tab-kazakh">
                          <div className="form-group">
                            <label>Адресат</label>
                            <input data-state-name="modalAddresseekz" onChange={stateValueChangeHandler} value={this.props.modalAddresseekz} name="addressee-kz" placeholder="Кому направлен запрос" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Краткое содержание запроса</label>
                            <input data-state-name="modalInfokz" onChange={stateValueChangeHandler} value={this.props.modalInfokz} name="info-kz" placeholder="краткое содержание запроса" className="form-control" />
                          </div>
                          <hr />
                          <div className="form-group">
                            <label>Краткое содержание ответа</label>
                            <input data-state-name="modalAnswerInfokz" onChange={stateValueChangeHandler} value={this.props.modalAnswerInfokz} name="answer-info-kz" className="form-control" />
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
