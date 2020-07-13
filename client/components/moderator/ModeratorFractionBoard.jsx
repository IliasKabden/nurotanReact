import React, {Component} from 'react';
import {getEditorValue, setEditorValue} from '../../lib/coreLib.js';

export default class ModeratorFractionBoard extends Component {
  componentDidMount() {
    $.getScript('/custom/plugins/ckeditor/ckeditor.js', () => {
      CKEDITOR.replace('fractionBoardru', {
        height: 700,
        contentsCss : '/custom/css/style.css'
      });
      CKEDITOR.replace('fractionBoardkz', {
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
    const {currentFractionBoard} = this.props,
          currentFractionBoardPlaceholder = `<div>
                                                <h2 class="green">СОВЕТЫ ПРИ ФРАКЦИИ</h2>
                                                <img src="/custom/img/poster_advice.jpg" alt="СОВЕТЫ ПРИ ФРАКЦИИ" class="theme-bg w100">
                                                <h3 class="green">СОВЕТ ПО ЭКОНОМИЧЕСКОЙ ПОЛИТИКЕ ПРИ ФРАКЦИИ</h3>
                                                <div class="cell-4 small-cell-12 text-center border-grey block-fix">
                                                    <div class="leadership-f"><img src="/custom/img/leadership-frank/leader-f-3.jpg" alt="АРОНОВА ИРИНА ПЕТРОВНА"> </div>
                                                    <h3 class="uppercase">Заместитель Руководителя Фракции</h3>
                                                    <h2 class="green-bg none-margin white">АРОНОВА ИРИНА ПЕТРОВНА</h2> </div>
                                                <div class="cell-4 small-cell-12 text-center border-grey block-fix">
                                                    <div class="leadership-f"><img src="/custom/img/leadership-frank/leader-f-3.jpg" alt="АРОНОВА ИРИНА ПЕТРОВНА"> </div>
                                                    <h3 class="uppercase">Заместитель Руководителя Фракции</h3>
                                                    <h2 class="green-bg none-margin white">АРОНОВА ИРИНА ПЕТРОВНА</h2> </div>
                                                <div class="cell-4 small-cell-12 text-center border-grey block-fix">
                                                    <div class="leadership-f"><img src="/custom/img/leadership-frank/leader-f-3.jpg" alt="АРОНОВА ИРИНА ПЕТРОВНА"> </div>
                                                    <h3 class="uppercase">Заместитель Руководителя Фракции</h3>
                                                    <h2 class="green-bg none-margin white">АРОНОВА ИРИНА ПЕТРОВНА</h2> </div>
                                                <h3 class="green">СОВЕТ ПО ЭКОНОМИЧЕСКОЙ ПОЛИТИКЕ ПРИ ФРАКЦИИ</h3>
                                                <div class="cell-4 small-cell-12 text-center border-grey block-fix">
                                                    <div class="leadership-f"><img src="/custom/img/leadership-frank/leader-f-3.jpg" alt="АРОНОВА ИРИНА ПЕТРОВНА"> </div>
                                                    <h3 class="uppercase">Заместитель Руководителя Фракции</h3>
                                                    <h2 class="green-bg none-margin white">АРОНОВА ИРИНА ПЕТРОВНА</h2> </div>
                                                <div class="cell-4 small-cell-12 text-center border-grey block-fix">
                                                    <div class="leadership-f"><img src="/custom/img/leadership-frank/leader-f-3.jpg" alt="АРОНОВА ИРИНА ПЕТРОВНА"> </div>
                                                    <h3 class="uppercase">Заместитель Руководителя Фракции</h3>
                                                    <h2 class="green-bg none-margin white">АРОНОВА ИРИНА ПЕТРОВНА</h2> </div>
                                                <div class="cell-4 small-cell-12 text-center border-grey block-fix">
                                                    <div class="leadership-f"><img src="/custom/img/leadership-frank/leader-f-3.jpg" alt="АРОНОВА ИРИНА ПЕТРОВНА"> </div>
                                                    <h3 class="uppercase">Заместитель Руководителя Фракции</h3>
                                                    <h2 class="green-bg none-margin white">АРОНОВА ИРИНА ПЕТРОВНА</h2> </div>
                                                <h3 class="green">СОВЕТ ПО ЭКОНОМИЧЕСКОЙ ПОЛИТИКЕ ПРИ ФРАКЦИИ</h3>
                                                <div class="cell-4 small-cell-12 text-center border-grey block-fix">
                                                    <div class="leadership-f"><img src="/custom/img/leadership-frank/leader-f-3.jpg" alt="АРОНОВА ИРИНА ПЕТРОВНА"> </div>
                                                    <h3 class="uppercase">Заместитель Руководителя Фракции</h3>
                                                    <h2 class="green-bg none-margin white">АРОНОВА ИРИНА ПЕТРОВНА</h2> </div>
                                                <div class="cell-4 small-cell-12 text-center border-grey block-fix">
                                                    <div class="leadership-f"><img src="/custom/img/leadership-frank/leader-f-3.jpg" alt="АРОНОВА ИРИНА ПЕТРОВНА"> </div>
                                                    <h3 class="uppercase">Заместитель Руководителя Фракции</h3>
                                                    <h2 class="green-bg none-margin white">АРОНОВА ИРИНА ПЕТРОВНА</h2> </div>
                                                <div class="cell-4 small-cell-12 text-center border-grey block-fix">
                                                    <div class="leadership-f"><img src="/custom/img/leadership-frank/leader-f-3.jpg" alt="АРОНОВА ИРИНА ПЕТРОВНА"> </div>
                                                    <h3 class="uppercase">Заместитель Руководителя Фракции</h3>
                                                    <h2 class="green-bg none-margin white">АРОНОВА ИРИНА ПЕТРОВНА</h2> </div>
                                            </div>`;

    if(currentFractionBoard) {
      setEditorValue('fractionBoardru', currentFractionBoard.ru);
      setEditorValue('fractionBoardkz', currentFractionBoard.kz);
    }
    else {
      setEditorValue('fractionBoardru', currentFractionBoardPlaceholder);
      setEditorValue('fractionBoardkz', currentFractionBoardPlaceholder);
    }
  }

  render() {
    const {currentFractionBoard} = this.props;

    return (
      <div>
        <section className="content-header">
          <h1>
            Совет фракции
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
                  <h3 className="box-title">Редактирование совета фракции</h3>
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
                            <label>Совет фракции</label>
                            <textarea id="fractionBoardru" name="leadership-ru" placeholder="..." className="form-control" rows={4} defaultValue={""} />
                          </div>
                          <div className="form-group">
                            <label>Файлы: <br/><ul>{this.props.blobsRuJSX}</ul></label><br/>
                            <button data-blob-name="blobsru" onClick={this.props.loadFileButtonHandler}>Добавить файлы</button>
                          </div>
                        </div>
                        {/* /.tab-pane */}
                        <div className="tab-pane" id="tab-kazakh">
                          <div className="form-group">
                            <label>Совет фракции</label>
                            <textarea id="fractionBoardkz" name="leadership-kz" placeholder="..." className="form-control" rows={4} defaultValue={""} />
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
                    <button onClick={this.props.editFractionBoardButtonHandler} type="submit" className="btn btn-primary">Сохранить изменения</button>
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
