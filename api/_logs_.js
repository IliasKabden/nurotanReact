import {Mongo} from 'meteor/mongo';

export const LogsCollection = new Mongo.Collection('logs');

if(Meteor.isServer) {
  Meteor.publish('Logs', () => {
    return LogsCollection.find({}, {sort: {createdAt: -1}});
  });

  Meteor.methods({
    'logs.add'(data) {
      LogsCollection.insert(data);
    },
  });
}
