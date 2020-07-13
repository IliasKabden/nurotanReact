import React, {Component} from 'react';
import {Link} from 'react-router';
import {addLink} from '../../lib/coreLib.js'

export default class Dictionary extends Component {
  componentWillMount() {
    const styleCss = document.querySelector('[href="/custom/css/style.css"]');
    styleCss.parentNode.removeChild(styleCss);
  }

  componentDidMount() {
    document.removeEventListener('copy', addLink);
  }

  render() {
    const {user} = this.props;

    return (
      <div className="wrapper">
        <header className="main-header">
          <nav className="navbar navbar-static-top">
            <div className="container">
              <div className="navbar-header">
                <Link to="/" className="navbar-brand"><b>Нұр Отан</b></Link>
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
                  <i className="fa fa-bars" />
                </button>
              </div>
              {/* Collect the nav links, forms, and other content for toggling */}
              {/* /.navbar-collapse */}

              <div className="collapse navbar-collapse pull-left" id="navbar-collapse">
                <ul className="nav navbar-nav">
                {user && user.profile.roles.includes('frames') ? "":   
                        user && user.profile.roles.includes('purchase') ?  "":   
                  <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">Главная <span className="caret" /></a>
                    <ul className="dropdown-menu" role="menu">
                      <li><Link to="/moderator/news">Новости</Link></li>
                      <li><Link to="/moderator/projects">Проекты</Link></li>
                        <li><Link to="/moderator/articles">Статьи</Link></li>
                      <li><Link to="/moderator/videos">Видео</Link></li>
                      <li><Link to="/moderator/photos">Фото</Link></li>
                    </ul>
                  </li>
                  }

                   {user && user.profile.roles.includes('frames') ?  "":
                        user && user.profile.roles.includes('purchase') ?  "": 
                  <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">Партия <span className="caret" /></a>
                    <ul className="dropdown-menu" role="menu">
                      <li><Link to="/moderator/party-history">История</Link></li>
                      <li><Link to="/moderator/charter">Устав</Link></li>
                      <li><Link to="/moderator/ppo">ППО</Link></li>
                      <li><Link to="/moderator/leadership">Руководство</Link></li>                     
                      <li><Link to="/moderator/vacancies">Вакансии</Link></li>                    
                      <li><Link to="/moderator/party-curators">Партийные кураторы</Link></li>
                      <li><Link to="/moderator/press-releases">Пресс релизы</Link></li>
                      <li><Link to="/moderator/code">Кодекс этики</Link></li>
                      <li><Link to="/moderator/hot-line">Горячая линия</Link></li>
                      <li><Link to="/moderator/press">Пресс-служба</Link></li>
                      <li><Link to="/moderator/contacts">Контакты</Link></li>
                      <li><Link to="/moderator/central-office">Структура - Центральный аппарат</Link></li>
                      <li><Link to="/moderator/bodies">Структура - Органы партии</Link></li>
                      </ul>                 
                  </li>
                  }

                   {user && user.profile.roles.includes('frames') ?    
                   <li className="dropdown">
                   <a href="#" className="dropdown-toggle" data-toggle="dropdown">Партия <span className="caret" /></a>
                   <ul className="dropdown-menu" role="menu">                                         
                       <li><Link to="/moderator/financial-reports">Финансовая отчетность</Link></li>
                       <li><Link to="/moderator/purchase">Закупки</Link></li>
                       </ul>
                   </li>
                      : ""}

                     { user && user.username === 'b.khasenov' ?                      
                        <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">Закупки <span className="caret" /></a>
                        <ul className="dropdown-menu" role="menu">                                         
                            <li><Link to="/moderator/financial-reports">Финансовая отчетность</Link></li>
                            <li><Link to="/moderator/purchase">Закупки</Link></li>
                            </ul>
                        </li>
                     : ""}

                     { user && user.username === 'a.bimendin' ?  
                       <li className="dropdown">
                       <a href="#" className="dropdown-toggle" data-toggle="dropdown">Закупки <span className="caret" /></a>
                       <ul className="dropdown-menu" role="menu">                                         
                           <li><Link to="/moderator/financial-reports">Финансовая отчетность</Link></li>
                           <li><Link to="/moderator/purchase">Закупки</Link></li>
                           </ul>
                       </li>
                     : ""}

                       { user && user.profile.roles.includes('purchase') ?  
                        <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">Партия <span className="caret" /></a>
                       <ul className="dropdown-menu" role="menu">
                       <li><Link to="/moderator/staff-regions">Кадровый резерв - регионы</Link></li>
                       <li><Link to="/moderator/staff-competetions">Кадровый резерв - конкурсы</Link></li>
                       <li><Link to="/moderator/staff-list">Кадровый резерв - резервистов ближайшего и среднесрочного уровней</Link></li>
                       <li><Link to="/moderator/staff-instructions">Кадровый резерв -Инструкция по формированию республиканского партийного кадрового резерва</Link></li>
                       <li><Link to="/moderator/staff-reservist">Кадровый резерв -Список резервистов республиканского уровня</Link></li>
                     </ul>
                     </li>
                     : ""}

                  {user && user.profile.roles.includes('frames') ? "":    
                        user && user.profile.roles.includes('purchase') ? "":
                  <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">Лидер партии <span className="caret" /></a>
                    <ul className="dropdown-menu" role="menu">
                      <li><Link to="/moderator/speeches">Выступления</Link></li>
                      <li><Link to="/moderator/messages">Послания</Link></li>
                      <li><Link to="/moderator/quotations">Цитаты</Link></li>
                      <li><Link to="/moderator/images">Фото</Link></li>
                    </ul>
                  </li>
                  }

                   {user && user.profile.roles.includes('frames') ?  "": 
                        user && user.profile.roles.includes('purchase') ? "":
                  <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">Фракция <span className="caret" /></a>
                    <ul className="dropdown-menu" role="menu">
                      <li><Link to="/moderator/fraction">О фракции</Link></li>
                      <li><Link to="/moderator/fraction-board">Совет фракции</Link></li>
                      <li><Link to="/moderator/deputy-requests">Депутатские запросы</Link></li>
                      <li><Link to="/moderator/fraction-leadership">Руководство фракции</Link></li>
                    </ul>
                  </li>
                }

                      {user && user.profile.roles.includes('frames') ? "":   
                        user && user.profile.roles.includes('purchase') ? "":
                  <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">Программные документы <span className="caret" /></a>
                    <ul className="dropdown-menu" role="menu">
                      <li><Link to="/moderator/doctrine">Доктрина</Link></li>
                      <li><Link to="/moderator/election">Предвыборная программа</Link></li>
                      <li><Link to="/moderator/anti-corruption">Антикоррупционная программа</Link></li>
                    </ul>
                  </li>
                  }

                   {user && user.profile.roles.includes('frames') ? "":   
                        user && user.profile.roles.includes('purchase') ? "": 
                  <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">Регионы <span className="caret" /></a>
                    <ul className="dropdown-menu" role="menu">
                      <li><a href="/moderator/regions\?id=1">Западно-Казахстанская</a></li>
                      <li><a href="/moderator/regions\?id=2">Атырауская</a></li>
                      <li><a href="/moderator/regions\?id=3">Мангистауская</a></li>
                      <li><a href="/moderator/regions\?id=4">Актюбинская</a></li>
                      <li><a href="/moderator/regions\?id=5">Костанайская</a></li>
                      <li><a href="/moderator/regions\?id=6">Кызылординская</a></li>
                      <li><a href="/moderator/regions\?id=7">Северо-Казахстанская</a></li>
                      <li><a href="/moderator/regions\?id=8">Акмолинская</a></li>
                      <li><a href="/moderator/regions\?id=9">Астана</a></li>
                      <li><a href="/moderator/regions\?id=10">Карагандинская</a></li>
                      <li><a href="/moderator/regions\?id=11">Южно-Казахстанская</a></li>
                      <li><a href="/moderator/regions\?id=12">Жамбылская</a></li>
                      <li><a href="/moderator/regions\?id=13">Павлодарская</a></li>
                      <li><a href="/moderator/regions\?id=14">Восточно-Казахстанская</a></li>
                      <li><a href="/moderator/regions\?id=15">Алматинская</a></li>
                      <li><a href="/moderator/regions\?id=16">Алматы</a></li>
                    </ul>
                  </li>
                }

                  {user && user.profile.roles.includes('superadmin') ? <li className="dropdown"><a href="/moderator/users">Пользователи</a></li> : ""}
                  <li className="dropdown">
                    <a onClick={this.props.logoutHandler} href="#" className="dropdown-toggle" data-toggle="dropdown">Выйти</a>
                  </li>
                </ul>
              </div>
              {/* /.navbar-custom-menu */}
            </div>
            {/* /.container-fluid */}
          </nav>
        </header>
        {/* Full Width Column */}
        <div className="clearfix"></div>
        <div className="content-wrapper">
          {this.props.children}
        </div>
        {/* /.content-wrapper */}
        {this.props.footer}
      </div>
    );
  }
}