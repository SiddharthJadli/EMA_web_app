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

app.use(express.static("images"));
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
    let aCategory = new Category(reqBody.categoryName, reqBody.categoryDescription, reqBody.categoryImage, reqBody.categoryCreatedAt);
    categoriesDB.push(aCategory);
    res.redirect("/category/33306036/list-all");
});



app.get("/category/33306036/list-all" , function (req, res) {
    res.render("list-all-category", {categories: categoriesDB});
});


app.get("/category/33306036/show-event-details", function (req,res) {
    res.render("show-event-details", {events: eventsDB});
});

app.get("/category/33306036/list-by-keyword" , function(req, res) {
    const keyword = req.query.keyword;
    const filterCategory = categoriesDB.filter(category);
    res.render("list-category-by-keyword" , {
        categories: filteredCategories. keyword
    });
});
// Task 1 point 5 delete category by ID
app.get("/category/33306036/delete-by-ID", function (req, res) {
	res.sendFile(path.join(__dirname, "views", "delete-category-by-ID.html")); 
});

app.post("/category/33306036/delete-by-ID", function (req,res) {
    let categoryID =parseInt(req.body.categoryID); 
    for (let i = 0; i < categoriesDB.length; i++) {
		if (categoriesDB[i].categoriesDB === categoriesDB) {
			db.splice(i, 1);
			break;
		} 
	}
    res.redirect("/category/33306036/list-all");
});

//Sidd
const Event = require("./models/event");

//Adding a new event
app.get("/sidd/events/add", function(req, res){
    res.sendFile( VIEWS_PATH + "newevent.html" )
})

app.post("/sidd/events/add", function(req, res){
    let reqBody = req.body;
    console.log(reqBody);
    let newEvent = new Event(reqBody.name, reqBody.description, reqBody.startDateTime, reqBody.duration, reqBody.isActive, reqBody.image, reqBody.capacity, reqBody.ticketsAvailable, reqBody.categoryID);
    eventsDB.push(newEvent);
    res.redirect("/sidd/events");
})

//Listing all events
app.get("/sidd/events", function(req, res){
    res.render("listallevents", { events: eventsDB });
})

//Listing sold out events
app.get("/sidd/sold-out-events", function(req, res){
    //Iterate through events and make a new array of sold out events then parse it in soldEvents
    res.render("listsoldoutevents", { soldEvents: eventsDB });
})


//404 errors
app.get("*", function(req, res) {
    fileName = VIEWS_PATH + "404.html"
    res.sendFile(fileName);
    });
