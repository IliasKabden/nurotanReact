import {Mongo} from 'meteor/mongo';

export const PartyHistoryCollection = new Mongo.Collection('partyHistory');

if(Meteor.isServer) {
  Meteor.publish('PartyHistory', () => {
    return PartyHistoryCollection.find();
  })

  Meteor.methods({
    'partyHistory.add'(data) {
      data.createdBy = Meteor.userId;
      const createdAt = new Date();
      data.createdAt = Date.parse(createdAt);

      PartyHistoryCollection.insert(data);
    },
    'partyHistory.remove'(_id) {
      PartyHistoryCollection.remove({_id})
    },
    'partyHistory.edit'(_id, data) {
      if(PartyHistoryCollection.find().count() === 0) {
        data.createdBy = Meteor.userId;
        const createdAt = new Date();
        data.createdAt = Date.parse(createdAt);
        data._id = '1';

        PartyHistoryCollection.insert(data);
      }
      else
        PartyHistoryCollection.update({_id}, {$set: data});
    }
  });
}
