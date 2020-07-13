import {Mongo} from 'meteor/mongo';

export const ContactsCollection = new Mongo.Collection('contacts');

if(Meteor.isServer) {
  Meteor.publish('Contacts', () => {
    return ContactsCollection.find();
  })

  Meteor.methods({
    'contacts.add'(data) {
      data.createdBy = Meteor.userId;
      const createdAt = new Date();
      data.createdAt = Date.parse(createdAt);

      ContactsCollection.insert(data);
    },
    'contacts.remove'(_id) {
      ContactsCollection.remove({_id})
    },
    'contacts.edit'(_id, data) {
      if(ContactsCollection.find().count() === 0) {
        data.createdBy = Meteor.userId;
        const createdAt = new Date();
        data.createdAt = Date.parse(createdAt);
        data._id = '1';

        ContactsCollection.insert(data);
      }
      else
        ContactsCollection.update({_id}, {$set: data});
    }
  });
}
