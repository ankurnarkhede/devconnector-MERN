const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();


// mongodb connection
mongoose
  .connect(process.env.MongoURI, {useNewUrlParser: true})
  .then(() => console.log("Connected to", process.env.MongoURI))
  .catch(err => console.log(err));

app.get('/', (req, res, next) => {
  res.send("hello");
});


app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
