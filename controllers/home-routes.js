const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res) => {
   try {
      const posts = await Post.findAll({
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
      res.render('homepage', {
         posts: plainPosts,
         loggedIn: req.session.loggedIn,
      });
   } catch (error) {
      res.json(error);
      console.log(error);
   }
});

router.get('/post/:id', async (req, res) => {
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
      if (!post) return res.status(404).json({ message: 'No posts found with this id!' });

      const plainPost = post.get({ plain: true });

      // pass data to template
      res.render('single-post', {
         post: plainPost,
         loggedIn: req.session.loggedIn,
      });
   } catch (error) {
      res.json(error);
      console.log(error);
   }
});

router.get('/login', (req, res) => {
   if (req.session.loggedIn) {
      res.redirect('/');
      return;
   }

   res.render('login');
});

router.get('/signup', (req, res) => {
   if (req.session.loggedIn) {
      res.redirect('/');
      return;
   }

   res.render('signup');
});

module.exports = router;
