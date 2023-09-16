var createError = require('http-errors');
require("dotenv").config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersProfile = require('./features/users/users-profile.rout');
var contacts = require('./features/chat-contact/chat-contact.rout')
var authRouter = require('./authorization/auth.rout');
var profileRouter = require('./features/profiles/profile.route');
var chatRouter = require('./features/chats/chat.route');

const connectDatabase = require('./config/mongodb.config');
const ChatDao = require('./dao/chat.dao');

var app = express();

// connect to database
connectDatabase();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", 'public')));

app.use('/', indexRouter);
app.use('/profile', usersProfile);
app.use('/account', authRouter);
app.use('/chat', contacts)
app.use('/profile', profileRouter);
app.use('/chat', chatRouter);

// GET /tmp to run tmp script for dev
app.get('/temp', async (req, res) => {
    const chat_contact = req.body
    const newchat = new ChatDao(
        {
            type: chat_contact.type,
            members: [
                { _id: chat_contact.id, joinedTime: Date.now() }
            ],
            color: chat_contact.color,
            image: chat_contact.image
        }
    )
    await newchat.save()
    res.json({
        newchat
    }
    )
})

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
