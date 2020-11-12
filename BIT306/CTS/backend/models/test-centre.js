const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const testCentreSchema = mongoose.Schema({
  state: {type: String, required: true},
  address: {type: String, required: true},
  officer: {type: String, required: true},
  contact: {type: String, required: true}
});

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('TestCentre',testCentreSchema);
