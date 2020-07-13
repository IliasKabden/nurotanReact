import { Meteor } from 'meteor/meteor';
import { RegionsCollection } from '../api/Regions.js';
import { NewsCollection } from '../api/News.js';
import { ArticlesCollection } from '../api/Articles.js';

import Fiber from 'fibers';

export const collectionToPagesArray = (Collection, suffix) => {
  const fetchedCollection = Collection.find({}, {
    fields: {
      _id: 1, createdAt: 1
    },
    sort: {
      createdAt: -1
    }
  }).fetch();
  
  
  const pages = [],
    addressSuffix = suffix === 'news' ? 'news' : 'article';

  pages.push({
    page: 'http://nurotan.kz/',
    lastmod: fetchedCollection[0].createdAt,
    changefreq: 'daily'
  });

  pages.push({
    page: 'http://nurotan.kz/news?tab=0',
    lastmod: fetchedCollection[0].createdAt,
    changefreq: 'daily'
  });

  for (let i = 0, len = fetchedCollection.length; i < len; i++) {
    pages.push({
      page: 'http://nurotan.kz/single-' + addressSuffix + '?id=' + fetchedCollection[i]._id + '&amp;lang=ru',
      lastmod: fetchedCollection[i].createdAt
    });

    pages.push({
      page: 'http://nurotan.kz/single-' + addressSuffix + '?id=' + fetchedCollection[i]._id + '&amp;lang=kz',
      lastmod: fetchedCollection[i].createdAt
    });
  }

  sitemaps.add(`/sitemap-${suffix}.xml`, pages);
}

