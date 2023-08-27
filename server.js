/**
 * @requires express
 */
const express = require('express');

/**
 * @requires morgan
 */
const morgan = require("morgan")

/**
 * @requires ejs
 */
const ejs = require("ejs");
const app = express();

app.use(morgan('tiny'));

/**
 * @requires body-parser
 */
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended : true}));

//Sidd
/**
 * @requires event (router)
 */
const eventRouter = require("./routes/event");
app.use("/" , eventRouter);

//Jade
const categoryRouter = require("./routes/event-category");
app.use("/" , categoryRouter);

//bootstrap css files from node_modules
app.use(express.static("node_modules/bootstrap/dist/css"));

// Parse request bodies as JSON and URL-encoded
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static("Images"));
app.engine("html", ejs.renderFile);
app.set("view engine", "html");

const print = console.log;

/**
 * The port number the server will listen on.
 * @type {number}
 * @constant
 */
const PORT_NUMBER = 8080;

/**
 * Start the server and listen on port 8080.
 * @name listen
 * @function
 * @param {number} port - port number
 * @param {Function} callback - callback function when the server starts.
 */
app.listen(PORT_NUMBER, function () {
	print(`listening on port ${PORT_NUMBER}`);
});  

/**
 * Default route handler for rendering the index view.
 * @name GET-/
 * @function
 * @param {string} path -express path
 * @param {Function} callback - Express callback
 * @param {import("express").Request} -request object
 * @param {import("express").Response} -response object
 */
app.get("/" , function (req, res) {
    res.render("index");
});

/**
 * Handling 404 errors.
 * @name GET-*
 * @function
 * @param {import("express").Request} -response object
 * @param {import("express").Response} -response object
 */
app.get("*", function(req, res) {
    res.render("404.html");
});