import React, {Component} from 'react';

import {setEditorValue} from '../../lib/coreLib.js';

export default class ModeratorLeadership extends Component {

  componentDidMount() {
    $.getScript('/custom/plugins/ckeditor/ckeditor.js', () => {
      CKEDITOR.replace('formBiographyRu', {
        height: 700,
        contentsCss : '/custom/css/style.css'
      });
      CKEDITOR.replace('formBiographyKz', {
        height: 700,
        contentsCss : '/custom/css/style.css'
      });
      CKEDITOR.replace('formInfoRu', {
        height: 300,
        contentsCss : '/custom/css/style.css'
      });
      CKEDITOR.replace('formInfoKz', {
        height: 300,
        contentsCss : '/custom/css/style.css'
      });
      CKEDITOR.replace('modalBiographyRu', {
        height: 700,
        contentsCss : '/custom/css/style.css'
      });
      CKEDITOR.replace('modalBiographyKz', {
        height: 700,
        contentsCss : '/custom/css/style.css'
      });
      CKEDITOR.replace('modalInfoRu', {
        height: 300,
        contentsCss : '/custom/css/style.css'
      });
      CKEDITOR.replace('modalInfoKz', {
        height: 300,
        contentsCss : '/custom/css/style.css'
      });

      $.fn.modal.Constructor.prototype.enforceFocus = function() {
        modal_this = this
        $(document).on('focusin.modal', function (e) {
          if (modal_this.$element[0] !== e.target && !modal_this.$element.has(e.target).length
          && !$(e.target.parentNode).hasClass('cke_dialog_ui_input_select')
          && !$(e.target.parentNode).hasClass('cke_dialog_ui_input_text')) {
            modal_this.$element.focus()
          }
        })
      };

      this.setEditorValues();

      const photoUploaders = $('[role=uploadcare-uploader]');

      for(let i = 0, len = photoUploaders.length; i < len; i++) {
        var photoUploadWidget = uploadcare.SingleWidget(photoUploaders[i]);
        photoUploadWidget.onChange(this.props.photoChangeHandler);
      }
    });
  }

