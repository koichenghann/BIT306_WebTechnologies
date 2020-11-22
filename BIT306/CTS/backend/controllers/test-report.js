// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const TestReport = require("../models/test-report");
const TestCentre = require("../models/test-centre");
const User = require("../models/user");
const { restart } = require("nodemon");
const { response } = require("express");


exports.test = ( req, res, next ) => {
  console.log('test - test report controller');
  res.status(201).json({message: 'test ran - test report controller'});
}

//add new test report
exports.createTestReport = (req, res, next) => {
  console.log ("create test report method ran.");
  const testReport = new TestReport({
    testID: req.body._id,
    username: req.body.username,
    patientType: req.body.patientType,
    symptoms: req.body.symptoms,
    otherSymptoms: req.body.otherSymptoms,
    description: req.body.description,
    testStatus: req.body.testStatus,
    date: req.body.date,
    tester: req.body.tester,
    centre: req.body.centre,
    testResult: req.body.testResult,
    resultDate: req.body.resultDate
  });
  testReport.save().then(createdTestReport =>{
      console.log("New Test Report:" + testReport);
      res.status(201).json({
        message: 'Test report created successfully',
        testID: createdTestReport._id
      })


  })
  .catch( error => {
    res.status(401).json({message: 'Test report creation failed'});
  })
}

//get test report (retrieve report)
exports.getTestReport = (req, res, next) => {
  TestReport.find({centre: req.body.centre}).then( response =>{
    if ( !response ){
      res.status(401).json({
        message: 'no test report found',
        testReport: []
      })
    }

    return res.status(201).json({
      message: 'tester retrieved',
      testReports: response
    })
  })
  .catch ( err => {
    res.status(500).json({
      message: 'error occured on getting TestReport',
      error: err
    })
  });
}

//update test report
exports.updateTestReport = (req, res, next) =>{
  const updatedTestReport = {
    username: req.body.username,
    patientType: req.body.patientTyp,
    symptoms: req.body.symptoms,
    otherSymptoms: req.body.otherSymptoms,
    description: req.body.description,
    testStatus: req.body.testStatus,
    date: req.body.date,
    tester: req.body.tester,
    centre: req.body.centre,
    testResult: req.body.testResult,
    resultDate: req.body.resultDate
  }
  TestReport.updateOne({_id: req.params.id}, updatedTestReport).then( response => {
      console.log("Test report updated" + response);
      res.status(200).json({message: "Test Report Updated successfully"})
    })
    .catch( error => {
      res.status(500).json({
        message: 'Error occured at update rest report',
        error: error
      })
    });
  }

//delete test report
exports.delete = (req, res, next)=> {
  TestReport.deleteOne({_id: req.params.id}).then( response => {
    console.log("Test Report deleted: " + response);
    res.status(200).json({message: "Test report deleted successfully!"});
  })
  .catch (error =>{
    res.status(500).json({
      message: 'Error occured at delete test report',
      error: error
    })
  })
}
