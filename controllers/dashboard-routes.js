const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const checkAuth = require('../utils/checkAuth');

router.get('/', checkAuth, async (req, res) => {
   try {
      const posts = await Post.findAll({
         where: {
            user_id: req.session.user_id,
         },
         attributes: ['id', 'title', 'created_at', 'post_content'],
         include: [
            {
               model: Comment,
               attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
               include: {
                  model: User,
                  attributes: ['username'],
               },
            },
            {
               model: User,
               attributes: ['username'],
            },
         ],
      });
      const plainPosts = posts.map((post) => post.get({ plain: true }));
      res.render('dashboard', { posts: plainPosts, loggedIn: true });
   } catch (error) {
      console.log(error);
      res.json(error);
   }
});

router.get('/edit/:id', checkAuth, async (req, res) => {
   try {
      const post = await Post.findOne({
         where: {
            id: req.params.id,
         },
         attributes: ['id', 'title', 'created_at', 'post_content'],
         include: [
            {
               model: Comment,
               attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
               include: {
                  model: User,
                  attributes: ['username'],
               },
            },
            {
               model: User,
               attributes: ['username'],
            },
         ],
      });

      if (!post) return res.status(404).json({ message: 'No post found with this id' });

      const plainPost = post.get({ plain: true });

      res.render('edit-post', {
         post: plainPost,
         loggedIn: true,
      });
   } catch (error) {
      res.json(error);
      console.log(error);
   }
});

router.get('/create/', checkAuth, async (req, res) => {
   try {
      const posts = await Post.findAll({
         where: {
            user_id: req.session.user_id,
         },
         attributes: ['id', 'title', 'created_at', 'post_content'],
         include: [
            {
               model: Comment,
               attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
               include: {
                  model: User,
                  attributes: ['username'],
               },
            },
            {
               model: User,
               attributes: ['username'],
            },
         ],
      });

      const plainPosts = posts.map((post) => post.get({ plain: true }));
      res.render('create-post', { posts: plainPosts, loggedIn: true });
   } catch (error) {
      res.json(error);
      console.log(error);
   }
});

module.exports = router;