Meteor.startup(() => {

  if (Meteor.isServer) {
    
    const regions = [
      { _id: '1', name: { ru: "Западно-Казахстанская область", kz: "Батыс Қазақстан облысы" } },
      { _id: '2', name: { ru: "Атырауская область", kz: "Атырау облысы" } },
      { _id: '3', name: { ru: "Мангистауская область", kz: "Маңғыстау облысы" } },
      { _id: '4', name: { ru: "Актюбинская область", kz: "Ақтөбе облысы" } },
      { _id: '5', name: { ru: "Костанайская область", kz: "Қостанай облысы" } },
      { _id: '6', name: { ru: "Кызылординская область", kz: "Қызылорда облысы" } },
      { _id: '7', name: { ru: "Северо-Казахстанская область", kz: "Солтүстік Қазақстан облысы" } },
      { _id: '8', name: { ru: "Акмолинская область", kz: "Ақмола облысы" } },
      { _id: '9', name: { ru: "Астана", kz: "Астана" } },
      { _id: '10', name: { ru: "Карагандинская область", kz: "Қарағанды облысы" } },
      { _id: '11', name: { ru: "Южно-Казахстанская область", kz: "Оңтүстік Қазақстан облысы" } },
      { _id: '12', name: { ru: "Жамбылская область", kz: "Жамбыл облысы" } },
      { _id: '13', name: { ru: "Павлодарская область", kz: "Павлодар облысы" } },
      { _id: '14', name: { ru: "Восточно-Казахстанская область", kz: "Шығыс Қазақстан облысы" } },
      { _id: '15', name: { ru: "Алматинская область", kz: "Алматы облысы" } },
      { _id: '16', name: { ru: "Алматы", kz: "Алматы" } }
    ];

    regions.forEach((region) => {
      if (RegionsCollection.find({ _id: region._id }).count() === 0) {
        RegionsCollection.insert(region);
      }
    });

    if (!Meteor.users.find({ username: 'superadmin' }).count()) {
      Accounts.createUser({
        username: 'superadmin',
        email: 'superadmin@nurotan.kz',
        password: 'NURotanADMIN2016',
        profile: {
          roles: ['superadmin']
        }
      });
    }

    if(!Meteor.users.find({username: 'frames'}).count()) {
      Accounts.createUser({
        username: 'frames',
        email : 'frames@nurotan.kz',
        password :  'NURotanFrames2018',
        profile: {
           roles: ['frames']
        }
      });
    }

    if(!Meteor.users.find({username: 'purchase'}).count()) {
      Accounts.createUser({
        username: 'purchase',
        email : 'purchase@nurotan.kz',
        password :  'NURotanpurchase2018',
        profile: {
           roles: ['purchase']
        }
      });
    }

    collectionToPagesArray(ArticlesCollection, 'articles');
    collectionToPagesArray(NewsCollection, 'news');
    
    WebApp.connectHandlers.use(function (req, res, next) {
      Fiber(function () {
        if (req.originalUrl === '/') {
          const description = {
            ru: "Нұр Отан официальный сайт Партии",
            kz: "Нұр Отан Партиясының ресми сайты"
          };

          let lang;

          if (req.cookies.lang)
            lang = req.cookies.lang;
          else
            lang = 'ru';

          req.dynamicHead =
            `
            <title>${description[lang]}</title>
            <meta name="Keywords" content="общественная приемная нур отан астана, нур отан астана кенесары, написать письмо в нуротан, нұр отан партиясы, нур отан вакансии, как вступить в партию нур отан, нур отан астана центральный аппарат, нур отан шымкент, нур отан сайт, нур отан новости, нур отан общественная приемная, нур отан астана">
            <meta name="description" content="${description[lang]}">
            <link rel="canonical" href="http://nurotan.kz">
            <link rel="shortlink" href="http://nurotan.kz">
            <meta property="og:title" content="${description[lang]}">
            <meta property="og:description" content="${description[lang]}">
            <meta property="og:url" content="http://nurotan.kz">${req.dynamicHead || ""}`;
        }

        else if (req.originalUrl.includes('single-news')) {
          if (req.id != 0) {
            const query = req.originalUrl.split('?')[1],
              id = query.split('&')[0].split('=')[1].trim(),
              lang = query.split('&')[1] ? query.split('&')[1].split('=')[1].trim() : 'kz',
              currentNews = NewsCollection.find({ _id: id }).fetch()[0];
            if (currentNews == null) {
              res.writeHead(307, {
                Location: '/notfound'
              })
              res.end();
            }
            else {
              locale = lang === 'ru' ? 'ru_RU' : 'kk_KZ';
              if (lang != 'ru' & lang != 'kz') {
                res.writeHead(307, {
                  Location: '/notfound'
                })
                res.end();
              }
              else {
                createdAt = new Date(currentNews.createdAt);
                req.dynamicHead =
                  `
                            <title>${currentNews.title[lang].replace(/["']/gm, '&quot;').trim()}</title>
                            <meta name="Keywords" content="${currentNews.tags ? currentNews.tags[lang].replace(/["']/gm, '&quot;').trim() : "общественная приемная нур отан астана, нур отан астана кенесары, написать письмо в нуротан, нұр отан партиясы, нур отан вакансии, как вступить в партию нур отан, нур отан астана центральный аппарат, нур отан шымкент, нур отан сайт, нур отан новости, нур отан общественная приемная, нур отан астана"}">
                            <meta name="description" content="${currentNews.title[lang].replace(/["']/gm, '&quot;').trim()}">
                            <meta name="twitter:title" content="${currentNews.title[lang].replace(/["']/gm, '&quot;').trim()}">
                            <link rel="canonical" href="http://nurotan.kz${req.originalUrl.trim()}">
                            <link rel="shortlink" href="http://nurotan.kz${req.originalUrl.trim()}">
                            <meta name="twitter:description" content="${currentNews.title[lang].replace(/["']/gm, '&quot;').trim()}">
                            <meta name="twitter:card" content="summary_large_image">
                            <meta name="twitter:site" content="@Nur_Otan">
                            <meta name="twitter:creator" content="@Nur_Otan">
                            <meta name="twitter:image" content="${currentNews.photo}-/scale_crop/438x220/-/quality/best/">
                            <meta property="og:locale" content="ru_RU">
                            <meta property="og:locale:alternate" content="kk_KZ">
                            <meta property="og:type" content="website">
                            <meta property="og:title" content="${currentNews.title[lang].replace(/["']/gm, '&quot;').trim()}">
                            <meta property="og:description" content="${currentNews.title[lang].replace(/["']/gm, '&quot;').trim()}">
                            <meta property="og:url" content="http://nurotan.kz${req.originalUrl.trim()}">
                            <meta property="og:image" content="${currentNews.photo}-/scale_crop/438x220/-/quality/best/">${req.dynamicHead || ""}`;
              }
            }
          }
          else {
            res.writeHead(307, {
              Location: '/notfound'
            })
            res.end();
          }
        }

        else if (req.originalUrl.includes('single-article')) {
          const query = req.originalUrl.split('?')[1],
            id = query.split('&')[0].split('=')[1].trim(),
            lang = query.split('&')[1].split('=')[1].trim(),
            currentArticle = ArticlesCollection.find({ _id: id }).fetch()[0],
            locale = currentArticle.lang === 'ru' ? 'ru_RU' : 'kk_KZ',
            createdAt = new Date(currentArticle.createdAt);

          if (currentArticle == null) {
            res.writeHead(307, {
              Location: '/notfound'
            })
            res.end();
          }
          else {
            req.dynamicHead =
              `
            <title>${currentArticle.title.replace(/["']/gm, '&quot;').trim()}</title>
            <meta name="Keywords" content="общественная приемная нур отан астана, нур отан астана кенесары, написать письмо в нуротан, нұр отан партиясы, нур отан вакансии, как вступить в партию нур отан, нур отан астана центральный аппарат, нур отан шымкент, нур отан сайт, нур отан новости, нур отан общественная приемная, нур отан астана">
            <meta name="description" content="${currentArticle.title.replace(/["']/gm, '&quot;').trim()}">
            <link rel="canonical" href="http://nurotan.kz${req.originalUrl.trim()}">
            <link rel="shortlink" href="http://nurotan.kz${req.originalUrl.trim()}">
            <meta name="twitter:title" content="${currentArticle.title.replace(/["']/gm, '&quot;').trim()}">
            <meta name="twitter:description" content="${currentArticle.title.replace(/["']/gm, '&quot;').trim()}">
            <meta name="twitter:card" content="summary_large_image"><meta name="twitter:site" content="@Nur_Otan">
            <meta name="twitter:creator" content="@Nur_Otan">
            <meta name="twitter:image" content="${currentArticle.photo}-/scale_crop/438x220/-/quality/best/">
            <meta property="og:locale" content="ru_RU">
            <meta property="og:locale:alternate" content="kk_KZ">
            <meta property="og:type" content="website">
            <meta property="og:title" content="${currentArticle.title.replace(/["']/gm, '&quot;').trim()}">
            <meta property="og:description" content="${currentArticle.title.replace(/["']/gm, '&quot;').trim()}">
            <meta property="og:url" content="http://nurotan.kz${req.originalUrl.trim()}">
            <meta property="og:image" content="${currentArticle.photo}-/scale_crop/438x220/-/quality/best/">${req.dynamicHead || ""}`;
          }


        }
        else {
          const description = {
            ru: "Нұр Отан официальный сайт Партии",
            kz: "Нұр Отан Партиясының ресми сайты"
          };

          let lang;

          if (req.cookies && req.cookies.lang)
            lang = req.cookies.lang;
          else
            lang = 'ru';

          req.dynamicHead =
            `
            <title>${description[lang]}</title>
            <meta name="Keywords" content="общественная приемная нур отан астана, нур отан астана кенесары, написать письмо в нуротан, нұр отан партиясы, нур отан вакансии, как вступить в партию нур отан, нур отан астана центральный аппарат, нур отан шымкент, нур отан сайт, нур отан новости, нур отан общественная приемная, нур отан астана">
            <meta name="description" content="${description[lang]}">
            <link rel="canonical" href="http://nurotan.kz">
            <link rel="shortlink" href="http://nurotan.kz">
            <meta property="og:title" content="${description[lang]}">
            <meta property="og:description" content="${description[lang]}">
            <meta property="og:url" content="http://nurotan.kz">${req.dynamicHead || ""}`;
        }
        next();
      }).run();
    });
  }
});
