import React, {Component} from 'react';
import {getEditorValue, setEditorValue} from '../../lib/coreLib.js';

export default class ModeratorDoctrine extends Component {
  componentDidMount() {
    $.getScript('/custom/plugins/ckeditor/ckeditor.js', () => {
      CKEDITOR.replace('doctrineru', {
        height: 700,
        contentsCss : '/custom/css/style.css'
      });
      CKEDITOR.replace('doctrinekz', {
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
    const {currentDoctrine} = this.props,
          currentDoctrinePlaceholder = '<div><h2 class="green">Доктрина</h2><div class="description-topic"><p><span class="blue uppercase">доктрина</span><!-- react-text: 1377 --> партии «Нұр Отан» была вынесена на общественное и внутрипартийное обсуждение в августе 2013 года. Поступило свыше 300 предложений от региональных филиалов, общественных и политических организаций, депутатов Парламента РК, представителей творческой и научной интеллигенции, экспертов, Интернет – пользователей.<!-- /react-text --></p></div><p>С учетом поступивших предложений и замечаний итоговый документ был существенно доработан и принят на XV Съезде партии 18 октября 2013 года.</p><h3>1. МИССИЯ ПАРТИИ «НҰР ОТАН» В XXI ВЕКЕ</h3><p>«Нұр Отан» – народная партия. Мы несем ответственность за судьбу страны. Со дня основания наша партия последовательно воплощала в жизнь масштабные реформы в экономике и политике c целью улучшения условий для развития человека, общества и государства.</p><p>Под руководством Елбасы – основателя Партии – народ Казахстана создал благополучное общество и демократическое государство с динамично развивающейся экономикой. Главным результатом наших усилий стала досрочная реализация основных положений Стратегии «Казахстан-2030».</p><p>Сегодня историческая задача – создание государственности – решена. Это результат единства и согласия, упорного и кропотливого труда, общих устремлений и надежд всех казахстанцев.</p><p>Партия «Нұр Отан» – доминирующая политическая сила, консолидирующая общество и обеспечивающая реализацию Государственного курса Елбасы.</p><p>Доктрина партии определяет миссию «Нұр Отана» в XXI веке и нашу роль в обеспечении эффективной реализации Стратегии «Казахстан-2050».</p><p>Наша миссия – обеспечение эволюционного развития и построение демократического, процветающего, конкурентоспособного и социально ориентированного государства, где каждый целеустремленный, законопослушный и трудолюбивый гражданин будет приносить пользу себе и обществу.</p><h3>Наше главное достояние – Независимость страны</h3><p>Фундаментальная ценность нашего народа – Независимость. Именно благодаря ей стали возможными все успехи Казахстана.</p><p>Независимость – это основа основ.</p><p>Создав прочный фундамент состоявшегося государства, мы и далее будем укреплять единство и согласие нашего народа.</p><p>Все усилия государства, общества и граждан должны быть направлены на укрепление Независимости. Защита государственности – наш долг перед Историей и будущими поколениями.</p></div>';

    if(currentDoctrine) {
      setEditorValue('doctrineru', currentDoctrine.ru);
      setEditorValue('doctrinekz', currentDoctrine.kz);
    }
    else {
      setEditorValue('doctrineru', currentDoctrinePlaceholder);
      setEditorValue('doctrinekz', currentDoctrinePlaceholder);
    }
  }

  render() {
    const {currentDoctrine} = this.props;

    return (
      <div>
        <section className="content-header">
          <h1>
            Доктрина
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
                  <h3 className="box-title">Редактирование Доктрины</h3>
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
                            <label>Доктрина</label>
                            <textarea id="doctrineru" name="leadership-ru" placeholder="..." className="form-control" rows={4} defaultValue={""} />
                          </div>
                          <div className="form-group">
                            <label>Файлы: <br/><ul>{this.props.blobsRuJSX}</ul></label><br/>
                            <button data-blob-name="blobsru" onClick={this.props.loadFileButtonHandler}>Добавить файлы</button>
                          </div>
                        </div>
                        {/* /.tab-pane */}
                        <div className="tab-pane" id="tab-kazakh">
                          <div className="form-group">
                            <label>Доктрина</label>
                            <textarea id="doctrinekz" name="leadership-kz" placeholder="..." className="form-control" rows={4} defaultValue={""} />
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
