const seedPosts = require('./post-seeds');
const seedUsers = require('./user-seeds');
const seedComments = require('./comment-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
   await sequelize.sync({ force: true });
   console.log('\n DATABASE SYNCED SUCCESSFULLY \n');

   await seedUsers();
   console.log('\n USERS SEEDED SUCCESSFULLY \n');

   await seedPosts();
   console.log('\n POSTS SEEDED SUCCESSFULLY \n');

   await seedComments();
   console.log('\n COMMENTS SEEDED SUCCESSFULLY \n');

   process.exit(0);
};

seedAll();
