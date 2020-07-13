import {Mongo} from 'meteor/mongo';

export const CharterCollection = new Mongo.Collection('charter');

if(Meteor.isServer) {
  Meteor.publish('Charter', () => {
    return CharterCollection.find();
  })

  Meteor.methods({
    'charter.add'(data) {
      data.createdBy = Meteor.userId;
      const createdAt = new Date();
      data.createdAt = Date.parse(createdAt);

      CharterCollection.insert(data);
    },
    'charter.remove'(_id) {
      CharterCollection.remove({_id})
    },
    'charter.edit'(_id, data) {
      if(CharterCollection.find().count() === 0) {
        data.createdBy = Meteor.userId;
        const createdAt = new Date();
        data.createdAt = Date.parse(createdAt);
        data._id = '1';

        CharterCollection.insert(data);
      }
      else
        CharterCollection.update({_id}, {$set: data});
    }
  });
}
