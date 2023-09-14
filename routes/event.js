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

// bootstrap css files from node_modules
router.use(express.static("node_modules/bootstrap/dist/css"));
router.use(morgan('tiny'));

// Parse request bodies as JSON and URL-encoded
router.use(express.urlencoded({extended: true}));
router.use(express.json());

const mongoose = require('mongoose');
const Category = require("../models/category");
const Event = require("../models/event");

/**
 * Route handler for rendering the "Add Event" page.
 * @name GET-/sidd/events/add
 * @function
 */
router.get("/sidd/events/add", async (req, res) => {
    const categories = await Category.find({});
    if (categories.length == 0) {
        res.render("add-event-without-category"); // If no category added then render to a page which asks to add a category
    } else {
        res.render("add-event");
    }
})

/**
 * Route handler for processing the "Add Event" form.
 * @name POST-/sidd/events/add
 * @function
 */
router.post("/sidd/events/add", async (req, res) => {
    try {
        let reqBody = req.body;

        if(reqBody.capacity == '' && reqBody.ticketsAvailable == ''){
            const newEvent = new Event({ name: reqBody.name,
                description: reqBody.description,
                startTime: reqBody.startTime + ":00.000Z",
                duration: reqBody.duration,
                isActive: reqBody.isActive == 'on',
                image: reqBody.image,
                categoryID: reqBody.categoryID
            });

            //Splitting user input
            let categoryIDList = reqBody.categoryID.split(",");
            
            let i=0;
            //Removing any whitespace in the array elements
            categoryIDList.forEach(categoryID => {
                categoryIDList[i] = categoryID.trim();
                i++;
            });

            const category = await Category.find({catId: {$in: categoryIDList}});
            newEvent.categoryList = category;

            await newEvent.save();

            res.redirect("/sidd/events");
        } else if (reqBody.capacity != '' && reqBody.ticketsAvailable == '') {
            const newEvent = new Event({ name: reqBody.name,
                description: reqBody.description,
                startTime: reqBody.startTime + ":00.000Z",
                duration: reqBody.duration,
                isActive: reqBody.isActive == 'on',
                image: reqBody.image,
                capacity: reqBody.capacity,
                categoryID: reqBody.categoryID
            });

            //Splitting user input
            let categoryIDList = reqBody.categoryID.split(",");
            
            let i=0;
            //Removing any whitespace in the array elements
            categoryIDList.forEach(categoryID => {
                categoryIDList[i] = categoryID.trim();
                i++;
            });

            const category = await Category.find({catId: {$in: categoryIDList}});
            newEvent.categoryList = category;

            await newEvent.save();

            res.redirect("/sidd/events");
        } else if (reqBody.capacity != '' && reqBody.ticketsAvailable != '') {
            const newEvent = new Event({ name: reqBody.name,
                        description: reqBody.description,
                        startTime: reqBody.startTime + ":00.000Z",
                        duration: reqBody.duration,
                        isActive: reqBody.isActive == 'on',
                        image: reqBody.image,
                        capacity: reqBody.capacity,
                        availableTickets: reqBody.ticketsAvailable,
                        categoryID: reqBody.categoryID
                    });
                
            //Splitting user input
            let categoryIDList = reqBody.categoryID.split(",");
            
            let i=0;
            //Removing any whitespace in the array elements
            categoryIDList.forEach(categoryID => {
                categoryIDList[i] = categoryID.trim();
                i++;
            });

            const category = await Category.find({catId: {$in: categoryIDList}});
            newEvent.categoryList = category;

            await newEvent.save();

            res.redirect("/sidd/events");
        } else {
            console.log("You are not providing correct inputs")
        }
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
    try {
        const events = await Event.find({});
        res.render("list-all-events", {events: events});
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
    res.render("list-soldout-events", {events: events});
})

/**
 * Route handler for displaying category details.
 * @name GET-/sidd/category?id=
 * @function
 * @param {import("express").Request} 
 * @param {import("express").Response} 
 */
router.get("/sidd/category", async (req, res) => {
    const showCategoryId = req.query.id;
    numberOfCategories = await Category.countDocuments();
    if(numberOfCategories == 0){
        res.render("show-category-without-categories.html" ); //If no categories present then cannot display a category
    }else{
        if(showCategoryId==undefined){
            const category = await Category.findOne({}).populate('eventsList');
            const events = await Event.find({});
            res.render("show-category-details", { categories: category, events: events }); //If no category specified by user then show a default category
        }else{
            const category = await Category.findOne({ catId: showCategoryId }).populate('eventsList');
            
            if (category == null){
                res.render("wrong-cat-name", {catID: showCategoryId});
            }
            const events = await Event.find({});
            res.render("show-category-details", { categories: category, events: events });
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

    if (deleteid == "") {
        res.render("delete-event.html") // If no event ID specified then display a page which tells the user to input parameters
    } else {
        const deletedEvent = await Event.findOneAndDelete({eventId: deleteid});

        res.redirect("/sidd/events");
    }
})

/**
 * @exports router
 */
module.exports = router;
