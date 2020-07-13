import {Mongo} from 'meteor/mongo';

export const CentralOfficeCollection = new Mongo.Collection('centralOffice');

if(Meteor.isServer) {
  Meteor.publish('CentralOffice', () => {
    return CentralOfficeCollection.find();
  })

  Meteor.methods({
    'centralOffice.add'(data) {
      data.createdBy = Meteor.userId;
      const createdAt = new Date();
      data.createdAt = Date.parse(createdAt);

      CentralOfficeCollection.insert(data);
    },
    'centralOffice.remove'(_id) {
      CentralOfficeCollection.remove({_id})
    },
    'centralOffice.edit'(_id, data) {
      if(CentralOfficeCollection.find().count() === 0) {
        data.createdBy = Meteor.userId;
        const createdAt = new Date();
        data.createdAt = Date.parse(createdAt);
        data._id = '1';

        CentralOfficeCollection.insert(data);
      }
      else
        CentralOfficeCollection.update({_id}, {$set: data});
    }
  });
}
