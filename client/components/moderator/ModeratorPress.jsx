import React, {Component} from 'react';
import {getEditorValue, setEditorValue} from '../../lib/coreLib.js';

export default class ModeratorPress extends Component {
  componentDidMount() {
    $.getScript('/custom/plugins/ckeditor/ckeditor.js', () => {
      CKEDITOR.replace('pressru', {
        height: 700,
        contentsCss : '/custom/css/style.css'
      });
      CKEDITOR.replace('presskz', {
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
    const {currentPress} = this.props;

    setEditorValue('pressru', currentPress.ru);
    setEditorValue('presskz', currentPress.kz);
  }

  render() {
    const {currentPress} = this.props;

    return (
      <div>
        <section className="content-header">
          <h1>
            Пресс-служба
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
                  <h3 className="box-title">Редактирование Пресс-службы</h3>
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
                            <label>Пресс-служба</label>
                            <textarea id="pressru" name="leadership-ru" placeholder="..." className="form-control" rows={4} defaultValue={""} />
                          </div>
                          <div className="form-group">
                            <label>Файлы: <br/><ul>{this.props.blobsRuJSX}</ul></label><br/>
                            <button data-blob-name="blobsru" onClick={this.props.loadFileButtonHandler}>Добавить файлы</button>
                          </div>
                        </div>
                        {/* /.tab-pane */}
                        <div className="tab-pane" id="tab-kazakh">
                          <div className="form-group">
                            <label>Пресс-служба</label>
                            <textarea id="presskz" name="leadership-kz" placeholder="..." className="form-control" rows={4} defaultValue={""} />
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
