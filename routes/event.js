let express = require("express");
let router = express.Router();
const morgan = require("morgan")
const ejs = require("ejs");
let path = require("path");

const categoryRouter = require("./event-category");

pathRoot = "/Users/siddharthjadli/Monash/2023Sem2/FIT2095/Ass/assignment-1/server.js";

router.use(express.static("node_modules/bootstrap/dist/css"));
router.use(morgan('tiny'));

router.use(express.urlencoded({ extended: true}));
router.use(express.json());

const Event = require("../models/event");
let eventsDB = [];

exports.route = function(req, res){
    const categoriesDB = req.app.locals.categoriesDB;
}

//Adding a new event
router.get("/sidd/events/add", function(req, res){
    if (categoriesDB.length == 0){
        res.render("add-event-without-category" );
    } else{
        res.render("add-event" );
    }
})

router.post("/sidd/events/add", function(req, res){
    let reqBody = req.body;
    let newEvent = new Event(reqBody.name, reqBody.description, reqBody.startDateTime, reqBody.duration, reqBody.isActive, reqBody.image, reqBody.capacity, reqBody.ticketsAvailable, reqBody.categoryID);
    eventsDB.push(newEvent);
    res.redirect("/sidd/events");
})

//Listing all events
router.get("/sidd/events", function(req, res){
    res.render("list-all-events", { events: eventsDB });
})

// Listing sold out events
router.get("/sidd/soldout-events", function(req, res){
    res.render("list-soldout-events", { events: eventsDB });
})

// Show category detail
router.get("/sidd/category", function(req, res){
    const showCategoryId = req.query.id;
    
    if(categoriesDB.length == 0){
        res.render("show-category-without-categories.html" );
    }else{
        if(showCategoryId==undefined){
            res.render("show-category-details", { categories: categoriesDB, index: 0 , events: eventsDB});
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


//Deleting an event
router.get("/sidd/events/delete", function(req, res){
    const deleteid = req.query.id;
    
    if(deleteid==undefined){
        res.sendFile( VIEWS_PATH + "delete-event.html" )
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

module.exports = router;