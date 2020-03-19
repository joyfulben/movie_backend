const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/users.js')

// update new.js to whatever you want when making sign up page
users.get('/new', (req, res) => {
  res.render('users/new.js', {currentUser: req.session.currentUser})
})

users.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
    if (err) {
      console.log(err)
    } else {
      console.log('user created', createdUser)
      res.redirect('/')
    }
  })
})
module.exports = users
