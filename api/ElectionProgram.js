import {Mongo} from 'meteor/mongo';

export const ElectionProgramCollection = new Mongo.Collection('electionProgram');

if(Meteor.isServer) {
  Meteor.publish('ElectionProgram', () => {
    return ElectionProgramCollection.find();
  })

  Meteor.methods({
    'electionProgram.add'(data) {
      data.createdBy = Meteor.userId;
      const createdAt = new Date();
      data.createdAt = Date.parse(createdAt);

      ElectionProgramCollection.insert(data);
    },
    'electionProgram.remove'(_id) {
      ElectionProgramCollection.remove({_id})
    },
    'electionProgram.edit'(_id, data) {
      if(ElectionProgramCollection.find().count() === 0) {
        data.createdBy = Meteor.userId;
        const createdAt = new Date();
        data.createdAt = Date.parse(createdAt);
        data._id = '1';

        ElectionProgramCollection.insert(data);
      }
      else
        ElectionProgramCollection.update({_id}, {$set: data});
    }
  });
}
