import {Mongo} from 'meteor/mongo';

export const BodiesCollection = new Mongo.Collection('bodies');

if(Meteor.isServer) {
  Meteor.publish('Bodies', () => {
    return BodiesCollection.find();
  })

  Meteor.methods({
    'bodies.add'(data) {
      data.createdBy = Meteor.userId;
      const createdAt = new Date();
      data.createdAt = Date.parse(createdAt);

      BodiesCollection.insert(data);
    },
    'bodies.remove'(_id) {
      BodiesCollection.remove({_id})
    },
    'bodies.edit'(_id, data) {
      if(BodiesCollection.find().count() === 0) {
        data.createdBy = Meteor.userId;
        const createdAt = new Date();
        data.createdAt = Date.parse(createdAt);
        data._id = '1';

        BodiesCollection.insert(data);
      }
      else
        BodiesCollection.update({_id}, {$set: data});
    }
  });
}
