const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");


exports.test = ( req, res, next ) => {
  console.log('test - user controller');
  res.status(201).json({message: 'test ran - user controller'});
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
