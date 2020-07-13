import {Mongo} from 'meteor/mongo';

export const ProjectsCollection = new Mongo.Collection('projects');

if(Meteor.isServer) {
  Meteor.publish('Projects', () => {
    return ProjectsCollection.find({}, {sort: {createdAt: -1}});
  })

  Meteor.methods({
    'projects.add'(data) {
      data.createdBy = Meteor.userId;
      const createdAt = new Date();
      data.createdAt = Date.parse(createdAt);

      ProjectsCollection.insert(data);
    },
    'projects.remove'(_id) {
      ProjectsCollection.remove({_id})
    },
    'projects.edit'(_id, data) {
      ProjectsCollection.update({_id}, {$set: data});
    }
  });
}
