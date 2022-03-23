const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
   try {
      const users = await User.findAll({
         attributes: { exclude: ['password'] },
      });
      res.status(200).json({ status: 'success', message: 'Users fetched successfully.', users });
   } catch (error) {
      console.log(error);
      res.status(500).json(error);
   }
});

// GET /api/users/1
router.get('/:id', async (req, res) => {
   try {
      const user = await User.findAll({
         where: { id: req.params.id },
         attributes: { exclude: ['password'] },
      });
      res.status(200).json({ status: 'success', message: 'User fetched successfully.', user });
   } catch (error) {
      console.log(error);
      res.status(500).json(error);
   }
});

router.post('/', async (req, res) => {
   try {
      //hash user's password
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      const user = await User.create({ username: req.body.username, password: hashedPassword });

      //check for any error
      if (!user) return res.status(400).json({ status: 'fail', message: 'Failed to create an user.' });

      //set session
      req.session.save(() => {
         req.session.user_id = user.id;
         req.session.username = user.username;
         req.session.loggedIn = true;
      });

      //send success response
      res.json({ status: 'success', message: 'User created successfully', user });
   } catch (error) {
      console.log(error);
      res.status(500).json(error);
   }
});

router.post('/login', (req, res) => {
   User.findOne({
      where: {
         username: req.body.username,
      },
   }).then((user) => {
      if (!user) return res.status(400).json({ message: 'No user found with this username!' });

      const isValidPassword = bcrypt.compareSync(req.body.password, user.password);
      if (!isValidPassword) return res.status(400).json({ message: 'Your password is incorrect!' });

      req.session.save(() => {
         // declare session variables
         req.session.user_id = user.id;
         req.session.username = user.username;
         req.session.loggedIn = true;
         res.json({ user: user, message: 'Logged in successfully!' });
      });
   });
});

router.post('/logout', (req, res) => {
   if (req.session.loggedIn) {
      req.session.destroy(() => {
         res.status(204).end();
      });
   } else {
      res.status(404).end();
   }
});
module.exports = router;
