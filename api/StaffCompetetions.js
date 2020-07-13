import {Mongo} from 'meteor/mongo';

export const StaffCompetetionsCollection = new Mongo.Collection('staffCompetetions');

if(Meteor.isServer) {
  Meteor.publish('StaffCompetetions', (_id) => {
    return StaffCompetetionsCollection.find({_id}, {sort: {createdAt: -1}});
  })

  Meteor.publish('AllStaffCompetetions', (number) => {
    return StaffCompetetionsCollection.find({}, {sort: {createdAt: -1}, limit: number});
  })

  Meteor.methods({
    'staffCompetetions.add'(data) {
      data.createdBy = Meteor.userId;

      StaffCompetetionsCollection.insert(data);
    },
    'staffCompetetions.remove'(_id) {
      StaffCompetetionsCollection.remove({_id})
    },
    'staffCompetetions.edit'(_id, data) {
      if(StaffCompetetionsCollection.find().count() === 0) {
        data.createdBy = Meteor.userId;
        const createdAt = new Date();
        data.createdAt = Date.parse(createdAt);
        data._id = '1';

        StaffCompetetionsCollection.insert(data);
      }
      else
        StaffCompetetionsCollection.update({_id}, {$set: data});
    }
  });
}
