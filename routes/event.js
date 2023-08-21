// let express = require("express");
// let router = express.Router();
// const morgan = require("morgan")
// const ejs = require("ejs");
// let path = require("path");

// const { VIEWS_PATH } = require("../server");

// pathRoot = "/Users/siddharthjadli/Monash/2023Sem2/FIT2095/Ass/assignment-1/server.js";

// const app = express();

// app.use(express.static("node_modules/bootstrap/dist/css"));
// app.use(morgan('tiny'));

// app.use(express.urlencoded({ extended: true}));
// app.use(express.json());

// app.use(express.static("images"));
// app.engine("html", ejs.renderFile);
// app.set("view engine", "html");

// const Event = require("../models/event");

// //Adding a new event
// app.get("/sidd/events/add", function(req, res){
//     if (categoriesDB.length == 0){
//         res.sendFile( VIEWS_PATH + "add-event-without-category.html" );
//     } else{
//         res.sendFile( VIEWS_PATH + "add-event.html" );
//     }
// })

// app.post("/sidd/events/add", function(req, res){
//     let reqBody = req.body;
//     let newEvent = new Event(reqBody.name, reqBody.description, reqBody.startDateTime, reqBody.duration, reqBody.isActive, reqBody.image, reqBody.capacity, reqBody.ticketsAvailable, reqBody.categoryID);
//     eventsDB.push(newEvent);
//     res.redirect("/sidd/events");
// })

// //Listing all events
// app.get("/sidd/events", function(req, res){
//     res.render("list-all-events", { events: eventsDB });
// })

// // Listing sold out events
// app.get("/sidd/soldout-events", function(req, res){
//     res.render("list-soldout-events", { events: eventsDB });
// })

// // Show category detail
// app.get("/sidd/category", function(req, res){
//     const showCategoryId = req.query.id;
    
//     if(categoriesDB.length == 0){
//         res.sendFile( VIEWS_PATH + "show-category-without-categories.html" );
//     }else{
//         if(showCategoryId==undefined){
//             res.render("show-category-details", { categories: categoriesDB, index: 0 , events: eventsDB});
//         }else{
//             for (let i = 0; i < categoriesDB.length; i++) {
//                 if (categoriesDB[i].id == showCategoryId) {
//                     res.render("show-category-details", { categories: categoriesDB, index: i , events: eventsDB});
//                     break;
//                 } 
//             }
//         }
//     }
// })


// //Deleting an event
// app.get("/sidd/events/delete", function(req, res){
//     const deleteid = req.query.id;
    
//     if(deleteid==undefined){
//         res.sendFile( VIEWS_PATH + "delete-event.html" )
//     }else{
//         for (let i = 0; i < eventsDB.length; i++) {
//             if (eventsDB[i].id === deleteid) {
//                 eventsDB.splice(i, 1);
//                 break;
//             } 
//         }

//         res.redirect("/sidd/events");
//     }
// })