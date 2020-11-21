const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const reportSchema = mongoose.Schema({
  username:        {type: String, required: true},
  patientType:     {type: String, required: true},
  symptoms:        {type: String, required: true},
  otherSymptoms:    {type: String, required: true},
  description:     {type: String, required: true},
  testStatus:      {type: String, required: true},
  date:            {type: String, required: true},
  tester:          {type: String, required: true},
  centre:          {type: String, required: true},
  testResult:      {type: String, required: true},
  resultDate:      {type: String, required: true}
});

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Report',reportSchema);
