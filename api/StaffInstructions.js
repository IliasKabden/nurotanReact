import {Mongo} from 'meteor/mongo';

export const StaffInstructionsCollection = new Mongo.Collection('staffInstructions');

if(Meteor.isServer) {
  Meteor.publish('AllStaffInstructions', () => {
    return StaffInstructionsCollection.find();
  })

  Meteor.methods({
    'staffInstructions.add'(data) {
      data.createdBy = Meteor.userId;
      StaffInstructionsCollection.insert(data);
    },
    'staffInstructions.remove'(_id) {
        StaffInstructionsCollection.remove({_id})
    },
    'staffInstructions.edit'(_id, data) {
      if(StaffInstructionsCollection.find().count() === 0) {
        data.createdBy = Meteor.userId;
        const createdAt = new Date();
        data.createdAt = Date.parse(createdAt);
        data._id = '1';

        StaffInstructionsCollection.insert(data);
      }
      else
      StaffInstructionsCollection.update({_id}, {$set: data});
    }
  });
}
