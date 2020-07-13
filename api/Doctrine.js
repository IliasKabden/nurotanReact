import {Mongo} from 'meteor/mongo';

export const DoctrineCollection = new Mongo.Collection('doctrine');

if(Meteor.isServer) {
  Meteor.publish('Doctrine', () => {
    return DoctrineCollection.find();
  })

  Meteor.methods({
    'doctrine.add'(data) {
      data.createdBy = Meteor.userId;
      const createdAt = new Date();
      data.createdAt = Date.parse(createdAt);

      DoctrineCollection.insert(data);
    },
    'doctrine.remove'(_id) {
      DoctrineCollection.remove({_id})
    },
    'doctrine.edit'(_id, data) {
      if(DoctrineCollection.find().count() === 0) {
        data.createdBy = Meteor.userId;
        const createdAt = new Date();
        data.createdAt = Date.parse(createdAt);
        data._id = '1';

        DoctrineCollection.insert(data);
      }
      else
        DoctrineCollection.update({_id}, {$set: data});
    }
  });
}
