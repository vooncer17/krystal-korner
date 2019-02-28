var express = require('express');
var router = express.Router();
var passport = require('passport')
var indexCtrl = require('../controllers/index')

// Normal Routes
router.get('/', indexCtrl.index)
router.get('/mystical', indexCtrl.mystical)
router.get('/new', indexCtrl.new)
router.get('/gems/:id', indexCtrl.show)

router.post('/new', indexCtrl.create)
router.post('/', indexCtrl.search)
router.post('/collection/:id', indexCtrl.addToCollection)



// Oauth
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
