var User = require('../models/user')

function show(req, res) {
    User.findById(req.user.id)
    .populate('gems').exec(function(err, user) {
        // console.log("populated user response", user)
        res.render('users/collection', {user: user, name: req.query.name}
        )
    })
}

function deleteFromCollection(req, res) {
  // console.log("hitting")
    User.findById(req.user.id, function(err, user) {
      // console.log(user.gems)
      // console.log(typeof(req.params.id))

      user.gems.forEach((g, i) =>{
        if(g == req.params.id){
          // console.log(i)
          user.gems.splice(i, 1)
          user.save()
        }
      })
      
      
      res.redirect('/')
    });
  }

module.exports = {
    show,
    deleteFromCollection
}