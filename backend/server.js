const express = require('express')
const app = express()
const session = require('express-session')
const PORT = 3003
const cors = require('cors')
const reviewController = require('./controllers/reviews.js')
const userController = require('./controllers/users_controller.js')
const sessionsController = require('./controllers/sessions_controller.js')
const mongoose = require('mongoose')
app.use(express.json())
 
const whitelist = ['http://localhost:3000','https://movie-critique.herokuapp.com/']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Blocked by CORS'))
        }
    }
}
app.use(cors(corsOptions))

require('dotenv').config()
mongoose.connection.on('error', error => { console.log(error.message + 'Forgot Mongo')})
mongoose.connection.on('Disconnected', ()=> console.log('Disconnected'))
mongoose.connect('mongodb://localhost:27017/reviews', {useUnifiedTopology: true, useNewUrlParser: true})
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))
mongoose.connection.once('open', () => {
    console.log('Connected to mongoose')
})

app.use('/reviews', reviewController)

app.use('/users', userController)
app.use('/sessions', sessionsController)

app.listen(PORT, ()=> {
    console.log('Listening...')
})
