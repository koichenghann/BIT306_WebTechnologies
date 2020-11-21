// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const TestReport = require("../models/test-report");
const TestCentre = require("../models/test-centre");
const User = require("../models/user");
const { restart } = require("nodemon");


exports.test = ( req, res, next ) => {
  console.log('test - test report controller');
  res.status(201).json({message: 'test ran - test report controller'});
}

exports.createTestReport = (req, res, next) => {
  console.log ("create test report method ran.");
  const testReport = new TestReport({    //testID: req.body.testID,
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
      console.log(testReport);
      res.status(201).json({
        message: 'Test report created successfully',
        testID: createdTestReport._id
      })
      .catch(err => {
        res.status(401).json({message: 'Test report creation failed'});
      })

  })
}

exports.updateTestReport = (req, res, next) =>{
  TestReport.updateOne({_id: req.params.id},
    {username: req.body.username,
    patientType: req.body.patientTyp,
    symptoms: req.body.symptoms,
    otherSymptoms: req.body.otherSymptoms,
    description: req.body.description,
    testStatus: req.body.testStatus,
    date: req.body.date,
    tester: req.body.tester,
    centre: req.body.centre,
    testResult: req.body.testResult,
    resultDate: req.body.resultDate}).then(result => {
      res.status(200).json({message: "Test Report Updated successfully"})
    });
}

exports.getTestReport = (req, res, next) => {
  TestReport.find({centre: req.body.testCentre}).then( response =>{
    if ( !response ){
      res.status(401).json({
        message: 'no test report found'
      })
    }

    return res.status(201).json({
      message: 'tester retrieved',
      testReports: response
    })
  })
  .catch ( err => {
    res.status(500).json({
      message: 'error occured at getTestReport',
      error: err
    })
  });
}
