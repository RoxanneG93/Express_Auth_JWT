var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
const passport = require('passport');

// importing Models
var models = require('./models');

// importing ROUTES
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// importing Passport Config
require('./config/passport.js');


// DATABASE CONNECTION
models.sequelize.sync().then(function () {
  console.log("DB Sync'd up")
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// PASSPORT CONFIG
app.use(require('express-session')({
  secret: 'keyboard cat',
}));
app.use(passport.initialize());
app.use(passport.session());

// ROUTES
app.use('/', indexRouter);
app.use('/users', usersRouter);

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

module.exports = app;
