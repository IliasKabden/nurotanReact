import {Mongo} from 'meteor/mongo';

export const StaffRegionsCollection = new Mongo.Collection('staffRegions');

if(Meteor.isServer) {
  Meteor.publish('AllStaffRegions', () => {
    return StaffRegionsCollection.find();
  })

  Meteor.methods({
    'staffRegions.add'(data) {
      data.createdBy = Meteor.userId;

      StaffRegionsCollection.insert(data);
    },
    'staffRegions.remove'(_id) {
      StaffRegionsCollection.remove({_id})
    },
    'staffRegions.edit'(_id, data) {
      if(StaffRegionsCollection.find().count() === 0) {
        data.createdBy = Meteor.userId;
        const createdAt = new Date();
        data.createdAt = Date.parse(createdAt);
        data._id = '1';

        StaffRegionsCollection.insert(data);
      }
      else
        StaffRegionsCollection.update({_id}, {$set: data});
    }
  });
}
