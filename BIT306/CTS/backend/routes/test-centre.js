const express = require("express");
const router = express.Router();

// const TestCentreController = require("../controllers/test-centre");
const TestCentreController = require("../controllers/test-centre");

//
router.get("/test", TestCentreController.test);
router.post("/find", TestCentreController.findTestCentre);
router.post("/create", TestCentreController.createTestCentre);
router.put("/:id", TestCentreController.updateTestCentre);









module.exports = router;
