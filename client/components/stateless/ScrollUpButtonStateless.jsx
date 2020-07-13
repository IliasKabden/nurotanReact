import React, {Component} from 'react';

export default class ScrollUpButtonStateless extends Component {
  componentDidMount() {
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('.scrollup').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });

    $('.scrollup').fadeOut();
  }

  render() {
    return (
      <button style={{ zIndex: '9999', position: 'fixed', bottom: '100px', right: '20px', backgroundColor: 'darkGrey', color: 'white'}} className="scrollup">{this.props.lang === 'kz' ? 'жоғары' : 'вверх'}</button>
    );
  }
}
