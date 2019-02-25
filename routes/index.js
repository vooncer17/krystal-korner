var express = require('express');
var router = express.Router();
var passport = require('passport')
var userCtrl = require('../controllers/users')

/* GET home page. */
router.get('/', userCtrl.index)

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/',
    failureRedirect : '/'
  }
));

module.exports = router;
