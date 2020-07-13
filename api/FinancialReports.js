import {Mongo} from 'meteor/mongo';

export const FinancialReportsCollection = new Mongo.Collection('financialReports');

if(Meteor.isServer) {
  Meteor.publish('FinancialReports', () => {
    return FinancialReportsCollection.find({}, {sort: {createdAt: -1}, limit: 20});
  })

  Meteor.methods({
    'financialReports.add'(data) {
      data.createdBy = Meteor.userId;
      const createdAt = new Date();
      data.createdAt = Date.parse(createdAt);

      FinancialReportsCollection.insert(data);
    },
    'financialReports.remove'(_id) {
      FinancialReportsCollection.remove({_id})
    },
    'financialReports.edit'(_id, data) {
      FinancialReportsCollection.update({_id}, {$set: data});
    }
  });
}
