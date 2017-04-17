var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, require: true },
  role: {type: Number, default: 0},
  created_at: Date,
  updated_at: Date
});

var Model = mongoose.model('user', schema);

module.exports = Model;