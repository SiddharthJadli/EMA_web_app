const mongoose = require("mongoose");
const express = require('express');

const Operation = require("./models/operation");

const url = "mongodb://127.0.0.1:27017/assignment02";

const app = express();
const ejs = require("ejs");

app.use(express.static("node_modules/bootstrap/dist/css"));
app.use(express.static("Images"));
app.use('/Images', express.static("Images"));

app.engine("html", ejs.renderFile);
app.set("view engine", "html");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

async function asyncCall() {
    let existingAddOperation = await Operation.findOne({operation: "add"});
    if (! existingAddOperation) {
        let anOperation = new Operation({operation: "add"});
        await anOperation.save();
    }
    let existingUpdateOperation = await Operation.findOne({operation: "update"});
    if (! existingUpdateOperation) {
        let anOperation = new Operation({operation: "update"});
        await anOperation.save();
    }
    let existingDeleteOperation = await Operation.findOne({operation: "delete"});
    if (! existingDeleteOperation) {
        let anOperation = new Operation({operation: "delete"});
        await anOperation.save();
    }
    
}
asyncCall();

  
const eventRouter = require("./routes/event-api");
app.use("/sidd/api/v1", eventRouter);

const categoryRouter = require("./routes/category-api");
app.use("/api/v1/category/33306036", categoryRouter);

const oriCategoryRouter = require("./routes/event-category");
app.use("/" , oriCategoryRouter);

const oriEventRouter = require("./routes/event");
app.use("/" , oriEventRouter);

//for labels inhtml
const count = require("./routes/operation-api");
app.use("/count" , count);

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

app.get("/" , function (req, res) {
    res.render("index");
  });

//for category and event labels
app.get('/counts', async (req, res) => {
    const counts = await statsController.getCurrentCounts(req, res);
    res.render('index', { counts });
  });

app.get("*", function(req, res) {
    res.status(404).render("404.html");
});
