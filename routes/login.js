const express = require('express');
const User = require('../model/users');
const loginRouter = express.Router();

loginRouter.post('/login', (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then(user => {
      if (!user) {
        res.status(400).send('Username not found');
      } else if (password !== user.password) {
        res.status(400).send('Incorrect password');
      } else {
        // Store user information in the session
        req.session.user = user;
        if (user.role === 'admin') {
          res.render('admin');
        } else if (user.role === 'guest') {
          res.render('admin');
        } else if (user.role === 'operator') {
          res.render('admin');
        } 
        else {
          const redirectUrl = req.session.intendedUrl || '/';
          delete req.session.intendedUrl;
          res.redirect(redirectUrl);
        }
      }
    })
    .catch(err => res.status(500).send('An error occurred'));
});
loginRouter.get('/logout', function(req, res){
  if (req.session) {
      // delete session object
      req.session.destroy(function(err) {
          if(err) {
              return next(err);
          } else {
              return res.redirect('/');
          }
      });
  }
});

module.exports = loginRouter;