const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user");


router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.get("/test", UserController.test);

// router.get("/test", ( req, res, next ) => {
//   console.log('test');
//   res.status(201).json({message: 'test ran'});
// });







module.exports = router;
