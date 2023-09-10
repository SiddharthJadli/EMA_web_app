
const mongoose = require("mongoose");
const express = require('express');

const url = "mongodb://127.0.0.1:27017/assignment02";

const app = express();

const eventRouter = require("./routes/event-api");
app.use("/sidd/api/v1" , eventRouter);

//Jade
const categoryRouter = require("./routes/event-category");
app.use("/" , categoryRouter);

const categoryapiRouter = require("./routes/category.api");
app.use("/" , categoryapiRouter);

async function connect(url) {
	await mongoose.connect(url);
	return "Connected Successfully";
}

connect(url)
	.then(console.log)
	.catch((err) => console.log(err));

app.get("*", function(req, res) {
    res.status(404).render("404.html");
});