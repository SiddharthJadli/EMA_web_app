/**
 * @requires express
 */
let express = require("express");
let router = express.Router();

/**
 * @requires morgan
 */
const morgan = require("morgan")

pathRoot = "/Users/siddharthjadli/Monash/2023Sem2/FIT2095/Ass/assignment-1/server.js";

//bootstrap css files from node_modules
router.use(express.static("node_modules/bootstrap/dist/css"));
router.use(morgan('tiny'));

// Parse request bodies as JSON and URL-encoded
router.use(express.urlencoded({ extended: true}));
router.use(express.json());

const mongoose = require('mongoose');
const Category = require("../models/category");
const Event = require("../models/event");



/**
 * Route handler for rendering the "Add Event" page.
 * @name GET-/sidd/events/add
 * @function
 */
router.get("/sidd/events/add", function(req, res){
    if (categoriesDB.length == 0){
        res.render("add-event-without-category" ); //If no category added then render to a page which asks to add a category
    } else{
        res.render("add-event");
    }
})

/**
 * Route handler for processing the "Add Event" form.
 * @name POST-/sidd/events/add
 * @function
 */
router.post("/sidd/events/add", async(req, res) => {
    try{
        let reqBody = req.body;
        console.log(reqBody);
        const newEvent = new Event(reqBody.name, reqBody.description, reqBody.startDateTime, reqBody.duration, reqBody.isActive, reqBody.image, reqBody.capacity, reqBody.ticketsAvailable, reqBody.categoryID);
        await newEvent.save();
        console.log('Event saved to Mongodb', newEvent);
        const events = await Event.find({});
        res.render("/sidd/events", {events});
    } catch (error) {
        console.log("Error while saving event", error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

/**
 * Router for rendering the "List All Events" page.
 * @name GET-/sidd/events
 * @function
 */
router.get("/sidd/events", async (req, res) => {
    try{
        const events = await Event.find({});
        res.render("list-all-events", { events: events });
    } catch (err) {
        console.log('Error while getting events')
    }
})

/**
 * Router for listing all the sold out events (Available tickets == 0)
 * @name GET-/sidd/soldout-events
 * @function
 */
router.get("/sidd/soldout-events", async (req, res) => {
    const events = await Event.find({});
    res.render("list-soldout-events", { events: events });
})

/**
 * Route handler for displaying category details.
 * @name GET-/sidd/category?id=
 * @function
 * @param {import("express").Request} 
 * @param {import("express").Response} 
 */
router.get("/sidd/category", async function(req, res){
    const showCategoryId = req.query.categoryID;
    let category = await Event.findOne({catId: showCategoryId}).populate('eventsList') 
    if(!category){
        res.render("show-category-without-categories.html" ); //If no categories present then cannot display a category
    }else{
        if(showCategoryId==undefined){
            const events = await Event.find({});
            res.render("show-category-details", { categories: categoriesDB, index: 0 , events: events}); //If no category specified by user then show a default category
        }else{
            res.render("show-category-details"< {
                categories: category,
                events: category.eventsList
            });
        }
    }
})

/**
 * Rendering the "Delete Event by ID" page.
 * @name GET-/sidd/events/delete?id=
 * @function
 */
router.get("/sidd/events/delete", async (req, res) => {
    const deleteid = req.query.id;

    if(deleteid==undefined){
        res.render("delete-event.html" ) //If no category ID specified then display a page which tells the user to input parameters
    }else{
        const deletedEvent = await Event.findOneAndDelete({eventId: deleteid});

        if (deletedCategory) {
            console.log('Deleted event:', deletedEvent);
            res.redirect("/sidd/events");
        } else {
            console.log('Event ID not found:', deletedEvent);
        }
    }
})

/**
 * @exports router
 */
module.exports = router;