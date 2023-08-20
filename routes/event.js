// let express = require("express");
// let router = express.Router();
// let path = require("path");
// const { VIEWS_PATH } = require("../server");

// pathRoot = "/Users/siddharthjadli/Monash/2023Sem2/FIT2095/Ass/assignment-1/server.js";

// //Sidd 
// const Event = require("./models/event");

// //Adding a new event
// app.get("/sidd/events/add", function(req, res){
//     if (categoriesDB.length == 0){
//         res.sendFile( VIEWS_PATH + "add-event-without-category.html" )
//     } else{
//         res.sendFile( VIEWS_PATH + "add-event.html" )
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

// //Listing sold out events
// app.get("/sidd/soldout-events", function(req, res){
//     res.render("list-soldout-events", { events: eventsDB });
// })

// //Deleting an event
// app.get("/sidd/events/delete", function(req, res){
//     const ID = req.query.id;
    
//     if(ID==undefined){
//         res.sendFile( VIEWS_PATH + "delete-event.html" )
//     }else{
//         // console.log(ID)
//         // console.log(eventsDB[0]);
//         for (let i = 0; i < eventsDB.length; i++) {
//             if (eventsDB[i].ID === ID) {
//                 eventsDB.splice(i, 1);
//                 break;
//             } 
//         }

//         res.redirect("/sidd/events");
//     }
// })

// module.exports = router;