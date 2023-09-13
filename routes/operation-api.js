const express = require("express");
const stats = require("../controller/stats");
const router = express.Router();
// router.get("/operation/getCounter", stats.getCounter);
// router.get("/operation/incrementCounter", stats.incrementCounter);

router.get("/categorycount", stats.countCategories);
router.get("/eventcount", stats.countEvents);

router.get("/deletecount", stats.deleteCount);
router.get("/addcount", stats.addCount);
router.get("/updatecount", stats.updateCount);

module.exports = router;
