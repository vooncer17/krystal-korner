var mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true}).catch(function(err){
  console.log(err)
})

// shortcut to mongoose.connection object
var db = mongoose.connection;

db.on('connected', function () {
  console.log(`Mongoose at ${process.env.DATABASE_URL}`);
});

module.exports =  mongoose