import {Mongo} from 'meteor/mongo';

export const PartyCuratorsCollection = new Mongo.Collection('partyCurators');

if(Meteor.isServer) {
  Meteor.publish('PartyCurators', () => {
    return PartyCuratorsCollection.find();
  })

  Meteor.methods({
    'partyCurators.add'(data) {
      data.createdBy = Meteor.userId;
      const createdAt = new Date();
      data.createdAt = Date.parse(createdAt);

      PartyCuratorsCollection.insert(data);
    },
    'partyCurators.remove'(_id) {
      PartyCuratorsCollection.remove({_id})
    },
    'partyCurators.edit'(_id, data) {
      if(PartyCuratorsCollection.find().count() === 0) {
        data.createdBy = Meteor.userId;
        const createdAt = new Date();
        data.createdAt = Date.parse(createdAt);
        data._id = '1';

        PartyCuratorsCollection.insert(data);
      }
      else
        PartyCuratorsCollection.update({_id}, {$set: data});
    }
  });
}
