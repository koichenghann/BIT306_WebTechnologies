const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user");
const TestReportController = require("../controllers/test-report");

router.get("/test", UserController.test);
router.get("/test", TestReportController.test);
router.post("/getTestReport", TestReportController.getTestReport);
//router.post("/find", TestReportController.findTestReport);
router.post("/getTestsByUsername",TestReportController.getTestsByUsername);
router.post("/createTestReport", TestReportController.createTestReport);
router.put("/:id", TestReportController.updateTestReport);
router.delete("/:id", TestReportController.deleteTestReport);








module.exports = router;
