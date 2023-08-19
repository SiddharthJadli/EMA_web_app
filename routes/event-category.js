let express = require("express");
let router = express.Router();
let path = require("path");
const { VIEWS_PATH } = require("../server");

pathRoot = "C:\Users\Jade\Downloads\fit2095-assignments\server.js";


router.get('/category/33306036/list-by-keyword', function(req, res) {
    fileName = VIEWS_PATH + "list-all-category.html";
    res.sendFile(fileName);
});

router.get('/category/33306036/delete-by-ID', function(req, res) {
    fileName = VIEWS_PATH + "delete-category-by-ID.html";
    res.sendFile(fileName);
});

router.get('/category/33306036/list-all', function(req, res) {
    fileName = VIEWS_PATH + "list-all-category.html";
    res.sendFile(fileName);
});

router.get('/category/33306036/add', function(req, res) {
    fileName = VIEWS_PATH + "add-category.html";
    res.sendFile(fileName);
});

router.get('/category/33306036/show-event-details', function(req, res) {
    fileName = VIEWS_PATH + "show-event-details.html";
    res.sendFile(fileName);
    
});

module.exports = router;