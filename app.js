var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/test', function (req, res, next) { 
  res.type('json')
  res.send({test: 'express connection test'})
})

app.get('/mongoTestResponse', function(req,res, next){
  res.type('json')
  res.send(
    {
      MONGO:{
        mongoNode: 'test node name',
        mongolinks: ['child1','child2','parent1','parent2']
      }
    }
  )
})

app.get('/neoTestResponse', function(req, res, next) {
  res.type('json')
  res.send(
    {
      NEO:{
        neoNode: 'test node name',
        neoLinks: ['child1', 'child2', 'child3']
      }
    }
  )
})

app.get('/mongoDBQuery', function(req,res, next){ 
  res.type('json')
  res.send(
    {test:'mongo test response'}
  )
})

app.get('/neoDBQuery', function(req, res, next){
  res.type('json')
  res.send(
    {test:'neo test response'}
  )
})

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
