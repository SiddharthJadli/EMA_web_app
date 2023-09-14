/**
 * Express router for statistics.
 * @module routes/statsRouter
 * @requires express
 * @requires stats
 */
const express = require("express");
const stats = require("../controller/stats");
const router = express.Router();
/**
 * Get the count of categories.
 * @name GET /categorycount
 * @function
 */
router.get("/categorycount", stats.countCategories);
/**
 * Get the count of events.
 * @name GET /eventcount
 * @function
 */
router.get("/eventcount", stats.countEvents);
/**
 * Get the count of deletes
 * @name GET /deletecount
 * @function
 */
router.get("/deletecount", stats.deleteCount);
/**
 * Get the count of add.
 * @name GET /addcount
 * @function
 */
router.get("/addcount", stats.addCount);
/**
 * Get the count of updates.
 * @name GET /updatecount
 * @function
 */
router.get("/updatecount", stats.updateCount);

module.exports = router;
