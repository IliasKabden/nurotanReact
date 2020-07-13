import {Mongo} from 'meteor/mongo';

export const LeadershipCollection = new Mongo.Collection('leadership');

if(Meteor.isServer) {
  Meteor.publish('Leadership', () => {
    return LeadershipCollection.find({}, {sort: {updatedAt: -1}});
  })

  Meteor.methods({
    'leadership.add'(data) {
      data.createdBy = Meteor.userId;

      LeadershipCollection.insert(data);
    },
    'leadership.remove'(_id) {
      LeadershipCollection.remove({_id})
    },
    'leadership.edit'(_id, data) {
      if(LeadershipCollection.find().count() === 0) {
        data.createdBy = Meteor.userId;
        const createdAt = new Date();
        data.createdAt = Date.parse(createdAt);

        LeadershipCollection.insert(data);
      }
      else
        LeadershipCollection.update({_id}, {$set: data});
    }
  });
}
