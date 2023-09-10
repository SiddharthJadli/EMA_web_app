const express = require("express");
const eventController = require("../controller/event-controller");

const router = express.Router();

router.post("/add-event", eventController.insertEvent);
router.get("/events", eventController.listEvents);
router.put("/update-event", eventController.updateEvent);
router.delete("/delete-event", eventController.deleteEvent);

module.exports = router;