var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const { default: mongoose } = require('mongoose');

//rotas
var categoryRouter = require('./routes/CategoryRoutes')
var indexRouter = require('./routes/index');
var orderRouter = require('./routes/OrderRoutes');
var productRouter = require('./routes/ProductRoutes');
var usersRouter = require('./routes/UserRoutes');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/categories', categoryRouter);

//conectar no banco
mongoose.connect('mongodb://localhost/tresmosqueteiros-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

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
