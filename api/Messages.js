import {Mongo} from 'meteor/mongo';

export const MessagesCollection = new Mongo.Collection('messages');

if(Meteor.isServer) {
  Meteor.publish('Messages', () => {
    return MessagesCollection.find({}, {sort: {createdAt: -1}});
  })

  Meteor.methods({
    'messages.add'(data) {
      data.createdBy = Meteor.userId;

      MessagesCollection.insert(data);
    },
    'messages.remove'(_id) {
      MessagesCollection.remove({_id})
    },
    'messages.edit'(_id, data) {
      MessagesCollection.update({_id}, {$set: data});
    }
  });
}
