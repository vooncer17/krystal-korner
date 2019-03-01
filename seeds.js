require('dotenv').config()
require('./config/database');

const Gem = require('./models/gem')
const data = require('./data')

const p1 = Gem.deleteMany({});

Promise.all([p1]).then(function(results) {
    console.log(results)
    return Gem.create(data.gems)
}).then(function(results) {
    console.log(results)
    process.exit()
})