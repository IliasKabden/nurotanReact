import {Mongo} from 'meteor/mongo';
import * as cheerio from 'cheerio';
import {HTTP} from 'meteor/http';

export const ArticlesCollection = new Mongo.Collection('articles');

if(Meteor.isServer) {
  import {collectionToPagesArray} from '../server/main.js';

  Meteor.publish('AllKzArticles', (number) => {
    return ArticlesCollection.find({deleted: {$ne: true}, lang: 'kz'}, {sort: {createdAt: -1}, limit: number});
  })
  
  Meteor.publish('AllRuArticles', (number) => {
    return ArticlesCollection.find({deleted: {$ne: true}, lang: 'ru'}, {sort: {createdAt: -1}, limit: number});
  })

  Meteor.publish('ModeratorArticles', () => {
    return ArticlesCollection.find({deleted: {$ne: true}, }, {sort: {createdAt: -1}});
  })

  Meteor.publish('KzArticles', () => {
    return ArticlesCollection.find({deleted: {$ne: true}, lang: 'kz'}, {sort: {createdAt: -1}, limit: 4});
  })

  Meteor.publish('RuArticles', () => {
    return ArticlesCollection.find({deleted: {$ne: true}, lang: 'ru'}, {sort: {createdAt: -1}, limit: 4});
  })

  Meteor.publish('AllArticles', (number) => {
    return ArticlesCollection.find({deleted: {$ne: true}, lang: 'ru'}, {sort: {createdAt: -1}, limit: number});
  })

  Meteor.publish('RuRecommendedArticles', () => {
    return ArticlesCollection.find({lang: 'ru', recommendation: true}, {sort: {createdAt: -1}, limit: 3});
  })

  Meteor.publish('KzRecommendedArticles', (number) => {
    return ArticlesCollection.find({lang: 'kz', recommendation: true }, {sort: {createdAt: -1}, limit: 3});
  })

  Meteor.publish('OneArticle', (_id) => {
    return ArticlesCollection.find({_id});
  })


  const fixImages = ($elem, prefix) => {
    const imgs = $elem.filter('img');

    imgs.attr('src', prefix + imgs.attr('src'));

    return $elem;
  }

  const parseWebsite = (url) => {
    $ = cheerio.load(HTTP.get(url).content);

    if(url.includes('liter.kz')) {
      return {
        title: $('#publication_title').text().trim(),
        info: $('#publication_text[style]').text().trim(),
        text: $('#publication_text').next().html().replace(/src="/gm, 'src="http://liter.kz'),
        image: 'http://liter.kz' + $('img.image').prop('src'),
        lang: 'ru'
      }
    }

    if(url.includes('aikyn.kz')) {
      return {
        title: $('[itemprop=headline]').text().trim(),
        info: $('.article-content strong').first().text().trim(),
        text: $('.article-content').html(),
        image: $('.s-feat-img img').prop('src'),
        lang: 'kz'
      }
    }

    if(url.includes('kazpravda.kz')) {
      return {
        title: $('.article_main_left_block h1').text().trim(),
        info: $('.article_main_left_block .article_lead_block').text().trim(),
        text: $('.article_main_left_block .article_text_block').html().replace(/src="/gm, 'src="http://kazpravda.kz'),
        image: 'http://kazpravda.kz' + $('.article_main_left_block .article_img_block img').prop('src'),
        lang: 'ru'
      }
    }

    if(url.includes('egemen.kz')) {
      return {
        title: $('#post-page-title h3').text().trim(),
        info: $('#post-page-subtitle').text().trim(),
        text: $('#post-content').html(),
        image: $('#post-content img.size-full').attr('src'),
        lang: 'kz'
      }
    }
  }

  Meteor.methods({
    'articles.add'(data) {
      data.createdBy = Meteor.userId();

      const articleId = ArticlesCollection.insert(data);

      Meteor.call('logs.add', {
        author: Meteor.userId(),
        action: 'articles.add',
        objectId: articleId,
        createdAt: data.createdAt
      });

      collectionToPagesArray(ArticlesCollection, 'articles');
    },
    'articles.remove'(_id) {
      ArticlesCollection.update({_id}, {$set: {deleted: true}});
      const createdAt = new Date();

      Meteor.call('logs.add', {
        author: Meteor.userId(),
        action: 'articles.remove',
        objectId: _id,
        createdAt: Date.parse(createdAt)
      });
    },
    'articles.edit'(_id, data) {
      ArticlesCollection.update({_id}, {$set: data});
      const createdAt = new Date();

      Meteor.call('logs.add', {
        author: Meteor.userId(),
        action: 'articles.edit',
        objectId: _id,
        createdAt: Date.parse(createdAt)
      });
    },
    'articles.get'(url) {
      return parseWebsite(url);
    }
  });
}
