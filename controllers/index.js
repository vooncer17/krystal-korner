var Gem = require('../models/gem')
var User = require('../models/user')


function addToCollection(req, res) {
    User.findById(req.user.id, function(err, user) {
      user.gems.push(req.params.id); 
      user.save(function(err) {
        res.redirect('/');
      });
    });
  }


function index(req, res, next) {
   Gem.find({}, function(err, gems) {
    res.render('gems/index', { user: req.user, name: req.query.name, gems });
    });
}

function search(req, res) {
    Gem.find({ $or:[ {'Name': {"$regex": req.body.search, "$options": "i"}}, {'Zodiac': {"$regex": req.body.search, "$options": "i"}}]}, 
    function(err, gems) {
        res.render('gems/index', { user: req.user, name: req.query.name, gems })
})};

function show(req, res) {
    Gem.findById(req.params.id, function(err, gem) {
        res.render('gems/show', {user: req.user, name: req.query.name, gem}
        )
    })
}

function newGem(req, res) {  
  res.render('gems/new', {user: req.user, name: req.query.name});
}

function create(req,res) {
    Gem.find({}, function(err, gems) {
      var gemAmount=gems.length
      var randomNumber = Math.floor(Math.random() * gemAmount)
      var newGem = new Gem(req.body);
      newGem.IMG = gems[randomNumber].IMG
      gems.push(newGem)
      console.log(gems)

      res.render('gems/index', {user: req.user, name: req.query.name, gems})
    })
}

function mystical(req,res) {
  // Get the count of all users
Gem.count().exec(function (err, count) {

  // Get a random entry
  var random = Math.floor(Math.random() * count)

  // Again query all users but only fetch one offset by our random #
  Gem.findOne().skip(random).exec(
    function (err, gem) {
      // Tada! random user
      // console.log(gem)
      res.render('gems/show', {user: req.user, name: req.query.name, gem}) 
    })
})
}

module.exports = {
    index,
    search,
    show,
    new: newGem,
    create,
    addToCollection,
    mystical
}