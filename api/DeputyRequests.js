import {Mongo} from 'meteor/mongo';

export const DeputyRequestsCollection = new Mongo.Collection('deputyRequests');

if(Meteor.isServer) {
  Meteor.publish('DeputyRequests', () => {
    return DeputyRequestsCollection.find({deleted: {$ne: true}}, {sort: {createdAt: -1}, limit: 20});
  });

  Meteor.publish('KzDeputyRequests', () => {
    return DeputyRequestsCollection.find({deleted: {$ne: true}, 'info.kz': {$ne: ""}}, {sort: {createdAt: -1}, limit: 20});
  });

  Meteor.publish('RuDeputyRequests', () => {
    return DeputyRequestsCollection.find({deleted: {$ne: true}, 'info.ru': {$ne: ""}}, {sort: {createdAt: -1}, limit: 20});
  });

  Meteor.publish('AllDeputyRequests', () => {
    return DeputyRequestsCollection.find({deleted: {$ne: true}}, {sort: {createdAt: -1}});
  });

  Meteor.publish('DeputyRequestsRu', (number) => {
    const cursor = DeputyRequestsCollection.find({
      deleted: {$ne: true},
      'info.ru': {$ne: ""}
    }, {
      sort: {createdAt: -1},
      limit: number
    });

    return cursor;
  });

  Meteor.publish('DeputyRequestsKz', (number) => {
    return DeputyRequestsCollection.find({
      deleted: {$ne: true},
      'info.kz': {$ne: ""}
    }, {
      sort: {createdAt: -1},
      limit: number
    });
  });

  Meteor.methods({
    'deputyRequests.add'(data) {
      data.createdBy = Meteor.userId;

      DeputyRequestsCollection.insert(data);
    },
    'deputyRequests.remove'(_id) {
      DeputyRequestsCollection.update({_id}, {$set: {deleted: true}});
      const createdAt = new Date();

      Meteor.call('logs.add', {
        author: Meteor.userId(),
        action: 'deputyRequests.remove',
        objectId: _id,
        createdAt: Date.parse(createdAt)
      });
    },
    'deputyRequests.edit'(_id, data) {
      DeputyRequestsCollection.update({_id}, {$set: data});
    }
  });
}
