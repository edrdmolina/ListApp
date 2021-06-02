const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const engine = require('ejs-mate');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const LocalStrategy = require('passport-local');
const flash = require('connect-flash');
const methodOverride = require('method-override');

const User = require('./models/user');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// MONGOOSE CONNECTION
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/store-list';
mongoose.connect(dbUrl, {
  // Mongoose Settings due to depracations
  useNewUrlParser: true, 
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected!');
});

const app = express();

// view engine setup
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const secret = process.env.SECRET || 'thisisasecret';
const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
  crypto: {
      secret,
  }
});
store.on('error', function(e) {
  console.log('Session Store Error', e);
})
// Session configuration
const sessionConfig = {
  store,
  name: 'userCookie',
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
      httpOnly: true,
      // secure: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 14,
      maxAge: 1000 * 60 * 60 * 24 * 14,
  }
}
app.use(session(sessionConfig));
app.use(flash());
// Seting up passport middleware
app.use(passport.initialize());
app.use(passport.session());
// passport.use(User.createStrategy());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// Flash middleware
app.use((req, res, next) => {
  // used to pass currentUser data to EJS
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})

app.use('/lists', indexRouter);
app.use('/', usersRouter);

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