  setEditorValues() {
    const {currentCharter} = this.props,
          biographyPlaceholder = '<div><h3 class=blue>Биография</h3><p>Родился в городе Чугучак, Китай.<p>В 1961 году семья Кул-Мухаммеда вернулась на историческую родину – Казахстан в село Маканчи Маканчинского района Семипалатинской области (ныне с.Маканчи Урджарского района Восточно-Казахстанской области).<p>В 1982 году окончил Казахский государственный университет им. С.М.Кирова.<p>С 1983 по 1992 годы – научный редактор, старший научный редактор, заведующий редакцией философии, права и социологии, ответственный секретарь – заместитель главного редактора Главной редакции Казахской Советской Энциклопедии (г.Алматы).<p>С 1992 по 1999 годы – директор малого предприятия «Атамура», председатель АОЗТ<p>«Атамура», президент корпорации «Атамура» (г.Алматы).<p>С 1994 по 1999 годы – работа по совместительству (старший преподаватель, доцент, и.о.профессора) в Казахском государственном университете (г.Алматы).<p>В 1995 году защитил кандидатскую диссертацию по истории на тему: «Проблемы социально-политической истории Казахстана ХVIII века и начала ХIХ века» (по материалам дореволюционных русских энциклопедий) .<p>В 1999 году защитил докторскую диссертацию по юридической науке на тему: «Жакып Акпаев и эволюция политико-правовых взглядов деятелей Алаш (конец ХIХ века – начало ХХ века)».<p>С 1999 по 2001 годы – депутат Сената Парламента РК, секретарь Комитета Сената по законодательству и судебно-правовой реформе, председатель Комитета Сената по социально-культурному развитию (г.Астана).<p>В 2001 году решением Президиума ВАК Республики Казахстан от 31.05.2001 присвоено ученое звание профессора по специальности правоведение.<p>С 2001 по 2003 годы – министр культуры, информации и общественного согласия Республики Казахстан (г.Астана).<p>С 2003 по 2006 годы – пресс-секретарь, советник Президента Республики Казахстан (г.Астана).<p>С 2006 по 2007 годы – заместитель Руководителя Администрации Президента Республики Казахстан – пресс-секретарь Президента РК (г.Астана).<p>С 2007 по 2008 годы – аким Кызылординской области (г.Кызылорда).<p>По совместительству в марте 2008 года назначен специальным представителем Президента Республики Казахстан на комплексе «Байконур».<p>С 2008 по 2010 годы – Министр культуры и информации Республики Казахстан (г.Астана).<p>С 2010 по 2012 годы – Министр культуры Республики Казахстан (г.Астана).<p>С 2012 по 2013 годы – Государственный секретарь Республики Казахстан (г.Астана).<p>С 2013 по 2014 годы – Министр культуры и информации Республики Казахстан (г.Астана).<p>С 2014 по 2016 годы – Советник Президента Республики Казахстан (г.Астана).<p>В 2015 году руководил Республиканским общественным штабом (РОШ) в поддержку кандидатуры Нурсултана Назарбаева на президентских выборах.<p>С 6 мая 2016 года – Первый заместитель Председателя партии «Нұр Отан».<p>Автор около десяти монографий, свыше 200 научных и научно-популярных публикаций по вопросам истории Казахстана, теории и истории государства и права, литературоведению, культурологии.<h3 class=blue>Награды</h3><p>Орден «Парасат» (2010)<p>Орден «Курмет» (2004)<p>6 юбилейных медалей<p>Лауреат Государственной премии Республики Казахстан (1996)<p>Почётный гражданин города Астана<p>Почётный гражданин Абайского района.</div>',
          infoPlaceholder = '<p><span class="blue uppercase">Мухтар Абрарулы Кул-Мухаммед</span><!-- react-text: 2210 --> (каз. Мұхтар Абрарұлы Құл-Мұхаммед, 12.12.1960, г.Чугучак, Китай) – государственный и политический деятель Казахстана, кандидат исторических наук, доктор юридических наук, профессор. Казах.';

    setEditorValue('formBiographyRu', biographyPlaceholder);
    setEditorValue('formBiographyKz', biographyPlaceholder);
    setEditorValue('formInfoRu', infoPlaceholder);
    setEditorValue('formInfoKz', infoPlaceholder);
  }

  componentDidUpdate() {
    this.setEditorValues();
  }

