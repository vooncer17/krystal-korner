var Gem = require('../models/gem')
var User = require('../models/user')


// Add the logic for not being able to like a crystal if you aren't logged
function addToCollection(req, res) {
    User.findById(req.user.id, function(err, user) {
      user.gems.push(req.params.id); 
      user.save(function(err) {
        console.log(req.user.gems);
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
      console.log(gems)
      var gemAmount=gems.length
      var randomNumber = Math.floor(Math.random() * 17)
      var newGem = new Gem(req.body);
      newGem.IMG = gems[randomNumber].IMG
      console.log(gemAmount)
    })
    Gem.save(function(err) {
        if (err) return res.redirect('gems/index');
        res.redirect(`gems/${newGem._id}`);
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
      console.log(gem)
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