/**
 * @requires express
 */

let express = require("express");
let router = express.Router();
/**
 * @requires morgan
 */
const morgan = require("morgan")

pathRoot = "/Users/Jade/Downloads/fit2095-assignments/server.js";

// bootstrap css files from node_modules
router.use(express.static("node_modules/bootstrap/dist/css"));
router.use(morgan('tiny'));

// enable Express to parse request bodies as JSON and URL-encoded
router.use(express.urlencoded({extended: true}));
router.use(express.json());
const mongoose = require('mongoose');
const Category = require("../models/category");
const Event = require("../models/event");
const statsController = require("../controller/stats")


/**
 * Route handler for rendering the "Add Category" page.
 * @name GET-/category/33306036/add
 * @function
 */
router.get("/category/33306036/add", async (req, res) => {
    res.render("add-category");
});


/**
 * Route handler for processing the "Add Category" form.
 * @name POST-/category/33306036/add
 * @function
 */
router.post("/category/33306036/add", async (req, res) => {
    try {
        let reqBody = req.body;
        console.log(reqBody);
        const aCategory = new Category({name: reqBody.name, description: reqBody.description, image: reqBody.image, createdAt: new Date()});
        await aCategory.save();
        console.log('category saved to Mongodb', aCategory);
        const categories = await Category.find({});
        statsController.incrementCounter('add');

        res.render("list-all-category", {categories});
    } catch (error) {
        console.log("err saving category", error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});


/**
 * Router for rendering the "List All Categories" page.
 * @name GET-/category/33306036/list-all
 * @function
 */

router.get("/category/33306036/list-all", async (req, res) => {
    try {
        const categories = await Category.find({});
        res.render("list-all-category", {categories});

    } catch (err) {
        console.log('error getting categories');
    }
});

/**
 * Route handler for displaying event details.
 * @name GET-/category/33306036/show-event-details
 * @function
 * @param {import("express").Request} 
 * @param {import("express").Response} 
 */
router.get("/category/33306036/show-event-details/:eventId", async function (req, res) {
    const showEventId = req.params.eventId;
    countingEvents = await Event.countDocuments();
    if (countingEvents == 0) {
        res.render("show-category-without-categories.html");
    } else {
        if (showEventId == undefined) {
            const events = await Event.findOne({}).populate('categoryList');
            const categories = await Category.find({});
            res.render("show-event-details", {
                events: events,
                categories: categories
            });
        } else {

            const events = await Event.findOne({eventId: showEventId}).populate('categoryList');
            if (events == null) {
                res.render("null-Event", {eventId: showEventId});
            }
            const categories = await Category.find({});
            res.render("show-event-details", {
                events: events,
                categories: categories
            });
        }
    }
});

/**
 * Route handler for listing categories filtered by a keyword.
 * @name GET-/category/33306036/list-by-keyword
 * @function
 * @param {import("express").Request} 
 * @param {import("express").Response} 
 * filtering category list by keyword in name and description
 */
router.get("/category/33306036/list-by-keyword", async (req, res) => {
    const keyword = req.query.keyword;
    const categories = await Category.find({
        name: {
            $regex: keyword,
            $options: 'i'
        }
    });
    res.render("list-all-category", {categories, keyword});

});


/**
 * Rendering the "Delete Category by ID" page.
 * @name GET-/category/33306036/delete-by-ID
 * @function
 */
router.get("/category/33306036/delete-by-ID", async (req, res) => {
    res.render("delete-category-by-ID");
});
/**
 * Delete a category by ID.
 * @name POST /category/33306036/delete-by-ID
 * @function
 */
router.post('/category/33306036/delete-by-ID', async (req, res) => {
    const categoryID = req.body.catId;
    console.log("Received categoryID:", categoryID);
    const deletedCategory = await Category.findOneAndDelete({catId: categoryID});
    statsController.incrementCounter('delete');

    if (deletedCategory) {
        console.log('Deleted category:', deletedCategory);

        res.redirect('/category/33306036/list-all');
    } else {
        console.log('Category ID not found:', categoryID);
    }
});


module.exports = router
