const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const testCentreSchema = mongoose.Schema({
  // id: {type: String, required: true},
  state: {type: String, required: true},
  address: {type: String, required: true},
  officer: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  contact: {type: String, required: true}
});

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('TestCentre',testCentreSchema);
