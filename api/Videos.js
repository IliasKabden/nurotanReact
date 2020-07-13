import {Mongo} from 'meteor/mongo';

export const VideosCollection = new Mongo.Collection('videos');

if(Meteor.isServer) {
  Meteor.publish('KzVideos', () => {
    return VideosCollection.find({'title.kz': {$ne: ""}}, {sort: {createdAt: -1}, limit: 6});
  });

  Meteor.publish('RuVideos', () => {
    return VideosCollection.find({'title.ru': {$ne: ""}}, {sort: {createdAt: -1}, limit: 6});
  });

  Meteor.publish('VideosAll', () => {
    return VideosCollection.find({}, {sort: {createdAt: -1}});
  });

  Meteor.publish('AllKzVideos', (number) => {
    return VideosCollection.find({'title.kz': {$ne: ""}}, {sort: {createdAt: -1}, limit: number});
  });

  Meteor.publish('AllRuVideos', (number) => {
    return VideosCollection.find({'title.ru': {$ne: ""}}, {sort: {createdAt: -1}, limit: number});
  });

  Meteor.methods({
    'videos.add'(data) {
      data.createdBy = Meteor.userId;
      const createdAt = new Date();
      data.createdAt = Date.parse(createdAt);

      VideosCollection.insert(data);
    },
    'videos.remove'(_id) {
      VideosCollection.remove({_id})
    },
    'videos.edit'(_id, data) {
      VideosCollection.update({_id}, {$set: data});
    }
  });
}
