const mongoose = require("mongoose");
const express = require('express');
 
const url = "mongodb://127.0.0.1:27017/assignment02";

const app = express();

app.use(express.json())        ;
app.use(express.urlencoded({extended:true}));

const eventRouter = require("./routes/event-api");
app.use("/sidd/api/v1" , eventRouter);

const categoryRouter = require("./routes/category-api");
app.use("/api/v1/category/33306036" , categoryRouter);

async function connect(url) {
	await mongoose.connect(url);
	return "Connected Successfully";
}

const PORT_NUMBER = 8080;

connect(url)
  .then(() => {
    app.listen(PORT_NUMBER, () => {
      console.log("Server is listening on port 8080");
    });
  })
  .catch((err) => console.log(err));

// app.get("*", function(req, res) {
//     res.status(404).render("404.html");
// });