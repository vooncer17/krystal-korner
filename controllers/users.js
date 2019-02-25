var Gem = require('../models/gem')

function index(req, res, next) {
   Gem.find({}, function(err, gems) {
    res.render('index', { user: req.user, name: req.query.name, gems });
    });
}


module.exports = {
    index
}