import {Mongo} from 'meteor/mongo';

export const FractionBoardCollection = new Mongo.Collection('fractionBoard');

if(Meteor.isServer) {
  Meteor.publish('FractionBoard', () => {
    return FractionBoardCollection.find();
  })

  Meteor.methods({
    'fractionBoard.add'(data) {
      data.createdBy = Meteor.userId;
      const createdAt = new Date();
      data.createdAt = Date.parse(createdAt);

      FractionBoardCollection.insert(data);
    },
    'fractionBoard.remove'(_id) {
      FractionBoardCollection.remove({_id})
    },
    'fractionBoard.edit'(_id, data) {
      if(FractionBoardCollection.find().count() === 0) {
        data.createdBy = Meteor.userId;
        const createdAt = new Date();
        data.createdAt = Date.parse(createdAt);
        data._id = '1';

        FractionBoardCollection.insert(data);
      }
      else
        FractionBoardCollection.update({_id}, {$set: data});
    }
  });
}
