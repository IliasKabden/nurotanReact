import {Mongo} from 'meteor/mongo';

export const PressReleasesCollection = new Mongo.Collection('pressReleases');

if(Meteor.isServer) {
  Meteor.publish('PressReleases', () => {
    return PressReleasesCollection.find({}, {sort: {createdAt: -1}, limit: 20});
  });

  Meteor.publish('RuPressReleases', () => {
    return PressReleasesCollection.find({'title.ru': {$ne: ""}}, {sort: {createdAt: -1}, limit: 20});
  })

  Meteor.publish('KzPressReleases', () => {
    return PressReleasesCollection.find({'title.kz': {$ne: ""}}, {sort: {createdAt: -1}, limit: 20});
  })

  Meteor.publish('AllPressReleases', () => {
    return PressReleasesCollection.find({}, {sort: {createdAt: -1}});
  });

  Meteor.methods({
    'pressReleases.add'(data) {
      data.createdBy = Meteor.userId;

      PressReleasesCollection.insert(data);
    },
    'pressReleases.remove'(_id) {
      PressReleasesCollection.remove({_id})
    },
    'pressReleases.edit'(_id, data) {
      PressReleasesCollection.update({_id}, {$set: data});
    }
  });
}
