const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user");


router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.get("/test", UserController.test);
router.post("/usernameIsUnique", UserController.checkUsernameIsUnique);
router.post("/getTester", UserController.getTester);
router.post("/update", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);








module.exports = router;
