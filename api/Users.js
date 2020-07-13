export const UsersCollection = Meteor.users;

if(Meteor.isServer) {
  Meteor.publish('Users', () => {
    return UsersCollection.find({username: {$ne: "superadmin"}}, {sort: {createdAt: -1}, limit: 20});
  })

  Meteor.methods({
    'users.add'(data) {
      data.profile = {
         roles: ['moderator']
      };

      Accounts.createUser({
        username: data.username,
        password :  data.password,
        profile: data.profile
      });
    },
    'users.remove'(_id) {
      UsersCollection.remove({_id});
    },
    'users.edit'(_id, newUsername, newPass) {
      if(newPass !== "password")
        Accounts.setPassword(_id, newPass);
      Accounts.setUsername(_id, newUsername);
    }
  });
}
