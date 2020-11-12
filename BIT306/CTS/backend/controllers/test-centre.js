// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const TestCentre = require("../models/test-centre");


exports.test = ( req, res, next ) => {
  console.log('test - test centre controller');
  res.status(201).json({message: 'test ran - test centre controller'});
}


export.createTestCentre = ( req, res, next ) => {
  const testCentre = new TestCentre({
    title: req.body.title,
    content: req.body.content
  });
  testCentre.save().then(createdTestCentre => {
    console.log(testCentre);
    res.status(200).json({
      message: 'Test Centre added successfully',
      centreId: createdTestCentre._id
    });
  })

  console.log(testCentre);
  res.status(201).json({message: 'Test Centre added successfully'});
}
