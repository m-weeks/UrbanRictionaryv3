var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_STRING, {
  useNewUrlParser: true,
});

// Model Config
mongoose.Error.messages.general.required = "{PATH} is required";
mongoose.Error.messages.String.maxlength = "{PATH} must be less than {MAXLENGTH} characters.";

// Load models
require('./models/term');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/api', indexRouter);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use((err, req, res, next) => {
  if (err instanceof mongoose.Error.ValidationError) {
    err.status = 400;
  }

  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
