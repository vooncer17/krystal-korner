var mongoose = require('mongoose')

var reviewSchema = new mongoose.Schema({
    content: String,
    rating: {type: Number, min: 1, max: 5, default: 5}
  }, {
    timestamps: true
  });

var gemSchema = new mongoose.Schema({
    Name: String,
    Pronunciation: String,
    Formula: String,
    Qualities: String,
    Hardness: Number,
    Chakras: String,
    Zodiac: String,
    Locality: String,
    IMG: String,
    reviews: [reviewSchema]
})

module.exports = mongoose.model('Gem', gemSchema)