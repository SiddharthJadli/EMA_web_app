const express = require('express');

const morgan = require("morgan")
const path = require("path");
const ejs = require("ejs");
const Category = require("./models/category");

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

const PORT_NUMBER = 8080;

app.listen(PORT_NUMBER, function () {
	print(`listening on port ${PORT_NUMBER}`);
});  //server listening

//Default
app.get("/" , function (req, res) {
    res.render("index");
});

//Jade
app.post("/category/33306036/add", function (req,res) {
    let reqBody = req.body;
    console.log(reqBody);
    let aCategory = new Category(reqBody.categoryName, reqBody.categoryDescription, reqBody.categoryImage, reqBody.categoryCreatedAt);
    db.push(aCategory);
    res.redirect("/category/33306036/list-all");
});



app.get("/category/33306036/list-all" , function (req, res) {
    res.render("list-all-category", {categories: db});
});


app.get("/category/33306036/list-by-keyword" , function(req, res) {
    const keyword = req.query.keyword;
    const filterCategory = db.filter(category);
    res.render("list-category-by-keyword" , {
        categories: filteredCategories. keyword
    });
});
// Task 1 point 5 delete category by ID
app.get("/category/33306036/delete-by-ID", function (req, res) {
	res.sendFile(path.join(__dirname, "views", "delete-category-by-ID.html")); 
});

app.post("/category/33306036/delete-by-ID", function (req,res) {
    let id =parseInt(req.body.id); 
    for (let i = 0; i < db.length; i++) {
		if (db[i].id === id) {
			db.splice(i, 1);
			break;
		} 
	}
    res.redirect("/category/33306036/list-all");
});

//Sidd
const Event = require("./models/event");

let eventsDB = [];

//Adding a new event
app.get("/sidd/events/add", function(req, res){
    res.sendFile( VIEWS_PATH + "add-event.html" )
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

//Listing sold out events
app.get("/sidd/soldout-events", function(req, res){
    //Iterate through events and make a new array of sold out events then parse it in soldEvents
    let soldEventsDB = [];

    for(let i=0;i<eventsDB.length;i++){
        if (eventsDB[i].ticketsAvailable == 0){
            console.log(eventsDB[i]);
            //soldEventsDB.push(eventsDB[i]);
        }
    }

    console.log(soldEventsDB);

    // res.render("list-soldout-events", { soldEvents: soldEventsDB });
})


//404 errors
app.get("*", function(req, res) {
    fileName = VIEWS_PATH + "404.html"
    res.sendFile(fileName);
    });
