const express = require('express');

const morgan = require("morgan")
const ejs = require("ejs");
const path = require("path");

const Deletecat = require("./models/task1DeleteCategory");

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



//Jade part

app.get('/jade/list-category-by-keyword', function(req, res) {
    fileName = VIEWS_PATH + "list-category-by-keyword.html";
    res.sendFile(fileName);
});

app.get('/delete-category-by-ID.html', function(req, res) {
    fileName = VIEWS_PATH + "delete-category-by-ID.html";
    res.sendFile(fileName);
});

app.get('/list-all-category.html', function(req, res) {
    fileName = VIEWS_PATH + "list-all-category.html";
    res.sendFile(fileName);
});

app.get('/33306036/add', function(req, res) {
    fileName = VIEWS_PATH + "add-category.html";
    res.sendFile(fileName);
});

app.get('/show-event-details.html', function(req, res) {
    fileName = VIEWS_PATH + "show-event-details.html";
    res.sendFile(fileName);
});


app.post('/add-category.html', function(req,res) {
    console.log(req.body.name);
    console.log(req.body.description);
    console.log(req.body.image);
    res.send('Thank You')

})

// Task 1 point 5 delete category by ID
app.post("/delete-category", function (req,res) {
    let id =parseInt(req.body.id); 
    for (let i = 0; i < db.length; i++) {
		if (db[i].id === id) {
			db.splice(i, 1);
			break;
		} //check agn^
	}
    res.redirect("/list-all-category");
});

//Sidd part

const Event = require("./models/event");









//404 errors
app.get("*", function(req, res) {
    fileName = VIEWS_PATH + "404.html"
    res.sendFile(fileName);
    });