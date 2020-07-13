import {Mongo} from 'meteor/mongo';

export const StaffReservistCollection = new Mongo.Collection('staffReservist');

if(Meteor.isServer) {
  Meteor.publish('AllStaffReservist', () => {
    return StaffReservistCollection.find({}, {sort: {createdAt: -1}, limit: 20});
  })

  Meteor.methods({
    'staffReservist.add'(data) {
      data.createdBy = Meteor.userId;
      const createdAt = new Date();
      data.createdAt = Date.parse(createdAt);

      StaffReservistCollection.insert(data);
    },
    'staffReservist.remove'(_id) {
      StaffReservistCollection.remove({_id})
    },
    'staffReservist.edit'(_id, data) {
      StaffReservistCollection.update({_id}, {$set: data});
    }
  });
}
