import {Mongo} from 'meteor/mongo';

export const AntiCorruptionProgramCollection = new Mongo.Collection('antiCorruptionProgram');

if(Meteor.isServer) {
  Meteor.publish('AntiCorruptionProgram', () => {
    return AntiCorruptionProgramCollection.find();
  })

  Meteor.methods({
    'antiCorruptionProgram.add'(data) {
      data.createdBy = Meteor.userId;
      const createdAt = new Date();
      data.createdAt = Date.parse(createdAt);

      AntiCorruptionProgramCollection.insert(data);
    },
    'antiCorruptionProgram.remove'(_id) {
      AntiCorruptionProgramCollection.remove({_id})
    },
    'antiCorruptionProgram.edit'(_id, data) {
      if(AntiCorruptionProgramCollection.find().count() === 0) {
        data.createdBy = Meteor.userId;
        const createdAt = new Date();
        data.createdAt = Date.parse(createdAt);
        data._id = '1';

        AntiCorruptionProgramCollection.insert(data);
      }
      else
        AntiCorruptionProgramCollection.update({_id}, {$set: data});
    }
  });
}
