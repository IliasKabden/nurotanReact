import {Mongo} from 'meteor/mongo';

export const VacanciesCollection = new Mongo.Collection('vacancies');

if(Meteor.isServer) {
  Meteor.publish('Vacancies', () => {
    return VacanciesCollection.find({}, {sort: {createdAt: -1}, limit: 5});
  })

  Meteor.methods({
    'vacancies.add'(data) {
      data.createdBy = Meteor.userId;

      VacanciesCollection.insert(data);
    },
    'vacancies.remove'(_id) {
      VacanciesCollection.remove({_id})
    },
    'vacancies.edit'(_id, data) {
      VacanciesCollection.update({_id}, {$set: data});
    }
  });
}
