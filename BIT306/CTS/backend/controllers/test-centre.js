// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const TestCentre = require("../models/test-centre");
const User = require("../models/user");


exports.test = ( req, res, next ) => {
  // console.log('test - test centre controller');
  res.status(201).json({message: 'test ran - test centre controller'});
}


exports.createTestCentre = ( req, res, next ) => {
  // console.log('create test centre ran');
  const testCentre = new TestCentre({
    state: req.body.state,
    address: req.body.address,
    officer: req.body.officer,
    contact: req.body.contact
  });
  testCentre.save().then(createdTestCentre => {
    // console.log(createdTestCentre);
    User.updateOne({_id: req.body.officer}, {centre: createdTestCentre._id}).then( updateUser => {
      res.status(201).json({message: 'Test Centre Created Successfully'});
    })
    .catch(err => {
      res.status(401).json({message: 'Test Centre creation failed 2 at update user part'});
    })
  }).catch( err => {
    res.status(401).json({message: 'Test Centre creation failed 1'});
  })

}
//
// function generateTestCentreId() {
//   TestCentre.findOne({}, {}, {sort:{'created_at' : -1}}).then( response => {
//     console.log('last test centre: ' + response);
//     if (!response) {
//       return 'TC0001';
//     }
//   }).catch( err => {
//
//   })
// }



exports.updateTestCentre = ( req, res, next ) => {
  // console.log('update test centre ran: ' + req.params.id);
  // const testCentre = new TestCentre({
  //   _id: req.body.id,
  //   title: req.body.title,
  //   content: req.body.content
  // });

  TestCentre.updateOne({_id: req.params.id}, {state: req.body.state, address: req.body.address, contact: req.body.contact,}).then(result => {
    res.status(200).json({message: "Test Centre Updated successfully!"})
  });
}

exports.findTestCentre = (req, res, next ) => {
  // generateTestCentreId();
  // console.log('find test centre ran '+ req.body.officer);
  TestCentre.findOne({officer: req.body.officer}).populate('officer').then( testCentre => {
    // console.log(testCentre);
    if ( !testCentre ) {
      return res.status(401).json({
        message: "test centre not found"
      });
    }
    res.status(200).json({
      testCentre: testCentre,
      message: "test centre found"
    });
  })
  .catch( err => {
    return res.status(401).json({
      message: 'test centre not found'
    });
  })
}
