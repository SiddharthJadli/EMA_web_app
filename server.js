const express = require('express');

const morgan = require("morgan")
const ejs = require("ejs");
const path = require("path");

const Deletecat = require("./models/task1DeleteCategory");
const Event = require("./models/event");

const app = express();
app.use(express.static("node_modules/bootstrap/dist/css"));
app.use(morgan('tiny'));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());



const print = console.log;
const VIEWS_PATH = path.join(__dirname, "/views/");

let db = [];

const PORT_NUMBER = 8080;

app.listen(PORT_NUMBER, function () {
	print(`listening on port ${PORT_NUMBER}`);
});  //server listening



//Default
app.get('/', function(req, res) {
    fileName = VIEWS_PATH + "index.html"; 
    res.sendFile(fileName);
});



//Jade 
app.get('/category/33306036/list-by-keyword', function(req, res) {
    fileName = VIEWS_PATH + "list-category-by-keyword.html";
    res.sendFile(fileName);
});

app.get('/category/33306036/delete-event-by-ID', function(req, res) {
    fileName = VIEWS_PATH + "delete-category-by-ID.html";
    res.sendFile(fileName);
});

app.get('/category/33306036/list-all', function(req, res) {
    fileName = VIEWS_PATH + "list-all-category.html";
    res.sendFile(fileName);
});

app.get('/category/33306036/add', function(req, res) {
    fileName = VIEWS_PATH + "add-category.html";
    res.sendFile(fileName);
});

app.get('/category/33306036/show-event-details', function(req, res) {
    fileName = VIEWS_PATH + "show-event-details.html";
    res.sendFile(fileName);
});

//Task 1 point 1 
app.post('/category/33306036/add', function(req,res) {
    console.log(req.body.name);
    console.log(req.body.description);
    console.log(req.body.image);
    res.redirect("/category/33306036/list-all");
})

//Task 1 point 2: list all categories
// Task 1 point 5 delete category by ID
app.post("/category/33306036/delete-event-by-ID", function (req,res) {
    let id =parseInt(req.body.id); 
    for (let i = 0; i < db.length; i++) {
		if (db[i].id === id) {
			db.splice(i, 1);
			break;
		} //check agn^
	}
    res.redirect("/category/33306036/list-all");
});

//Sidd
// const Event = require("./models/event");

//Adding a new event

app.get("/sidd/event/add", function(req, res){
    res.sendFile( VIEWS_PATH + "addevent.html" )
})

app.post("/sidd/event/add", function(req, res){
    let reqBody = req.body;
    let aEvent = new Event(reqBody.eventName, reqBody.eventDescription, reqBody.eventImage, reqBody.eventStartTime, reqBody.eventDuration, reqBody.eventActive, reqBody.eventCapacity, reqBody.eventAvailableTickets, reqBody.categoryID);
    res.send(".");
})





//404 errors
app.get("*", function(req, res) {
    fileName = VIEWS_PATH + "404.html"
    res.sendFile(fileName);
    });