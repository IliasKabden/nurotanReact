import {Mongo} from 'meteor/mongo';

export const StaffReserveCollection = new Mongo.Collection('staffReserve');

if(Meteor.isServer) {
  Meteor.publish('StaffReserve', () => {
    return StaffReserveCollection.find({}, {sort: {createdAt: -1}, limit: 20});
  })

  Meteor.methods({
    'staffReserve.add'(data) {
      data.createdBy = Meteor.userId;
      const createdAt = new Date();
      data.createdAt = Date.parse(createdAt);

      StaffReserveCollection.insert(data);
    },
    'staffReserve.remove'(_id) {
      StaffReserveCollection.remove({_id})
    },
    'staffReserve.edit'(_id, data) {
      StaffReserveCollection.update({_id}, {$set: data});
    }
  });
}
