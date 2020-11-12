const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: {type: String, required: true, unique:true},
  password: {type: String, required: true},
  usertype: {type: String, required: true},
  contact: {type: String, required: true},
  address: {type: String, required: true},
  centre: {type: String, required: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User',userSchema);
