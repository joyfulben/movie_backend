const reviews = require('express').Router()
const Review = require('../models/reviews.js')

// Index
reviews.get('/', (req, res) => {
    Review.find({}, (error, foundReviews) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).json(foundReviews)
    })
})

// Create
reviews.post('/', async (req, res) => {
    Review.create(req.body, (error, createdReview) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).send(createdReview)
    })
})

// Delete
reviews.delete('/:id', (req, res) => {
    Review.findByIdAndRemove(req.params.id, (error, deletedReview) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).json(deletedReview)
    })
})

// Seed
reviews.get('/seed', (req, res)=>{
    Review.create([
        {
            title: "Interstellar",
            release_date: "2014",
            overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
            poster_path: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' + "nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg"
        }
    ], (error, data)=>{
        console.log(error);
        res.send(data);
    })
});

// update
reviews.put('/:id', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedReview) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).json(updatedReview)
    })
})

module.exports = reviews
