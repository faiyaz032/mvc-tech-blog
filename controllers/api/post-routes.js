const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const checkAuth = require('../../utils/checkAuth');

// get all users
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

      res.json({ status: 'success', message: 'All posts fetched successfully', posts });
   } catch (error) {
      console.log(error);
      res.json(error);
   }
});

router.get('/:id', async (req, res) => {
   try {
      const post = await Post.findAll({
         where: { id: req.params.id },
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

      if (!post.length > 0) return res.status(404).json({ status: 'fail', message: 'No post found with this id.' });

      res.json({ status: 'success', message: 'Post fetched successfully', post });
   } catch (error) {
      console.log(error);
      res.json(error);
   }
});

router.post('/', checkAuth, async (req, res) => {
   try {
      const post = await Post.create({
         title: req.body.title,
         post_content: req.body.post_content,
         user_id: req.session.user_id,
      });
      res.json({ status: 'success', message: 'Post created successfully', post });
   } catch (error) {
      console.log(error);
      res.json(error);
   }
});

router.put('/:id', checkAuth, async (req, res) => {
   try {
      const updatedPost = await Post.update(
         {
            title: req.body.title,
            post_content: req.body.post_content,
         },
         {
            where: {
               id: req.params.id,
            },
         }
      );

      res.json({ status: 'success', message: 'Post updated successfully', updatedPost });
   } catch (error) {
      console.log(error);
      res.json(error);
   }
});

router.delete('/:id', checkAuth, async (req, res) => {
   try {
      await Post.destroy({
         where: {
            id: req.params.id,
         },
      });

      res.json({ status: 'success', message: 'Post deleted successfully' });
   } catch (error) {
      console.log(error);
      res.json(error);
   }
});

module.exports = router;
