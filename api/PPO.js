import {Mongo} from 'meteor/mongo';

export const PPOCollection = new Mongo.Collection('ppo');

if(Meteor.isServer) {
  Meteor.publish('PPO', () => {
    return PPOCollection.find();
  })

  Meteor.methods({
    'ppo.add'(data) {
      data.createdBy = Meteor.userId;
      const createdAt = new Date();
      data.createdAt = Date.parse(createdAt);

      PPOCollection.insert(data);
    },
    'ppo.remove'(_id) {
      PPOCollection.remove({_id})
    },
    'ppo.edit'(_id, data) {
      if(PPOCollection.find().count() === 0) {
        data.createdBy = Meteor.userId;
        const createdAt = new Date();
        data.createdAt = Date.parse(createdAt);
        data._id = '1';

        PPOCollection.insert(data);
      }
      else
        PPOCollection.update({_id}, {$set: data});
    }
  });
}
