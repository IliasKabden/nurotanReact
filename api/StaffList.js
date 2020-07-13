import {Mongo} from 'meteor/mongo';

export const StaffListCollection = new Mongo.Collection('staffList');

if(Meteor.isServer) {
  Meteor.publish('AllStaffList', () => {
    return StaffListCollection.find();
  })

  Meteor.methods({
    'staffList.add'(data) {
      data.createdBy = Meteor.userId;
      StaffListCollection.insert(data);
    },
    'staffList.remove'(_id) {
      StaffListCollection.remove({_id})
    },
    'staffList.edit'(_id, data) {
      if(StaffListCollection.find().count() === 0) {
        data.createdBy = Meteor.userId;
        const createdAt = new Date();
        data.createdAt = Date.parse(createdAt);
        data._id = '1';

        StaffListCollection.insert(data);
      }
      else
        StaffListCollection.update({_id}, {$set: data});
    }
  });
}
