var createError = require('http-errors');
var express = require('express');
const sessions = require('express-session');
const cookieParser = require("cookie-parser");


const indexRouter = require('./routes/index');
const gamesRouter = require('./routes/games');
const providersRouter = require('./routes/providers');
const gameGroupsRouter = require('./routes/gameGroups');
const authRouter = require('./routes/auth');

var cors = require('cors')

var app = express();
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

app.use('/', indexRouter);
app.use('/games', gamesRouter);
app.use('/providers', providersRouter);
app.use('/game-groups', gameGroupsRouter);
app.use('/auth', authRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send(err);
});

module.exports = app;
