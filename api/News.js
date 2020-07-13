import {Mongo} from 'meteor/mongo';

export const NewsCollection = new Mongo.Collection('news');
export const MainNewsCollection = new Mongo.Collection('mainNews');

import * as cheerio from 'cheerio';
import {HTTP} from 'meteor/http';

if(Meteor.isServer) {
  import {collectionToPagesArray} from '../server/main.js';

  const compareDates = (d1, d2) => {
    return d1.getDate() === d2.getDate()
            && d1.getMonth() === d2.getMonth()
            && d1.getFullYear() === d2.getFullYear();
  }

  Meteor.publish('KzNews', () => {
    return NewsCollection.find({deleted: {$ne: true}, 'title.kz': {$ne: ""}}, {sort: {createdAt: -1}, limit: 12});
  });

  Meteor.publish('RuNews', () => {
    return NewsCollection.find({deleted: {$ne: true}, 'title.ru': {$ne: ""}}, {sort: {createdAt: -1}, limit: 12});
  });

  Meteor.publish('AllKzNews', (number, date) => {
    if(!date)
      return NewsCollection.find({deleted: {$ne: true}, 'title.kz': {$ne: ""}}, {sort: {createdAt: -1}, limit: number});

    const cursor = NewsCollection.find({deleted: {$ne: true},
      'title.kz': {$ne: ""},
      'createdAt': {$gte: Date.parse(date.prevDay), $lt: Date.parse(date.nextDay)}
    }, {
      sort: {createdAt: -1}
    });

    return cursor;
  });

  Meteor.publish('AllRuNews', (number, date) => {
    if(!date)
      return NewsCollection.find({deleted: {$ne: true}, 'title.ru': {$ne: ""}}, {sort: {createdAt: -1}, limit: number});

    const cursor = NewsCollection.find({deleted: {$ne: true},
      'title.ru': {$ne: ""},
      'createdAt': {$gte: Date.parse(date.prevDay), $lt: Date.parse(date.nextDay)}
    }, {
      sort: {createdAt: -1}
    });

    return cursor;
  });

  Meteor.publish('AllRegionKzNews', (number, regionId) => {
    return NewsCollection.find({deleted: {$ne: true}, 'title.kz': {$ne: ""}, region: regionId}, {sort: {createdAt: -1}, limit: number});
  });

  Meteor.publish('AllRegionRuNews', (number, regionId) => {
    return NewsCollection.find({deleted: {$ne: true}, 'title.ru': {$ne: ""}, region: regionId}, {sort: {createdAt: -1}, limit: number});
  });

  Meteor.publish('AllNews', (number) => {
    return NewsCollection.find({deleted: {$ne: true}, });
  });

  Meteor.publish('SingleNews', (_id) => {
    return NewsCollection.find({deleted: {$ne: true}, _id});
  });

  Meteor.publish('FractionNews', () => {
    return NewsCollection({});
  });

  Meteor.publish('ProjectNews', () => {
    return NewsCollection.find({deleted: {$ne: true}, project: {$ne: "0"}});
  });

  Meteor.publish('MainNews', () => {
    return NewsCollection.find({deleted: {$ne: true}, mainNews: true}, {sort: {updatedAt: -1}});
  });

  const months = [
    'января','февраля','марта','апреля','мая','июня','июля',
    'августа','сентября','октября','ноября','декабря'
  ];

  const addNewsFromSite = ($, lang) => {
    const title = $('.content h2').text().trim(),
          text = $('.field.field-name-body').html(),
          photo = $('.field.field-name-field-main-image img').attr('src');


    let createdAt = new Date(),
        dateFromSite = $('.content .date').text().trim(),
        arrayFromSite = dateFromSite.split(' ');

    createdAt.setDate(arrayFromSite[1]);
    createdAt.setFullYear(arrayFromSite[3]);
    createdAt.setMonth(months.indexOf(arrayFromSite[2]));

    NewsCollection.insert({title, text, photo, createdAt});
  }

  Meteor.methods({
    'news.add'(data) {
      data.createdBy = Meteor.userId();
      const updatedAt = new Date();
      data.updatedAt = Date.parse(updatedAt);

      const newsId = NewsCollection.insert(data);

      Meteor.call('logs.add', {
        author: Meteor.userId(),
        action: 'news.add',
        objectId: newsId,
        createdAt: data.updatedAt,
      });

      collectionToPagesArray(NewsCollection, 'news');
    },
    'news.remove'(_id) {
      NewsCollection.update({_id}, {$set: {deleted: true}});
      const createdAt = new Date();

      Meteor.call('logs.add', {
        author: Meteor.userId(),
        action: 'news.remove',
        objectId: _id,
        createdAt: Date.parse(createdAt)
      });
    },
    'news.edit'(_id, data) {
      const updatedAt = new Date();
      data.updatedAt = Date.parse(updatedAt);

      NewsCollection.update({_id}, {$set: data});

      Meteor.call('logs.add', {
        author: Meteor.userId(),
        action: 'news.edit',
        objectId: _id,
        createdAt: data.updatedAt
      });
    },
    'news.parse'(start, end) {
      $ = cheerio.load(HTTP.get(`http://nurotan.kz/kz/news/${start}`).content);

      addNewsFromSite($, 'kz');
    }
  });
}
