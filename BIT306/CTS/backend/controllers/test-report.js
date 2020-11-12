// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const Report = require("../models/test-report");


exports.test = ( req, res, next ) => {
  console.log('test - test report controller');
  res.status(201).json({message: 'test ran - test report controller'});
}
