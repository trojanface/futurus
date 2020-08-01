var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var routes = require('./routes');
var app = express();
let futurus_db = require("./models");
let session = require("express-session"); //Imports express session package
let passport = require("./config/passport"); //Imports the passport script
require("dotenv").config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));//creates a login session and stores the state in a cookie
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.use(routes);



futurus_db.sequelize.sync().then(function() {
  // catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

}).catch((err) => {
  console.log(err);
});

module.exports = app;
