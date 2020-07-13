import React, {Component} from 'react';

export default class CategoriesBlockStateless extends Component {
  render() {
    const {lang, categories} = this.props,
          categoriesJSX = categories.map((category) => {
            return (
              <div
                onMouseOut={(e)=>{e.currentTarget.style.backgroundColor = ''}}
                onMouseOver={(e)=>{e.currentTarget.style.backgroundColor = 'lightGrey'}}
                key={category._id}
                className="mini-news cell-5"
                style={{cursor: "pointer"}}>
                <storng style={{background: 'none', textAlign: 'center'}}className="category">{category.name[lang]}</storng>
              </div>
            );
          });

    return (
      <div className="cell-6">
        <ul>
          <li><a href="#" className="active">Все категории</a></li>
          <li><a href="#">Популярное</a></li>
          <li className="right"><a href="#" className="active">Календарь <span className="calendar active" /></a>
          </li>
        </ul>
        <div className="blog-description-news">
          {categoriesJSX}
          <button style={{marginTop: '1em'}} className="load-more" type="button">Показать все <span className="theme-load">Категории</span></button>
        </div>
      </div>
    );
  }
}
