/**
 * Express router for managing events.
 * @module routes/eventRouter
 */
const express = require("express");
const eventController = require("../controller/event-controller");
/**
 * Express router for events.
 * @type {object}
 * @const
 */
const router = express.Router();
/**
 * Route for adding an event.
 * @name POST /add-event
 * @function
 * @memberof module:routes/eventRouter
 * @param {string} path 
 * @param {function} middleware 
 */
router.post("/add-event", eventController.insertEvent);
/**
 * Route for listing events.
 * @name GET /events
 * @function
 * @memberof module:routes/eventRouter
 * @param {string} path - The route path.
 * @param {function} middleware - Middleware function for listing events.
 */
router.get("/events", eventController.listEvents);
/**
 * Route for updating an event.
 * @name PUT /update-event
 * @function
 * @memberof module:routes/eventRouter
 * @param {string} path 
 * @param {function} middleware - Middleware function for updating an event.
 */
router.put("/update-event", eventController.updateEvent);
/**
 * Route for deleting an event.
 * @name DELETE /delete-event
 * @function
 * @memberof module:routes/eventRouter
 * @param {string} path 
 * @param {function} middleware - Middleware function for deleting an event.
 */
router.delete("/delete-event", eventController.deleteEvent);
/**
 * Exports the Express router for events.
 * @type {object}
 * @exports module:routes/eventRouter
 */

module.exports = router;