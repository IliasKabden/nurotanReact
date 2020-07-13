import React, {Component} from 'react';
import {getEditorValue, setEditorValue} from '../../lib/coreLib.js';

export default class DictionaryRegions extends Component {
  componentDidMount() {
    $.getScript('/custom/plugins/ckeditor/ckeditor.js', () => {
      CKEDITOR.replace('leadershipru', {
        height: 700,
        contentsCss : '/custom/css/style.css'
      });
      CKEDITOR.replace('leadershipkz', {
        height: 700,
        contentsCss : '/custom/css/style.css'
      });
      CKEDITOR.replace('contactsru');
      CKEDITOR.replace('contactskz');

      const {currentRegion} = this.props,
            leadershipPlaceholder = '<div id="regions-leader"> <div class="cell-4 small-cell-12 text-center border-grey"> <div class="leadership-f"> <img src="/custom/img/regions/person1.jpg" alt="СапарбаевБердыбек Машбекович"> </div><h3 class="green uppercase">Председатель филиала,аким Актюбинской области</h3> <h2 class="green-bg none-margin">СапарбаевБердыбек Машбекович</h2> </div><div class="cell-4 small-cell-12 text-center border-grey"> <div class="leadership-f"> <img src="/custom/img/regions/person2.jpg" alt="СагиевАйбек Игликович"> </div><h3 class="green uppercase">Первый заместитель председателяАктюбинского областного филиала</h3> <h2 class="green-bg none-margin">СагиевАйбек Игликович</h2> </div></div>',
            contactsPlaceholder = '<ul class="icons-data"><li><img src="/custom/img/icons/location.png" alt="true"><span>030020, г. Актобе, ул.Тургенева, 86 </span></li><li><img src="/custom/img/icons/dom-tel-blue.png" alt="true"><span class="blue uppercase large-text">+7 7132 54 93 45</span></li><li><img src="/custom/img/icons/dom-tel-grey.png" alt="true"><span class="blue uppercase large-text">+7 7132 57 80 61 </span><!-- react-text: 802 --> <!-- /react-text --><span class="grey uppercase">(единый номер по Казахстану)</span></li><li><img src="/custom/img/icons/email-blue.png" alt="true"><span class="blue">aktobe@nurotan.kz</span></li><li class="twitter-contact"><img src="/custom/img/icons/twitter.png" alt="true"><span>@nurotan_Aktobe</span></li></ul>';

      if(currentRegion.leadership) {
        setEditorValue('leadershipru', currentRegion.leadership.ru);
        setEditorValue('leadershipkz', currentRegion.leadership.kz);
      }
      else {
        setEditorValue('leadershipru', leadershipPlaceholder);
        setEditorValue('leadershipkz', leadershipPlaceholder);
      }

      if(currentRegion.contacts) {
        setEditorValue('contactsru', currentRegion.contacts.ru);
        setEditorValue('contactskz', currentRegion.contacts.kz);
      }
      else {
        setEditorValue('contactsru', contactsPlaceholder);
        setEditorValue('contactskz', contactsPlaceholder);
      }

      ;

      this.props.changeState('partyOrganizationsNumber', currentRegion.partyOrganizationsNumber);
      this.props.changeState('territoryBranchesNumber', currentRegion.territoryBranchesNumber);

      this.props.changeState('contactsTitleRu', currentRegion.contactsTitle.ru);
      this.props.changeState('contactsTitleKz', currentRegion.contactsTitle.kz);
    });
  }

  render() {
    const {
      currentRegion, changeHandler, partyOrganizationsNumber,
      territoryBranchesNumber, contactsTitleKz, contactsTitleRu
    } = this.props;

    return (
      <div>
        <section className="content-header">
          <h1>
            {currentRegion.name.ru}
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
                  <h3 className="box-title">Добавление новой новости</h3>
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
                            <label>Руководство</label>
                            <textarea id="leadershipru" name="leadership-ru" placeholder="..." className="form-control" rows={4} defaultValue={""} />
                          </div>
                          <div className="form-group">
                            <label>Название контактов</label>
                            <input value={contactsTitleRu} data-state-name="contactsTitleRu" onChange={changeHandler} className="form-control" type="text" name="contacts-title-ru"/>
                          </div>
                          <div className="form-group">
                            <label>Контакты</label>
                            <textarea id="contactsru" name="contacts-ru" placeholder="..." className="form-control " rows={4} defaultValue={""} />
                          </div>
                          <div className="form-group">
                            <label>Первичных партийных организаций</label>
                            <input data-state-name="partyOrganizationsNumber" onChange={changeHandler} value={partyOrganizationsNumber} className="form-control" type="text" name="party-organizations-number"/>
                          </div>
                          <div className="form-group">
                            <label>Территориальных филиалов</label>
                            <input data-state-name="territoryBranchesNumber" onChange={changeHandler} value={territoryBranchesNumber} className="form-control" type="text" name="territory-branches-number"/>
                          </div>
                        </div>
                        {/* /.tab-pane */}
                        <div className="tab-pane" id="tab-kazakh">
                          <div className="form-group">
                            <label>Руководство</label>
                            <textarea id="leadershipkz" name="leadership-kz" placeholder="..." className="form-control" rows={4} defaultValue={""} />
                          </div>
                          <div className="form-group">
                            <label>Название контактов</label>
                            <input value={contactsTitleKz} data-state-name="contactsTitleKz" onChange={changeHandler} className="form-control" type="text" name="contacts-title-kz"/>
                          </div>
                          <div className="form-group">
                            <label>Контакты</label>
                            <textarea id="contactskz" name="contacts-kz" placeholder="..." className="form-control " rows={4} defaultValue={""} />
                          </div>
                          <div className="form-group">
                            <label>Первичных партийных организаций</label>
                            <input placeholder={currentRegion.partyOrganizationsNumber} data-state-name="partyOrganizationsNumber" onChange={changeHandler} value={partyOrganizationsNumber} className="form-control" type="text" name="party-organizations-number"/>
                          </div>
                          <div className="form-group">
                            <label>Территориальных филиалов</label>
                            <input placeholder={currentRegion.territoryBranchesNumber} data-state-name="territoryBranchesNumber" onChange={changeHandler} value={territoryBranchesNumber} className="form-control" type="text" name="territory-branches-number"/>
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
