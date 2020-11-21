const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");


exports.test = ( req, res, next ) => {
  console.log('test - user controller');
  res.status(201).json({message: 'test ran - user controller'});
}


exports.checkUsernameIsUnique = (req, res, next) => {
  console.log('check username is unique ran' + req.body.username);
  User.findOne({username:req.body.username}).then( user => {
    if (!user) {
      return res.status(201).json({
        username: req.body.username,
        unique: true
      })
    } else {
      return res.status(401).json({
        username: req.body.username,
        unique: false
      })
    }
  })
}

exports.signup = (req, res, next) => {
  console.log('signup ran');
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        username: req.body.username,
        password: hash,
        usertype: req.body.usertype,
        contact: req.body.contact,
        address: req.body.address,
        centre: req.body.centre
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'User created',
            result:result
          });
        })
        .catch(err => {
          res.status(500).json({
            error:err
          });
        });
    });
}



exports.login = (req, res, next) => {
  console.log(req.body);
  let fetchedUser;
  User.findOne({username:req.body.username})
    .then(user => {
      if (!user) {
        return res.status(401).json({
          token: null,
          user: null,
          message: 'Auth failed - user not found'
        });
      }
      fetchedUser = user
      return bcrypt.compare(req.body.password, user.password)
    })
    .then(result => {
      if (!result){
        return res.status(401).json({
          message: 'Auth failed - wrong password'
        });
      }
      const token = jwt.sign(
        {username: fetchedUser.username, userId: fetchedUser._id},
        'secret_this_should_be_longer',
        {expiresIn: '1h'}
      );
      console.log(fetchedUser);
      res.status(200).json({
        token: token,
        user: fetchedUser
      })
    })
      .catch(err => {
        return res.status(401).json({
          message: 'Auth failed - error'
        });
      });
}



exports.getTester = (req, res, next) => {
  // console.log('get Tester ran: ' + JSON.stringify(req.body));
  User.find({centre: req.body.testCentre}).then( response => {
    // console.log('get tester ran: ' + response);
    if ( !response ) {
      res.status(401).json({
        message: 'no tester found'
      })
    }

    return res.status(201).json({
      message: 'tester retrieved',
      testers: response
    })

  })
  .catch( err => {
    res.status(500).json({
      message: 'error occured at getTester',
      error: err
    })
  });
}



exports.updateUser = (req, res, next) => {
  console.log('updateUser ran: ' + req.body.id);
  // var updateDetails = {username: req.body.username, password: req.body.password};
  if (req.body.password == "") {
    User.updateOne({_id: req.body.id}, {username: req.body.username}).then( response => {
      console.log('updateUser ran: ' + JSON.stringify(response));
      res.status(200).json({
        message: 'User Updated Succesfully!'
      })
    })
    .catch( err => {
      console.log('updateUser failed: ' + JSON.stringify(err));
      res.status(500).json({
        message: 'error occured at updateUser',
        error: err
      })
    })
  } else {
    bcrypt.hash(req.body.password, 10).then(hash => {
      User.updateOne({_id: req.body.id}, {username: req.body.username, password: hash}).then( response => {
        console.log('updateUser ran: ' + JSON.stringify(response));
        res.status(200).json({
          message: 'User Updated Succesfully!'
        })
      })
      .catch( err => {
        console.log('updateUser failed: ' + JSON.stringify(err));
        res.status(500).json({
          message: 'error occured at updateUser',
          error: err
        })
      })
    })
  }

}




exports.deleteUser = (req, res, next) => {
  console.log('delete user ran: ' + req.params.id);
  User.deleteOne({_id: req.params.id}).then( reponse => {
    res.status(200).json({message: "User deleted!"});
  })
  .catch( err => {

  })
}
