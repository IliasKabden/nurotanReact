if(Meteor.isClient) {
  export const qs = document.querySelector.bind(document),
               qsa = document.querySelectorAll.bind(document);

  //FOR ADDING SCRIPT ON THE RUN
  export const addScript = (attrs) => {
      if (qs(`[src='${attrs.src}']`))
          return;

      const script = document.createElement('script');

      script.setAttribute('type', 'text/javascript');

      for (key in attrs) {
          script.setAttribute(key, attrs[key]);
      };

      document.body.appendChild(script);
  }

  export const removeScript = (script) => {
      script.parentNode.removeChild(script);
  }

  export const addStyle = (attrs) => {
      if (qs(`[href='${attrs.href}']`))
          return;

      const style = document.createElement('link');

      style.setAttribute('rel', 'stylesheet');

      for (key in attrs) {
          style.setAttribute(key, attrs[key]);
      };

      document.head.appendChild(style);
  }

  export const removeStyle = (attrs) => {
      const style = qs(`[href='${attrs.href}']`);
      if (style)
          style.parentNode.removeChild(style);
  }

  export const prepareCarousels = () => {
      $('.period').owlCarousel({
          loop: true,
          items: 1,
          margin: 10,
          nav: true,
          pagination: true,
          navText: ["<", ">"],
          responsive: {
              0: {
                  items: 1
              },
              960: {
                  items: 1
              }
          }
      });
  }

  export const prepareColumnsDevelopments = () => {
      $('.columns-developments').owlCarousel({
          loop: true,
          items: 1,
          margin: 10,
          nav: true,
          pagination: true,
          navText: ["<", ">"]
      });
  }

  export const setEditorValue = (id, text) => {
      CKEDITOR.instances[id].setData(text);
  }

  export const getEditorValue = (id) => {
      return CKEDITOR.instances[id].getData();
  }

  export const setPhotoWidgetValue = (selectorOrElem, value) => {
      const photoWidget = uploadcare.Widget(selectorOrElem);
      photoWidget.value(value);
  }

  export const setJqueryTagValue = (selectorOrElem, value) => {
      $(selectorOrElem).importTags(value);
  }

  export const prepareTwitterFeed = () => {
      const script = qs('[src="https://platform.twitter.com/widgets.js"]');
      if (script) {
          removeScript(script);;
      }

      addScript({
          charset: 'urf-8',
          src: 'https://platform.twitter.com/widgets.js'
      });
  }

  export const prepareFacebookFeed = () => {
      const script = qs('[src="//connect.facebook.net/ru_RU/sdk.js#xfbml=1&version=v2.8"]');
      if (script) {
          removeScript(script);;
      }

      addScript({
          charset: 'urf-8',
          id: 'facebook-jssdk',
          src: '//connect.facebook.net/ru_RU/sdk.js#xfbml=1&version=v2.8'
      });
  }

  export const cookie = {
      set(name, value, days) {
          const d = new Date();
          d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
          const expires = "expires=" + d.toUTCString();
          document.cookie = name + "=" + value + ";" + expires + ";path=/";
      },
      get(cname) {
          const name = cname + "=";
          const ca = document.cookie.split(';');
          for (let i = 0; i < ca.length; i++) {
              let c = ca[i];
              while (c.charAt(0) == ' ') {
                  c = c.substring(1);
              }
              if (c.indexOf(name) == 0) {
                  return c.substring(name.length, c.length);
              }
          }
          return "";
      }
  };

  export const keepRunningTillLoaded = (fName) => {;

      if (fName)
          fName();
      else
          setTimeout(keepRunningTillLoaded.bind(this, fName), 500);
  }

  export const resizeText = (multiplier) => {
      var max = 1.1,
          min = 0.9;

      if (document.body.style.fontSize === "") {
          document.body.style.fontSize = "1.0em";
      }

      if (parseFloat(document.body.style.fontSize) === max || parseFloat(document.body.style.fontSize) === min) {
          document.body.style.fontSize = "1em";
      }

      if (parseFloat(document.body.style.fontSize) < max && parseFloat(document.body.style.fontSize) > min) {
          document.body.style.fontSize = parseFloat(document.body.style.fontSize) + (multiplier * 0.1) + "em";
      }
  }

  export const prepareBurger = () => {

      $('.small-menu .punkt-1.tree-menu').on('click', function() {
          //$('.small-menu .punkt-1.tree-menu .lv-1').removeClass("open");
          $(this).find('.lv-1').toggleClass("open");
          $(this).toggleClass('minus');
      });

      $(".burger").on('click', function() {
          $('.small-menu').toggle();
      });

      $(".big-menu .last a[href='#'], .big-menu .burger a[href='#']").on('click', function(e) {
          e.preventDefault();
      });
  }

  export const addLink = () => {
    //Get the selected text and append the extra info

    var selection = window.getSelection();

    const pagelink = {
      kz: '<br><br>Барлық құқықтар қорғалған. <br>nurotan.kz материалдарын пайдалану барысында сілтеме жасау міндетті. <br>nurotan.kz материалдарын пайдалану барысында: <br>- басылым беттерінде немесе қағаз, таспа және т.б. материал тасығыштардың өзге де түрлерінде пайдаланушы әр кез материалдардың www.nurotan.kz электрондық порталынан алынғандығын көрсетіп отыруы міндетті.',
      ru: '<br><br>Все права защищены. <br>При использовании материалов nurotan.kz гиперссылка обязательна.<br>При использовании материалов nurotan.kz:<br>- в печатных изданиях или в иных формах на материальных носителях - бумага,пленка и т.п., пользователь обязан в каждом случае указывать, что источником материалов является электронный портал www.nurotan.kz.'
    },
      lang = cookie.get('lang');


    copytext = selection + pagelink[lang];

    //Create a new div to hold the prepared text

    newdiv = document.createElement('div');

    //hide the newly created container

    newdiv.style.position = 'absolute';

    newdiv.style.left = '-99999px';

    //insert the container, fill it with the extended text, and define the new selection

    document.body.appendChild(newdiv);

    newdiv.innerHTML = copytext;

    selection.selectAllChildren(newdiv);

    window.setTimeout(function () {
      document.body.removeChild(newdiv);
    }, 100);
  }

  export const getOffset = (el) => {
    el = el.getBoundingClientRect();
    return {
      left: el.left + window.scrollX,
      top: el.top + window.scrollY
    }
  }

  export const areSameDate = (d1, d2) => {
    const date1 = new Date(d1),
          date2 = new Date(d2);

    return date1.getDate() === date2.getDate()
            && date1.getMonth() === date2.getMonth()
            && date1.getFullYear() === date2.getFullYear();
  }
}

export const notReady = (arr) => {
    return !arr || !arr.length;
}
