const { Comment } = require('../models');

const commentData = [
   {
      user_id: 2,
      post_id: 1,
      comment_text: 'This is the first post and this is amazing',
   },
   {
      user_id: 3,
      post_id: 2,
      comment_text: 'This is the second post and this is beautiful',
   },
   {
      user_id: 1,
      post_id: 3,
      comment_text: 'This is the third post and this is very helpful. Loved it',
   },
   {
      user_id: 2,
      post_id: 3,
      comment_text: 'The last post is not that really helpful. This is disgust',
   },
   {
      user_id: 2,
      post_id: 1,
      comment_text: 'The first post is also disgust',
   },
   {
      user_id: 1,
      post_id: 2,
      comment_text: 'Your posts are very good. Loved the second post',
   },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
