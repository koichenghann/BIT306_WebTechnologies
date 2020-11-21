const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  username: {type: String, required: true, unique:true},
  password: {type: String, required: true},
  usertype: {type: String, required: true},
  contact: {type: String},
  address: {type: String},
  centre: {type: mongoose.Schema.Types.ObjectId, ref: 'TestCentre'}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User',userSchema);
