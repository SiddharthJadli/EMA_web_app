const express = require('express');
const app = express();
const morgan = require("morgan")
const path = require("path");
const ejs = require("ejs");
const Category = require("./models/category");

const router = require("./routes/event-category");
app.use("/category" , router);


app.use(express.static("node_modules/bootstrap/dist/css"));
app.use(morgan('tiny'));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static("Images"));
app.engine("html", ejs.renderFile);
app.set("view engine", "html");



const print = console.log;
const VIEWS_PATH = path.join(__dirname, "/views/");

let db = [];

const PORT_NUMBER = 8080;

app.listen(PORT_NUMBER, function () {
	print(`listening on port ${PORT_NUMBER}`);
});  //server listening



app.post("/category/33306036/add", function (req,res) {
    let reqBody = req.body;
    console.log(reqBody);
    let aCategory = new Category(reqBody.categoryName, reqBody.categoryDescription, reqBody.categoryImage, reqBody.categoryCreatedAt)
    db.push(aCategory);
    res.redirect("/category/33306036/list-all");
});

app.get("/" , function (req, res) {
    res.render("index");
});

app.get("/category/33306036/list-all" , function (req, res) {
    res.render("list-all-category", {categories: db});
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

//Adding a new event

app.get("/sidd/event/add", function(req, res){
    res.sendFile( VIEWS_PATH + "addevent.html" )
})

app.post("/sidd/event/add", function(req, res){
    let reqBody = req.body;
    let aEvent = new Event(reqBody.eventName, reqBody.eventDescription, reqBody.eventImage, reqBody.eventStartTime, reqBody.eventDuration, reqBody.eventActive, reqBody.eventCapacity, reqBody.eventAvailableTickets, reqBody.categoryID);
    db.push(aEvent);
    res.send(".");
})





//404 errors
app.get("*", function(req, res) {
    fileName = VIEWS_PATH + "404.html"
    res.sendFile(fileName);
    });
