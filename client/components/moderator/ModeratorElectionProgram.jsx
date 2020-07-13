import React, {Component} from 'react';
import {getEditorValue, setEditorValue} from '../../lib/coreLib.js';

export default class ModeratorElectionProgram extends Component {
  componentDidMount() {
    $.getScript('/custom/plugins/ckeditor/ckeditor.js', () => {
      CKEDITOR.replace('electionProgramru', {
        height: 700,
        contentsCss : '/custom/css/style.css'
      });
      CKEDITOR.replace('electionProgramkz', {
        height: 700,
        contentsCss : '/custom/css/style.css'
      });

      this.setEditorValues();
    });
  }

  componentDidUpdate() {
    this.setEditorValues();
  }

  setEditorValues() {
    const {currentElectionProgram} = this.props,
          currentElectionProgramPlaceholder = '<div><h2 class="green">ПРЕДВЫБОРНАЯ ПРОГРАММА</h2><div class="description-topic"><p><span class="blue uppercase">Предвыборная программа партии «Нұр Отан» </span> разработана в преддверии выборов в Мажилис Парламента Республики Казахстан и утверждена постановлением внеочередного XVII Съезда от 29 января 2016 года.</p></div><img src="/custom/img/program-document/theme-bg.jpg" alt="ПРЕДВЫБОРНАЯ ПРОГРАММА" class="theme-bg w100"></div>';

    if(currentElectionProgram) {
      setEditorValue('electionProgramru', currentElectionProgram.ru);
      setEditorValue('electionProgramkz', currentElectionProgram.kz);
    }
    else {
      setEditorValue('electionProgramru', currentElectionProgramPlaceholder);
      setEditorValue('electionProgramkz', currentElectionProgramPlaceholder);
    }
  }

  render() {
    const {currentElectionProgram} = this.props;

    return (
      <div>
        <section className="content-header">
          <h1>
            Предвыборная программа
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
                  <h3 className="box-title">Редактирование предвыборной программы</h3>
                </div>
                {/* /.box-header */}
                {/* form start */}
                <form id="moderator-news-form" role="form">
                  <div className="col-xs-12">
                    {/* Custom Tabs */}
                    <div className="nav-tabs-custom">
                      <ul className="nav nav-tabs">
                        <li className="active"><a href="#tab-russian" data-lang="ru" data-toggle="tab">Рус</a></li>
                        <li><a href="#tab-kazakh" data-lang="kz" data-toggle="tab">Каз</a></li>
                      </ul>
                      <div className="tab-content">
                        {/* /.tab-pane */}
                        <div className="tab-pane active" id="tab-russian">
                          <div className="form-group">
                            <label>Предвыборная программа</label>
                            <textarea id="electionProgramru" name="leadership-ru" placeholder="..." className="form-control" rows={4} defaultValue={""} />
                          </div>
                          <div className="form-group">
                            <label>Файлы: <br/><ul>{this.props.blobsRuJSX}</ul></label><br/>
                            <button data-blob-name="blobsru" onClick={this.props.loadFileButtonHandler}>Добавить файлы</button>
                          </div>
                        </div>
                        {/* /.tab-pane */}
                        <div className="tab-pane" id="tab-kazakh">
                          <div className="form-group">
                            <label>Предвыборная программа</label>
                            <textarea id="electionProgramkz" name="leadership-kz" placeholder="..." className="form-control" rows={4} defaultValue={""} />
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
                    <button onClick={this.props.editRegionButtonHandler} type="submit" className="btn btn-primary">Сохранить изменения</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
