/**
 * @requires mongoose
 * @requires express
 * @requires operation
 */
const mongoose = require("mongoose");
const express = require('express');

const Operation = require("./models/operation");

const url = "mongodb://127.0.0.1:27017/assignment02";

const app = express();
const ejs = require("ejs");
/**
 * Serve static Bootstrap CSS files.
 */
app.use(express.static("node_modules/bootstrap/dist/css"));
/**
 * Serve static image files.
 */
app.use(express.static("Images"));
app.use('/Images', express.static("Images"));
/**
 * Configure EJS as the view engine.
 */
app.engine("html", ejs.renderFile);
app.set("view engine", "html");
/**
 * Enable JSON and URL-encoded request body parsing.
 */
app.use(express.json());
app.use(express.urlencoded({extended: true}));
/**
 * Asynchronous function to initialize operation counters.
 */
async function asyncCall() {
    let existingAddOperation = await Operation.findOne({operation: "add"});
    if (! existingAddOperation) {
        let anOperation = new Operation({operation: "add"});
        await anOperation.save();
    }else{
        await Operation.findOneAndUpdate({ operation: "add"}, {counter: 0});
    }
    let existingUpdateOperation = await Operation.findOne({operation: "update"});
    if (! existingUpdateOperation) {
        let anOperation = new Operation({operation: "update"});
        await anOperation.save();
    }else{
        await Operation.findOneAndUpdate({ operation: "update"}, {counter: 0});
    }
    let existingDeleteOperation = await Operation.findOne({operation: "delete"});
    if (! existingDeleteOperation) {
        let anOperation = new Operation({operation: "delete"});
        await anOperation.save();
    }else{
        await Operation.findOneAndUpdate({ operation: "delete"}, {counter: 0});
    }
}
asyncCall();

/**
 * Require and use the event, category, original router.
 */
const eventRouter = require("./routes/event-api");
app.use("/sidd/api/v1", eventRouter);

const categoryRouter = require("./routes/category-api");
app.use("/api/v1/category/33306036", categoryRouter);

const originalCategoryRouter = require("./routes/event-category");
app.use("/" , originalCategoryRouter);

const originalEventRouter = require("./routes/event");
app.use("/" , originalEventRouter);

//for labels in html
const counters = require("./routes/operation-api");
app.use("/count" , counters);
/**
 * Asynchronous function to connect to the MongoDB database.
 * @param {string} url - The MongoDB connection URL.
 * @returns {string} - A message indicating the connection status.
 */
async function connect(url) {
    await mongoose.connect(url);
    return "Connected Successfully";
}

const PORT_NUMBER = 8080;

connect(url).then(() => {
    app.listen(PORT_NUMBER, () => {
        console.log("Server is listening on port 8080");
    });
}).catch((err) => console.log(err));

app.get("/category/33306036/first-event-detail", function(req, res) {
    res.render("first-event-detail.html");
});

const Category = require("./models/category");

app.get("/" , async function (req, res) {
    const firstCategory =await Category.findOne();
    if (firstCategory == null){
        res.render("index", {catID: ""});
    }else{
        console.log(firstCategory);
        res.render("index", {catID: firstCategory.catId});
    }
});



/**
 * Handle all other routes with a 404 status and render the "404.html" page.
 */
app.get("*", function(req, res) {
    res.status(404).render("404.html");
});