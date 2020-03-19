const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    title: {type: String},
    release_date: {type: String},
    overview: {type: String},
    poster_path: {type: String},
    review: {type: String},
    rating: {type: Number}
})

module.exports = mongoose.model('Review', reviewSchema )
