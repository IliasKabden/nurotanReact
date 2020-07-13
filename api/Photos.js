import {Mongo} from 'meteor/mongo';

export const PhotosCollection = new Mongo.Collection('photos');

if(Meteor.isServer) {
  Meteor.publish('Photos', () => {
    return PhotosCollection.find({}, {sort: {createdAt: -1}, limit: 5});
  })

  Meteor.publish('AllPhotos', () => {
    return PhotosCollection.find({}, {sort: {createdAt: -1}});
  })

  Meteor.publish('AllKzPhotos', (number, date) => {
    if(!date)
      return PhotosCollection.find({'title.kz': {$ne: ""}}, {sort: {createdAt: -1}, limit: number});

    const cursor = PhotosCollection.find({
      'title.kz': {$ne: ""},
      'createdAt': {$gte: Date.parse(date.prevDay), $lt: Date.parse(date.nextDay)}
    }, {
      sort: {createdAt: -1}
    });

    return cursor;
  });

  Meteor.publish('AllRuPhotos', (number, date) => {
    if(!date)
      return PhotosCollection.find({'title.ru': {$ne: ""}}, {sort: {createdAt: -1}, limit: number});

    const cursor = PhotosCollection.find({
      'title.ru': {$ne: ""},
      'createdAt': {$gte: Date.parse(date.prevDay), $lt: Date.parse(date.nextDay)}
    }, {
      sort: {createdAt: -1}
    });

    return cursor;
  });

  Meteor.methods({
    'photos.add'(data) {
      data.createdBy = Meteor.userId;
      const createdAt = new Date();
      data.createdAt = Date.parse(createdAt);

      PhotosCollection.insert(data);
    },
    'photos.remove'(_id) {
      PhotosCollection.remove({_id})
    },
    'photos.edit'(_id, data) {
      PhotosCollection.update({_id}, {$set: data});
    }
  });
}
