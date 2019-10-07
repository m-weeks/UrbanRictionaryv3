var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TermSchema = new Schema({
  word: {
    type: String,
    required: true,
    maxlength: 255,
  },
  definition: {
    type: String,
    required: true,
    maxlength: 3000,
  },
  example: {
    type: String,
    required: true,
    maxlength: 3000,
  },
  approved: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    set: function () { return this.securedField; }
  }
}, {});

mongoose.model('Term', TermSchema);
