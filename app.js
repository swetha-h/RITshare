var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const flash = require('connect-flash');
require("dotenv").config();

const bodyParser = require("body-parser");
const User = require("./models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

mongoose.connect(
  process.env.DB_HOST,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;
    console.log("Connected");
  }
);

var indexRouter = require("./routes/index");
var pingRouter = require("./routes/ping");
var clubsRouter = require("./routes/clubs");
var eventsRouter = require("./routes/events");
var app = express();
var middleWare=require("./routes/middleware");

app.use(flash());


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use(session({secret:process.env.JWT_SECRET}));
app.use(passport.initialize());
app.use(passport.session());
app.use("/", indexRouter);

app.use("/ping", pingRouter);
app.use("/clubs", middleWare.restrictMiddleware,clubsRouter);
app.use("/events", middleWare.restrictMiddleware,eventsRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.post('/api/register', function(req, res, next) {
  console.log('registering user');
  console.log(req.body);
  User.register(new User({usn: req.body.usn, username: req.body.username}), req.body.password, function(err) {
    
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }

    console.log('user registered!');
    res.send({status:'ok'});
  });
});

app.post('/api/login', passport.authenticate('local', { failureRedirect: '/'}), function(req, res) {
  
  res.send({status:'ok'});
});


module.exports = app;
