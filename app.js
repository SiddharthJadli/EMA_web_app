const express = require('express');
const path = require("path");
app.use(express.static("node_modules/bootstrap/dist/css"));

const print = console.log;
const VIEWS_PATH = path.join(__dirname, "/views/");
const PORT_NUMBER = 8080;


const app = express();
app.listen(PORT_NUMBER, function () {
    print(`listening port ${PORT_NUMBER}`);
}); //server listening

//middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.get('/', function(req, res) {
    fileName = VIEWS_PATH + "index.html"; //links to index.html page
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
app.post('/add-category.html', function(req,res) {
    console.log(req.body.name);
    console.log(req.body.description);
    console.log(req.body.image);
    res.send('Thank You')

})


app.get('/show-event-details.html', function(req, res) {
    fileName = VIEWS_PATH + "show-event-details.html";
    res.sendFile(fileName);
});