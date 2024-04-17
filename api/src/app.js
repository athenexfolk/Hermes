var createError = require('http-errors');
require("dotenv").config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var authRouter = require('./authorization/auth.rout');
var profileRouter = require('./features/profiles/profile.route');
var chatRouter = require('./features/chats/chat.route');

var ErrrorHandlerMiddleware = require('./middleware/EerrorHandler.middleware');

const connectDatabase = require('./config/mongodb.config');

var app = express();

// connect to database
connectDatabase();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors())
app.use(logger('dev'));
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// static file
app.use(express.static(path.join(__dirname, "..", 'public')));
app.use('/api/imgs', express.static(path.join(process.env.IMAGE_STORAGE || __dirname, "..", 'images')));
console.log('IMAGE SAVE TO : ', process.env.IMAGE_STORAGE || path.join(__dirname, "..", 'images'));

app.use('/api/', indexRouter);
app.use('/api/account', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/chats', chatRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(ErrrorHandlerMiddleware);

module.exports = app;
