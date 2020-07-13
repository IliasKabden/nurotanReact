import {Mongo} from 'meteor/mongo';

export const SpeechesCollection = new Mongo.Collection('speeches');

if(Meteor.isServer) {
  Meteor.publish('Speeches', () => {
    return SpeechesCollection.find({}, {sort: {createdAt: -1}});
  });

  Meteor.publish('KzSpeeches', () => {
    return SpeechesCollection.find({'title.kz': {$ne: ""}}, {sort: {createdAt: -1}, limit: 20});
  });

  Meteor.publish('RuSpeeches', () => {
    return SpeechesCollection.find({'title.ru': {$ne: ""}}, {sort: {createdAt: -1}, limit: 20});
  });

  Meteor.publish('AllSpeeches', () => {
    return SpeechesCollection.find({}, {sort: {createdAt: -1}});
  });

  Meteor.publish('AllKzSpeeches', (number, date) => {
    if(!date)
      return SpeechesCollection.find({'title.kz': {$ne: ""}}, {sort: {createdAt: -1}, limit: number});

    const cursor = SpeechesCollection.find({
      'title.kz': {$ne: ""},
      'createdAt': {$gte: Date.parse(date.prevDay), $lt: Date.parse(date.nextDay)}
    }, {
      sort: {createdAt: -1}
    });

    return cursor;
  });

  Meteor.publish('AllRuSpeeches', (number, date) => {
    if(!date)
      return SpeechesCollection.find({'title.ru': {$ne: ""}}, {sort: {createdAt: -1}, limit: number});

    const cursor = SpeechesCollection.find({
      'title.ru': {$ne: ""},
      'createdAt': {$gte: Date.parse(date.prevDay), $lt: Date.parse(date.nextDay)}
    }, {
      sort: {createdAt: -1}
    });

    return cursor;
  });

  Meteor.methods({
    'speeches.add'(data) {
      data.createdBy = Meteor.userId;

      SpeechesCollection.insert(data);
    },
    'speeches.remove'(_id) {
      SpeechesCollection.remove({_id})
    },
    'speeches.edit'(_id, data) {
      SpeechesCollection.update({_id}, {$set: data});
    }
  });
}
