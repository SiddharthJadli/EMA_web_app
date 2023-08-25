const express = require('express');
const morgan = require("morgan")
const ejs = require("ejs");
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended : true}));


//Sidd
const eventRouter = require("./routes/event");
app.use("/" , eventRouter);

//Jade
const categoryRouter = require("./routes/event-category");
app.use("/" , categoryRouter);

app.use(express.static("node_modules/bootstrap/dist/css"));
app.use(morgan('tiny'));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static("Images"));
app.engine("html", ejs.renderFile);
app.set("view engine", "html");

const print = console.log;

const PORT_NUMBER = 8080;

app.listen(PORT_NUMBER, function () {
	print(`listening on port ${PORT_NUMBER}`);
});  //server listening

//Default
app.get("/" , function (req, res) {
    res.render("index");
});

//404 errors
app.get("*", function(req, res) {
    res.render("404.html");
});