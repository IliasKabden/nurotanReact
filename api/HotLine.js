import {Mongo} from 'meteor/mongo';

export const HotLineCollection = new Mongo.Collection('hotLine');

if(Meteor.isServer) {
  Meteor.publish('HotLine', () => {
    return HotLineCollection.find();
  })

  Meteor.methods({
    'hotLine.add'(data) {
      data.createdBy = Meteor.userId;
      const createdAt = new Date();
      data.createdAt = Date.parse(createdAt);

      HotLineCollection.insert(data);
    },
    'hotLine.remove'(_id) {
      HotLineCollection.remove({_id})
    },
    'hotLine.edit'(_id, data) {
      if(HotLineCollection.find().count() === 0) {
        data.createdBy = Meteor.userId;
        const createdAt = new Date();
        data.createdAt = Date.parse(createdAt);
        data._id = '1';

        HotLineCollection.insert(data);
      }
      else
        HotLineCollection.update({_id}, {$set: data});
    }
  });
}
