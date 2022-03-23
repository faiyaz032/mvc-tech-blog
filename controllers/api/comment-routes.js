const router = require('express').Router();
const { Comment } = require('../../models');
const checkAuth = require('../../utils/checkAuth');

router.get('/', async (req, res) => {
   try {
      const comments = await Comment.findAll();
      res.json({ status: 'success', message: 'All comments fetched successfully', comments });
   } catch (error) {
      console.log(error);
      res.json(error);
   }
});

router.post('/', checkAuth, async (req, res) => {
   try {
      if (req.session) {
         const comment = await Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            // use the id from the session
            user_id: req.session.user_id,
         });
         res.json({ status: 'success', message: 'Comment created successfully', comment });
      }
   } catch (error) {
      console.log(error);
      res.json(error);
   }
});

router.delete('/:id', checkAuth, async (req, res) => {
   try {
      await Comment.destroy({
         where: {
            id: req.params.id,
         },
      });
      res.json({ status: 'success', message: 'Comment deleted successfully' });
   } catch (error) {
      console.log(error);
      res.json(error);
   }
});

module.exports = router;
