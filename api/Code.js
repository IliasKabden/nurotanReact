import {Mongo} from 'meteor/mongo';

export const CodeCollection = new Mongo.Collection('code');

if(Meteor.isServer) {
  Meteor.publish('Code', () => {
    return CodeCollection.find();
  })

  Meteor.methods({
    'code.add'(data) {
      data.createdBy = Meteor.userId;
      const createdAt = new Date();
      data.createdAt = Date.parse(createdAt);

      CodeCollection.insert(data);
    },
    'code.remove'(_id) {
      CodeCollection.remove({_id})
    },
    'code.edit'(_id, data) {
      if(CodeCollection.find().count() === 0) {
        data.createdBy = Meteor.userId;
        const createdAt = new Date();
        data.createdAt = Date.parse(createdAt);
        data._id = '1';

        CodeCollection.insert(data);
      }
      else
        CodeCollection.update({_id}, {$set: data});
    }
  });
}
