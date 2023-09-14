const express = require("express");
const stats = require("../controller/stats");
const router = express.Router();

router.get("/categorycount", stats.countCategories);
router.get("/eventcount", stats.countEvents);
router.get("/deletecount", stats.getCounter);
router.get("/addcount", stats.getCounter);
router.get("/updatecount", stats.getCounter);

module.exports = router;
