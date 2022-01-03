var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose")
require('dotenv').config()

mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{
    if(err) throw err
    console.log("Connected")
})

var indexRouter = require('./routes/index');
var pingRouter = require('./routes/ping');
var clubsRouter = require('./routes/clubs');
var eventsRouter = require('./routes/events');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs')

app.use('/', indexRouter);

app.use('/ping', pingRouter);
app.use('/clubs', clubsRouter);
app.use('/events', eventsRouter);


module.exports = app;
