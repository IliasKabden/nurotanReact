import {Mongo} from 'meteor/mongo';

export const FractionCollection = new Mongo.Collection('fraction');

if(Meteor.isServer) {
  Meteor.publish('Fraction', () => {
    return FractionCollection.find();
  })

  Meteor.methods({
    'fraction.add'(data) {
      data.createdBy = Meteor.userId;
      const createdAt = new Date();
      data.createdAt = Date.parse(createdAt);

      FractionCollection.insert(data);
    },
    'fraction.remove'(_id) {
      FractionCollection.remove({_id})
    },
    'fraction.edit'(_id, data) {
      if(FractionCollection.find().count() === 0) {
        data.createdBy = Meteor.userId;
        const createdAt = new Date();
        data.createdAt = Date.parse(createdAt);
        data._id = '1';

        FractionCollection.insert(data);
      }
      else
        FractionCollection.update({_id}, {$set: data});
    }
  });
}
