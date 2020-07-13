import {Mongo} from 'meteor/mongo';

export const RegionsCollection = new Mongo.Collection('regions');

if(Meteor.isServer) {
  Meteor.publish('Regions', () => {
    return RegionsCollection.find();
  });

  Meteor.publish('RegionContacts', () => {
    return RegionsCollection.find({}, {fields: {
      name: 1,
      contacts: 1,
      contactsTitle: 1,
    }
    });
  });

  Meteor.methods({
    'regions.add'(data) {
      data.createdBy = Meteor.userId;
      const createdAt = new Date();
      data.createdAt = Date.parse(createdAt);

      RegionsCollection.insert(data);
    },
    'regions.remove'(_id) {
      RegionsCollection.remove({_id})
    },
    'regions.edit'(_id, data) {
      data.updatedBy = Meteor.userId;
      const updatedAt = new Date();
      data.updatedAt = Date.parse(updatedAt);

      RegionsCollection.update({_id}, {$set: data});
      RegionsCollection.update({}, {$set: {updatedAt}});
    }
  });
}
