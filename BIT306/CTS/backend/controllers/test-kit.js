// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const TestKit = require("../models/test-kit");


exports.test = ( req, res, next ) => {
  console.log('test from test-kit controller');
  res.status(201).json({message: 'test ran - test-kit controller'});
}
