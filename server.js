const express = require('express');
const morgan = require("morgan")
const path = require("path");
const ejs = require("ejs");

// const router = require("./routes/event-category");
// app.use("/category" , router);

const app = express();

app.use(express.static("node_modules/bootstrap/dist/css"));
app.use(morgan('tiny'));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static("Images"));
app.engine("html", ejs.renderFile);
app.set("view engine", "html");

const print = console.log;
const VIEWS_PATH = path.join(__dirname, "/views/");

let eventsDB = [];
let categoriesDB = [];

const PORT_NUMBER = 8080;

app.listen(PORT_NUMBER, function () {
	print(`listening on port ${PORT_NUMBER}`);
});  //server listening

//Default
app.get("/" , function (req, res) {
    res.render("index");
});

//Jade
const Category = require("./models/category");

app.get("/category/33306036/add", function(req,res) {
    res.sendFile (VIEWS_PATH + "add-category.html");
})

app.post("/category/33306036/add", function (req,res) {
    let reqBody = req.body;
    console.log(reqBody);

    //adding new category objects
    let aCategory = new Category(reqBody.categoryID, reqBody.name, reqBody.description, reqBody.image, new Date());
    categoriesDB.push(aCategory);
    res.redirect("/category/33306036/list-all");
});

app.get("/category/33306036/list-all" , function (req, res) {
    res.render("list-all-category", {categories: categoriesDB});
});

app.get("/category/33306036/show-event-details/:showEventId", function(req, res){
    const showEventId = req.params.id;
    
    if(eventsDB.length == 0){
        res.sendFile( VIEWS_PATH + "show-event-without-events.html" );
    }else{
        if(showEventId==undefined){
            res.render("show-event-details", { categories: categoriesDB, index: 0 , events: eventsDB});
        }else{
            for (let index = 0; index < eventsDB.length; index++) {
                if (eventsDB[index].id == showEventId) {
                    res.render("show-event-details", { categories: categoriesDB, index: index , events: eventsDB});
                    break;
                } 
            }
        }
    }
})

//filtering category list by keyword in name and description
app.get("/category/33306036/list-by-keyword", function (req, res) {
    const keyword = req.query.keyword;
    const filteredCategories = categoriesDB.filter(function (category) {
        return category.description.includes(keyword) || category.name.includes(keyword);
    });

    if (keyword) {
        if (filteredCategories.length > 0) {
            console.log("Keyword found");
            res.render("list-all-category", { categories: filteredCategories, keyword: keyword });
        } else {
            console.log("Keyword not found");
            res.render("list-all-category", { categories: categoriesDB, keyword: keyword });
        }
    } else {
        res.render("list-all-category", { categories: categoriesDB, keyword: keyword });
    }
});

// Task 1 point 5 delete category by ID
app.get("/category/33306036/delete-by-ID", function (req, res) {
	res.sendFile(path.join(__dirname, "views", "delete-category-by-ID.html")); 
});

app.post("/category/33306036/delete-by-ID", function (req,res) {
   const categoryID = req.body.categoryID;
    for (let i = 0; i < categoriesDB.length; i++) {
		console.log("Comparing with category:", categoriesDB[i].id);
        if (categoriesDB[i].id === categoryID) {
			console.log("Deleting category:", categoriesDB[i]);
            categoriesDB.splice(i, 1);
			break;
		} 
	}
    console.log("After deleting:", categoriesDB);
    res.redirect("/category/33306036/list-all");
});

//Sidd
const Event = require("./models/event");

// const router = require("./routes/event-category");
// app.use("/category" , router);

//Adding a new event
app.get("/sidd/events/add", function(req, res){
    if (categoriesDB.length == 0){
        res.sendFile( VIEWS_PATH + "add-event-without-category.html" );
    } else{
        res.sendFile( VIEWS_PATH + "add-event.html" );
    }
})

app.post("/sidd/events/add", function(req, res){
    let reqBody = req.body;
    let newEvent = new Event(reqBody.name, reqBody.description, reqBody.startDateTime, reqBody.duration, reqBody.isActive, reqBody.image, reqBody.capacity, reqBody.ticketsAvailable, reqBody.categoryID);
    eventsDB.push(newEvent);
    res.redirect("/sidd/events");
})

//Listing all events
app.get("/sidd/events", function(req, res){
    res.render("list-all-events", { events: eventsDB });
})

// Listing sold out events
app.get("/sidd/soldout-events", function(req, res){
    res.render("list-soldout-events", { events: eventsDB });
})

// Show category detail
app.get("/sidd/category", function(req, res){
    const showCategoryId = req.query.id;
    
    if(categoriesDB.length == 0){
        res.sendFile( VIEWS_PATH + "show-category-without-categories.html" );
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
});

//Deleting an event
app.get("/sidd/events/delete", function(req, res){
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

//404 errors
app.get("*", function(req, res) {
    fileName = VIEWS_PATH + "404.html"
    res.sendFile(fileName);
});