import {Mongo} from 'meteor/mongo';

export const PressCollection = new Mongo.Collection('press');

if(Meteor.isServer) {
  Meteor.publish('Press', () => {
    return PressCollection.find();
  })

  Meteor.methods({
    'press.add'(data) {
      data.createdBy = Meteor.userId;
      const createdAt = new Date();
      data.createdAt = Date.parse(createdAt);

      PressCollection.insert(data);
    },
    'press.remove'(_id) {
      PressCollection.remove({_id})
    },
    'press.edit'(_id, data) {
      if(PressCollection.find().count() === 0) {
        data.createdBy = Meteor.userId;
        const createdAt = new Date();
        data.createdAt = Date.parse(createdAt);
        data._id = '1';

        PressCollection.insert(data);
      }
      else
        PressCollection.update({_id}, {$set: data});
    }
  });
}
