
const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");

const Post = require('./models/post');
const User = require('./models/user');

const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require("./middleware/check-auth");

const userRoutes = require('./routes/user.js');
const testCentreRoutes = require('./routes/test-centre.js');
const testKitRoutes = require('./routes/test-kit.js');
const testReportRoutes = require('./routes/test-report.js');

const app = express()



mongoose.connect("mongodb+srv://max:pOEjPzvU79U5ABuC@cluster0.idtz7.mongodb.net/node-angular?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to database')
  })
  .catch(() => {
    console.log('Connection failed')
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT");
  next();
});


// const userRoutes = require('./routes/user1.js');

app.use("/api/user", userRoutes);
app.use("/api/test-centre", testCentreRoutes);
app.use("/api/test-kit", testKitRoutes);
app.use("/api/test-report", testReportRoutes);



app.get("/test", ( req, res, next ) => {
  console.log('test ran');
  res.status(201).json({message: 'test ran'});
});


// app.post("/api/posts", checkAuth, (req, res, next) => {
//   const post = new Post({
//     title: req.body.title,
//     content: req.body.content
//   });
//   post.save().then(createdPost => {
//     console.log(post);
//     res.status(200).json({
//       message: 'Post added successfully',
//       postId: createdPost._id
//     });
//   });
//
//   console.log(post);
//   res.status(201).json({message: 'Post added successfully'});
// });
//
//
// app.get('/api/posts', (req, res, next) => {
//   Post.find().then(documents => {
//     res.status(200).json({
//       message: 'Post fetched successfully',
//       posts: documents
//     });
//   });
// });
//
//
// app.delete('/api/posts/:id', checkAuth, (req, res, next) => {
//   Post.deleteOne({_id: req.params.id}).then(result => {
//     console.log(result);
//     res.status(200).json({message: "Post deleted!"});
//   })
// });
//
//
// app.put("/api/posts/:id", checkAuth, (req, res, next) => {
//   const post = new Post({
//     _id: req.body.id,
//     title: req.body.title,
//     content: req.body.content
//   });
//   Post.updateOne({_id: req.params.id}, post).then(result => {
//     console.log(result);
//     res.status(200).json({message: "Update successful!"});
//   });
// });


// app.use('/api/posts', (req, res, next)=>{
//   const posts = [
//     {
//       id: 'fsdfsgsg43',
//       title: "First Server Side Post",
//       content: "This is coming from the server"
//     },
//
//     {
//       id: 'fsadsf2e2',
//       title: "Second Server Side Post",
//       content: "This is also coming from the server"
//     }
//   ];
//
//   res.status(200).json({
//     message: 'Post fetched successfully',
//     posts:posts
//   });
// })




// app.post('/api/user/signup', (req, res, next) => {
//   bcrypt.hash(req.body.password, 10)
//     .then(hash => {
//       const user = new User({
//         email: req.body.email,
//         password: hash
//       });
//       user.save()
//         .then(result => {
//           res.status(201).json({
//             message: 'User created',
//             result:result
//           });
//         })
//         .catch(err => {
//           res.status(500).json({
//             error:err
//           });
//         });
//     });
// });
//
//
// app.post('/api/user/login', (req, res, next) => {
//   let fetchedUser;
//   User.findOne({email:req.body.email})
//     .then(user => {
//       if (!user) {
//         return res.status(401).json({
//           message: 'Auth failed'
//         });
//       }
//       fetchedUser = User
//       return bcrypt.compare(req.body.password, user.password)
//     })
//     .then(result => {
//       if (!result){
//         return res.status(401).json({
//           message: 'Auth failed'
//         });
//       }
//       const token = jwt.sign(
//         {email: fetchedUser.email, userId: fetchedUser._id},
//         'secret_this_should_be_longer',
//         {expiresIn: '1h'}
//       );
//       res.status(200).json({
//         token: token
//       })
//     })
//       .catch(err => {
//         return res.status(401).json({
//           message: 'Auth failed'
//         });
//       });
// });


























module.exports = app;

//database password: pOEjPzvU79U5ABuC
