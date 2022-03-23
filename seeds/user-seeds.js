const { User } = require('../models');

const users = [
   {
      username: 'hasan',
      password: 'passone',
   },
   {
      username: 'ronaldo',
      password: 'passtwo',
   },
   {
      username: 'messi',
      password: 'passthree',
   },
];

const seedUsers = () => User.bulkCreate(users);

module.exports = seedUsers;
