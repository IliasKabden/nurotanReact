import {Mongo} from 'meteor/mongo';

export const ImagesCollection = new Mongo.Collection('images');

if(Meteor.isServer) {
  Meteor.publish('Images', () => {
    return ImagesCollection.find({}, {sort: {createdAt: -1}, limit: 5});
  })

  Meteor.publish('AllImages', () => {
    return ImagesCollection.find({}, {sort: {createdAt: -1}});
  })

  Meteor.methods({
    'images.add'(data) {
      data.createdBy = Meteor.userId;
      const createdAt = new Date();
      data.createdAt = Date.parse(createdAt);

      ImagesCollection.insert(data);
    },
    'images.remove'(_id) {
      ImagesCollection.remove({_id})
    },
    'images.edit'(_id, data) {
      ImagesCollection.update({_id}, {$set: data});
    }
  });
}
