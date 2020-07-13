import {Mongo} from 'meteor/mongo';

export const FractionLeadershipCollection = new Mongo.Collection('fractionLeadership');

if(Meteor.isServer) {
  Meteor.publish('FractionLeadership', () => {
    return FractionLeadershipCollection.find();
  })

  Meteor.methods({
    'fractionLeadership.add'(data) {
      data.createdBy = Meteor.userId;
      const createdAt = new Date();
      data.createdAt = Date.parse(createdAt);

      FractionLeadershipCollection.insert(data);
    },
    'fractionLeadership.remove'(_id) {
      FractionLeadershipCollection.remove({_id})
    },
    'fractionLeadership.edit'(_id, data) {
      if(FractionLeadershipCollection.find().count() === 0) {
        data.createdBy = Meteor.userId;
        const createdAt = new Date();
        data.createdAt = Date.parse(createdAt);
        data._id = '1';

        FractionLeadershipCollection.insert(data);
      }
      else
        FractionLeadershipCollection.update({_id}, {$set: data});
    }
  });
}
