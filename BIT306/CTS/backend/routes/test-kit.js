const express = require("express");
const router = express.Router();

const TestKitController = require("../controllers/test-kit");


router.get("/test", TestKitController.test);

router.post("/create"), TestKitController.create);
router.post("/retrieve"), TestKitController.retrieve);
router.put("/:id"), TestKitController.update);
router.delete("/:id"), TestKitController.delete);







module.exports = router;
