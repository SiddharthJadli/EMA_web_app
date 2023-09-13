const express = require("express");
const statsController = require("../controller/stats");
const router = express.Router();

router.get("/operation/categorycount", statsController.countCategories);
router.get("/operation/eventcount", statsController.countEvents);

module.exports = router;
