const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const testKitSchema = mongoose.Schema({
  centre: {type: mongoose.Schema.Types.ObjectId, ref: 'TestCentre'},
  name: {type: String, required: true},
  stock: {type: Number, required: true}
});

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('TestKit',testKitSchema);
