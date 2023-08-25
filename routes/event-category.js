let express = require("express");
let router = express.Router();
const morgan = require("morgan")

pathRoot = "/Users/Jade/Downloads/fit2095-assignments/server.js";

router.use(express.static("node_modules/bootstrap/dist/css"));
router.use(morgan('tiny'));

router.use(express.urlencoded({ extended: true}));
router.use(express.json());

const Category = require("../models/category");

let categoriesDB = [];
// const eventsDB = require("./event").global.eventsDB;
console.log(eventsDB);

router.get("/category/33306036/add", function(req,res) {
    res.render("add-category.html");
});

router.post("/category/33306036/add", function (req,res) {
    let reqBody = req.body;
    console.log(reqBody);

    //adding new category objects
    let aCategory = new Category(reqBody.categoryID, reqBody.name, reqBody.description, reqBody.image, new Date());
    categoriesDB.push(aCategory);
    res.redirect("/category/33306036/list-all");
});

router.get("/category/33306036/list-all" , function (req, res) {
    res.render("list-all-category", {categories: categoriesDB});
});


router.get("/category/33306036/show-event-details", function(req, res){
      const showEventId = req.query.id;
        // if(eventsDB.length == 0){
            console.log(eventsDB);
            let events=global.eventsDB;
            console.log("hello");
            console.log(events);
            
        if(!eventsDB?.length){
            
            res.render("show-event-without-events.html");
        
        }else{
             if(showEventId==undefined){
                res.render("show-event-details", {categories: categoriesDB, index: 0 , events: eventsDB});
            }else{
                for(let index = 0; index < eventsDB.length; index++) {
                     if(eventsDB[index].id == showEventId) {
                    res.render("show-event-details", {categories:categoriesDB, index:index, events:eventsDB});
                    break;
                }
            }
        }
    }
});






//filtering category list by keyword in name and description
router.get("/category/33306036/list-by-keyword", function (req, res) {
    const keyword = req.query.keyword;
    const filteredCategories = categoriesDB.filter(function (category) {
        return category.description.includes(keyword) || category.name.includes(keyword);
    });

    if (keyword) {
        if (filteredCategories.length > 0) {
            console.log("Keyword found");
            res.render("list-all-category", { categories: filteredCategories, keyword: keyword });
        } else {
            console.log("Keyword not found");
            res.render("list-all-category", { categories: categoriesDB, keyword: keyword });
        }
    } else {
        res.render("list-all-category", { categories: categoriesDB, keyword: keyword });
    }
});

// Task 1 point 5 delete category by ID
router.get("/category/33306036/delete-by-ID", function (req, res) {
	res.render("delete-category-by-ID.html"); 
});

router.post("/category/33306036/delete-by-ID", function (req,res) {
   const categoryID = req.body.categoryID;

    for (let i = 0; i < categoriesDB.length; i++) {
		
        console.log("Comparing with category:", categoriesDB[i].id);
        if (categoriesDB[i].id === categoryID) {
			
            console.log("Deleting category:", categoriesDB[i]);
            categoriesDB.splice(i, 1);
			break;
		} 
	}
    console.log("After deleting:", categoriesDB);
    res.redirect("/category/33306036/list-all");
});


module.exports = router
module.exports.categoriesDB = categoriesDB;
module.exports.eventsDB = eventsDB;