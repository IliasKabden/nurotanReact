import {Mongo} from 'meteor/mongo';

export const QuotationsCollection = new Mongo.Collection('quotations');

if(Meteor.isServer) {
  Meteor.publish('Quotations', () => {
    return QuotationsCollection.find({}, {sort: {createdAt: -1}, limit: 20});
  })

  Meteor.methods({
    'quotations.add'(data) {
      data.createdBy = Meteor.userId;
      const createdAt = new Date();
      data.createdAt = Date.parse(createdAt);

      QuotationsCollection.insert(data);
    },
    'quotations.remove'(_id) {
      QuotationsCollection.remove({_id})
    },
    'quotations.edit'(_id, data) {
      QuotationsCollection.update({_id}, {$set: data});
    }
  });
}
