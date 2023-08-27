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

const Event = require("../models/event");

/**
 * An array of categories.
 * @type {Event[]}
 */
global.eventsDB = [];
const categoriesDB = require("./event-category").categoriesDB;

/**
 * Route handler for rendering the "Add Event" page.
 * @name GET-/sidd/events/add
 * @function
 */
router.get("/sidd/events/add", function(req, res){
    if (categoriesDB.length == 0){
        res.render("add-event-without-category" ); //If no category added then render to a page which asks to add a category
    } else{
        res.render("add-event" );
    }
})

/**
 * Route handler for processing the "Add Event" form.
 * @name POST-/sidd/events/add
 * @function
 */
router.post("/sidd/events/add", function(req, res){
    let reqBody = req.body;
    console.log(reqBody);
    let newEvent = new Event(reqBody.name, reqBody.description, reqBody.startDateTime, reqBody.duration, reqBody.isActive, reqBody.image, reqBody.capacity, reqBody.ticketsAvailable, reqBody.categoryID);
    // let events = req.app.get("events");
    global.eventsDB.push(newEvent);
    // req.app.set('events', events);
    console.log("duration");
    console.log(eventsDB);
    res.redirect("/sidd/events");
})

/**
 * Router for rendering the "List All Events" page.
 * @name GET-/sidd/events
 * @function
 */
router.get("/sidd/events", function(req, res){
    res.render("list-all-events", { events: eventsDB });
})

/**
 * Router for listing all the sold out events (Available tickets == 0)
 * @name GET-/sidd/soldout-events
 * @function
 */
router.get("/sidd/soldout-events", function(req, res){
    res.render("list-soldout-events", { events: eventsDB });
})

/**
 * Route handler for displaying category details.
 * @name GET-/sidd/category?id=
 * @function
 * @param {import("express").Request} 
 * @param {import("express").Response} 
 */
router.get("/sidd/category", function(req, res){
    const showCategoryId = req.query.id;
    console.log(categoriesDB);   
    if(categoriesDB.length == 0){
        res.render("show-category-without-categories.html" ); //If no categories present then cannot display a category
    }else{
        if(showCategoryId==undefined){
            res.render("show-category-details", { categories: categoriesDB, index: 0 , events: eventsDB}); //If no category specified by user then show a default category
        }else{
            for (let i = 0; i < categoriesDB.length; i++) {
                if (categoriesDB[i].id == showCategoryId) {
                    res.render("show-category-details", { categories: categoriesDB, index: i , events: eventsDB});
                    break;
                } 
            }
        }
    }
})

/**
 * Rendering the "Delete Event by ID" page.
 * @name GET-/sidd/events/delete?id=
 * @function
 */
router.get("/sidd/events/delete", function(req, res){
    const deleteid = req.query.id;
    
    if(deleteid==undefined){
        res.render("delete-event.html" ) //If no category ID specified then display a page which tells the user to input parameters
    }else{
        for (let i = 0; i < eventsDB.length; i++) {
            if (eventsDB[i].id === deleteid) {
                eventsDB.splice(i, 1);
                break;
            } 
        }
        res.redirect("/sidd/events");
    }
})

/**
 * @exports router
 */
module.exports = router;