import {Mongo} from 'meteor/mongo';

export const PurchaseCollection = new Mongo.Collection('purchase');

if(Meteor.isServer) {
  Meteor.publish('Purchase', (_id) => {
    return PurchaseCollection.find({_id}, {sort: {createdAt: -1}});
  });

  Meteor.publish('KzPurchase', () => {
    return PurchaseCollection.find({'title.kz': {$ne: ""}}, {sort: {createdAt: -1}, limit: 20});
  });

  Meteor.publish('RuPurchase', () => {
    return PurchaseCollection.find({'title.ru': {$ne: ""}}, {sort: {createdAt: -1}, limit: 20});
  });

  Meteor.publish('AllKzPurchase', (number) => {
    return PurchaseCollection.find({'title.kz': {$ne: ""}}, {sort: {createdAt: -1}, limit: number});
  });

  Meteor.publish('AllRuPurchase', (number) => {
    return PurchaseCollection.find({'title.ru': {$ne: ""}}, {sort: {createdAt: -1}, limit: number});
  });

  Meteor.methods({
    'purchase.add'(data) {
      data.createdBy = Meteor.userId;

      PurchaseCollection.insert(data);
    },
    'purchase.remove'(_id) {
      PurchaseCollection.remove({_id})
    },
    'purchase.edit'(_id, data) {
      PurchaseCollection.update({_id}, {$set: data});
    }
  });
}
