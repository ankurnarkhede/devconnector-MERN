// include npm packages
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const morgan = require('morgan')
const path = require('path')

// include local files
const keys = require('./config/keys')

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

const app = express()

// morgan for printing requests on console
app.use(morgan('combined'))

// bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// mongodb connection
mongoose
  .connect(keys.MongoURI, { useNewUrlParser: true })
  .then(() => console.log('Connected to', keys.MongoURI))
  .catch(err => console.log(err))

// passport middleware
app.use(passport.initialize())

// passport config
require('./config/passport')(passport)

app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)

  res.json({ error: err, msg: 'Inside app.js error function' })
})

module.exports = app