  render() {
    const {editLeadershipButtonHandler, removeLeadershipButtonHandler} = this.props;

    return (
      <div>
        <div className="container">
          <section className="content-header">
            <h1>
              Страница добавления и редактирования членов руководства партии
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
                    <h3 className="box-title">Добавление нового члена руководства</h3>
                  </div>
                  {/* /.box-header */}
                  {/* form start */}
                  <form id="moderator-leadership-form" role="form">
                    <div className="col-xs-12">
                      {/* Custom Tabs */}
                      <div className="nav-tabs-custom">
                        <ul className="nav nav-tabs">
                          <li className="active"><a href="#tab-general" data-toggle="tab">Таблица</a></li>
                          <li><a href="#tab-russian" data-toggle="tab">Рус</a></li>
                          <li><a href="#tab-kazakh" data-toggle="tab">Каз</a></li>
                        </ul>
                        <div className="tab-content">
                          <div id="tab-general" className="tab-pane active">
                            <div className="mailbox-controls">
                              <div className="btn-group">
                                <button type="button" className="btn btn-default btn-sm checkbox-toggle">
                                  <i className="fa fa-square-o" />
                                </button>
                                <button onClick={removeLeadershipButtonHandler} type="button" className="btn btn-default btn-sm">
                                  <i className="fa fa-trash-o" />
                                </button>
                                <button onClick={editLeadershipButtonHandler} type="button" className="btn btn-default btn-sm">
                                  <i className="fa fa-edit" />
                                </button>
                              </div>
                            </div>
                            <div className="table-responsive">
                              <table className="table table-bordered">
                                <tbody>
                                  <tr>
                                    <th></th>
                                    <th>Имя (рус)</th>
                                    <th>Имя (каз)</th>
                                    <th>Дата</th>
                                  </tr>
                                  {this.props.leadershipJSX}
                                </tbody>
                              </table>
                            </div>
                            <div className="mailbox-controls">
                              <div className="btn-group">
                                <button type="button" className="btn btn-default btn-sm checkbox-toggle">
                                  <i className="fa fa-square-o" />
                                </button>
                                <button onClick={removeLeadershipButtonHandler} type="button" className="btn btn-default btn-sm">
                                  <i className="fa fa-trash-o" />
                                </button>
                                <button onClick={editLeadershipButtonHandler} type="button" className="btn btn-default btn-sm">
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
                              <label>Полное имя</label>
                              <input name="full-name-ru" className="form-control" /><br />
                            </div>
                            <div className="form-group">
                              <label>Должность</label>
                              <input name="position-ru" className="form-control" /><br />
                            </div>
                            <div className="form-group">
                              <label>Краткое содержание</label>
                              <textarea id="formInfoRu" placeholder="..." className="form-control" defaultValue={""} />
                            </div>
                            <div className="form-group">
                              <label>Биография</label>
                              <textarea id="formBiographyRu" placeholder="..." className="form-control" defaultValue={""} />
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
                              <label>Полное имя</label>
                              <input name="full-name-kz" className="form-control" /><br />
                            </div>
                            <div className="form-group">
                              <label>Должность</label>
                              <input name="position-kz" className="form-control" /><br />
                            </div>
                            <div className="form-group">
                              <label>Краткое содержание</label>
                              <textarea id="formInfoKz" placeholder="..." className="form-control" defaultValue={""} />
                            </div>
                            <div className="form-group">
                              <label>Биография</label>
                              <textarea id="formBiographyKz" placeholder="..." className="form-control" defaultValue={""} />
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
                      <button onClick={this.props.addLeadershipButtonHandler} type="submit" className="btn btn-primary">Добавить члена руководства</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
          <div className="modal fade" id="leadership-edit-modal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                  <h4 className="modal-title" id="myModalLabel">Редактирование члена руководства/</h4>
                </div>
                <div className="modal-body">
                  <form id="modal-leadership-form" role="form">
                    <div className="col-xs-12">
                      {/* Custom Tabs */}
                      <div className="nav-tabs-custom">
                        <ul className="nav nav-tabs">
                          <li className="active">
                              <a
                                href="#modal-russian"
                                data-toggle="tab">
                                  Рус
                              </a>
                          </li>
                          <li>
                              <a
                                href="#modal-kazakh"
                                data-toggle="tab">
                                  Каз
                              </a>
                          </li>
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
                              <label>Полное имя</label>
                              <input name="full-name-ru" className="form-control" /><br />
                            </div>
                            <div className="form-group">
                              <label>Должность</label>
                              <input name="position-ru" className="form-control" /><br />
                            </div>
                            <div className="form-group">
                              <label>Краткое содержание</label>
                              <textarea id="modalInfoRu" placeholder="..." className="form-control"/>
                            </div>
                            <div className="form-group">
                              <label>Биография</label>
                              <textarea id="modalBiographyRu" placeholder="..." className="form-control"/>
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
                              <label>Полное имя</label>
                              <input name="full-name-kz" className="form-control" /><br />
                            </div>
                            <div className="form-group">
                              <label>Должность</label>
                              <input name="position-kz" className="form-control" /><br />
                            </div>
                            <div className="form-group">
                              <label>Краткое содержание</label>
                              <textarea id="modalInfoKz" placeholder="..." className="form-control"/>
                            </div>
                            <div className="form-group">
                              <label>Биография</label>
                              <textarea id="modalBiographyKz" placeholder="..." className="form-control"/>
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
