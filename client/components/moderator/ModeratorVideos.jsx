import React, {Component} from 'react';

export default class ModeratorVideos extends Component {
  render() {
    return (
      <div className="container">
        <section className="content-header">
          <h1>
            Страница добавления и редактирования видео
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
                  <h3 className="box-title">Добавление нового видео</h3>
                </div>
                {/* /.box-header */}
                {/* form start */}
                <form id="moderator-video-form" role="form">
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
                              <h3 className="box-title">Таблица видео</h3>
                              <div className="box-tools pull-right">
                                <div className="has-feedback">
                                  <input type="text" className="form-control input-sm" placeholder="Поиск видео" />
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
                                  <button onClick={this.props.removeVideosButtonHandler} type="button" className="btn btn-default btn-sm"><i className="fa fa-trash-o" /></button>
                                  <button onClick={this.props.editVideoButtonHandler} type="button" className="btn btn-default btn-sm"><i className="fa fa-edit" /></button>
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
                                    {this.props.videosJSX}
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
                                  <button onClick={this.props.removeVideosButtonHandler} type="button" className="btn btn-default btn-sm"><i className="fa fa-trash-o" /></button>
                                  <button onClick={this.props.editVideoButtonHandler} type="button" className="btn btn-default btn-sm"><i className="fa fa-edit" /></button>
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
                            <label>Название видео</label>
                            <input id="video-title-ru-input" placeholder="Введите название видео" className="form-control" defaultValue={""} /><br />
                          </div>
                          <div className="form-group">
                            <label>URL</label><br />
                            <input type="text" className="form-control" id="video-url-ru-input" placeholder="https://www.youtube.com/watch?v=HFlgNoUsr4k"/>
                          </div>
                        </div>
                        {/* /.tab-pane */}
                        <div className="tab-pane" id="tab-kazakh">
                          <div className="form-group">
                            <label>Бейне атауы</label>
                            <input id="video-title-kz-input" placeholder="Введите название видео" className="form-control" defaultValue={""} /><br />
                          </div>
                          <div className="form-group">
                            <label>URL</label><br />
                            <input type="text" className="form-control" id="video-url-kz-input" placeholder="https://www.youtube.com/watch?v=HFlgNoUsr4k"/>
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
                    <button onClick={this.props.addVideoButtonHandler} type="submit" className="btn btn-primary">Добавить видео</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <div className="modal fade" id="video-edit-modal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                <h4 className="modal-title" id="myModalLabel">Редактирование видео/</h4>
              </div>
              <div className="modal-body">
                <form id="modal-video-form" role="form">
                  <div className="col-xs-12">
                    {/* Custom Tabs */}
                    <div className="nav-tabs-custom">
                      <ul className="nav nav-tabs">
                        <li className="active"><a href="#modal-tab-russian" data-toggle="tab">Рус</a></li>
                        <li><a href="#modal-tab-kazakh" data-toggle="tab">Каз</a></li>
                      </ul>
                      <div className="tab-content">
                        <div className="tab-pane active" id="modal-tab-russian">
                          <div className="form-group">
                            <label>Название видео</label>
                            <input name="video-title-ru" placeholder="Введите название видео" className="form-control" defaultValue={""} /><br />
                          </div>
                          <div className="form-group">
                            <label>URL</label><br />
                            <input name="video-url-ru" type="text" className="form-control" placeholder="https://www.youtube.com/watch?v=HFlgNoUsr4k"/>
                          </div>
                        </div>
                        {/* /.tab-pane */}
                        <div className="tab-pane" id="modal-tab-kazakh">
                          <div className="form-group">
                            <label>Бейне атауы</label>
                            <input name="video-title-kz" placeholder="Введите название видео" className="form-control" defaultValue={""} /><br />
                          </div>
                          <div className="form-group">
                            <label>URL</label><br />
                            <input name="video-url-kz" type="text" className="form-control" placeholder="https://www.youtube.com/watch?v=HFlgNoUsr4k"/>
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
                    <button onClick={this.props.addVideoButtonHandler} type="submit" className="btn btn-primary">Добавить видео</button>
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
