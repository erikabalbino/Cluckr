const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  // console.log("Cookies:", req.cookies);
  const username = req.cookies.username;
  res.locals.username = ""; 

  if (username){
      res.locals.username = username;
      // console.log(`😍 User's username is ${username}`);
  }
  next();
});

const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7; // uma semana
app.post('/sign-in', (req, res) => {

  const username = req.body.username;

  if (username) {
    res.cookie("username", username, {maxAge: COOKIE_MAX_AGE});
    res.redirect("/new");

  } else {
    res.redirect('/');
  }

});

app.post('/sign-out', (req, res) => {
  console.log("username");
  
  res.clearCookie("username");
  res.redirect("/");
});


app.use('/', indexRouter);

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
