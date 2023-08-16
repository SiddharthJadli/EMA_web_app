const express = require('express');
const app = express();
const ejs = require("ejs");
const path = require("path");
const Deletecat = require("./models/task1DeleteCategory");
app.use(express.static("node_modules/bootstrap/dist/css"));


const VIEWS_PATH = path.join(__dirname, "/views/");


let db = [];
app.listen(8080);  //server listening

//middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//Links to html pages for task 1
app.get('/', function(req, res) {
    fileName = VIEWS_PATH + "index.html"; 
    res.sendFile(fileName);
});

app.get('/list-category-by-keyword.html', function(req, res) {
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

app.get('/add-category.html', function(req, res) {
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