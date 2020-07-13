import React, {Component} from 'react';

export default class ModeratorParseNews extends Component {

  render() {

    return (
      <div>
        <div className="container">
          <section className="content-header">
            <h1>
              Страница парсинга новостей
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
                    <h3 className="box-title">Парсинг новостей</h3>
                  </div>
                  {/* /.box-header */}
                  {/* form start */}
                  <form id="moderator-parse-news" role="form">
                    <div className="col-xs-12">
                      {/* Custom Tabs */}
                      <div className="nav-tabs-custom">
                        <ul className="nav nav-tabs">
                          <li className="active"><a href="#tab-general" data-toggle="tab">Таблица</a></li>
                          <li><a onClick={this.props.tabClickHandler} href="#tab-russian" data-lang="ru" data-toggle="tab">Парсинг</a></li>
                        </ul>
                        <div className="tab-content">
                          <div id="tab-general" className="tab-pane active">
                            <div className="table-responsive">
                              <table className="table table-bordered">
                                <tbody>
                                  <tr>
                                    <th></th>
                                    <th>Заголовок</th>
                                    <th>Тақырыптама</th>
                                    <th>Дата</th>
                                  </tr>
                                  {this.props.newsJSX}
                                </tbody>
                              </table>
                            </div>
                          </div>
                          {/* /.tab-pane */}
                          <div className="tab-pane" id="tab-russian">
                            <hr />
                            <div className="form-group">
                              <label>Начало</label><br />
                              <input
                                name="start"
                                className="form-control"
                                data-state-name='start'/>
                            </div>
                            <div className="form-group">
                              <label>Конец</label><br />
                              <input
                                name="end"
                                className="form-control"
                                data-state-name='end'/>
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
                      <button onClick={this.props.parseNewsButtonHandler} type="submit" className="btn btn-primary">Парсить новости</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
