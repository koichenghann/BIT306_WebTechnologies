// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const TestKit = require("../models/test-kit");


exports.test = ( req, res, next ) => {
  console.log('test from test-kit controller');
  res.status(201).json({message: 'test ran - test-kit controller'});
}

exports.create = ( req, res, next ) => {
  const testKit = new TestKit({
    centre: req.body.centre,
    name: req.body.name,
    stock: req.body.stock
  });

  testKit.save().then( response => {
    console.log("TestKit Created: " + response);
    res.status(200).json({
      message: 'TestKit added successfully',
      id: response._id
    });
  })
  .catch( error => {
    res.status(500).json({
      message: 'Error occured at create testKit',
      error: error
    })
  })
}




exports.retrieve = ( req, res, next ) => {
  console.log('retrieve testkit ran: ' + JSON.stringify(req.body.centre));
  TestKit.find({centre: req.body.centre}).then( response => {
    // console.log('testkit retrieved: ' + response);
    if ( !response ) {
      return res.status(401).json({
        message: 'TestKit not found',
        testKits: []
      })
    }
    res.status(201).json({
      message: 'TestKit retrieved succefully!',
      testKits: response
    })
  })
  .catch( error => {
    res.status(500).json({
      message: 'Error occured at retrieve testKit',
      error: error
    })
  })
}




exports.update = ( req, res, next ) => {
  const updateDetails = {
    name: req.body.name,
    stock: req.body.stock
  }
  TestKit.updateOne({_id: req.params.id}, updateDetails).then( response => {
    console.log("TestKit Updated: " + response);
    res.status(200).json({message: "TesKit updated successful!"});
  })
  .catch( error => {
    res.status(500).json({
      message: 'Error occured at update testKit',
      error: error
    })
  })
}




exports.delete = ( req, res, next ) => {
  TestKit.deleteOne({_id: req.params.id}).then( response => {
    console.log("TestKit Deleted: " + response);
    res.status(200).json({message: "TestKit deleted succefully!"});
  })
  .catch( error => {
    res.status(500).json({
      message: 'Error occured at delete testKit',
      error: error
    })
  })
}
