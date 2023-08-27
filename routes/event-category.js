/**
 * @requires express
 */

let express = require("express");
let router = express.Router();
/**
 * @requires morgan
 */
const morgan = require("morgan")

pathRoot = "/Users/Jade/Downloads/fit2095-assignments/server.js";

//bootstrap css files from node_modules
router.use(express.static("node_modules/bootstrap/dist/css"));
router.use(morgan('tiny'));

// Parse request bodies as JSON and URL-encoded
router.use(express.urlencoded({ extended: true}));
router.use(express.json());

const Category = require("../models/category");

/**
 * An array of categories.
 * @type {Category[]}
 */
let categoriesDB = [];
console.log(eventsDB);


/**
 * Route handler for rendering the "Add Category" page.
 * @name GET-/category/33306036/add
 * @function
 */
router.get("/category/33306036/add", function(req,res) {
    res.render("add-category.html");
});


/**
 * Route handler for processing the "Add Category" form.
 * @name POST-/category/33306036/add
 * @function
 */
router.post("/category/33306036/add", function (req,res) {
    let reqBody = req.body;
    console.log(reqBody);

     /**
     * Create a new category to add categories
     * @type {Category}
     */
    let aCategory = new Category(reqBody.categoryID, reqBody.name, reqBody.description, reqBody.image, new Date());
    categoriesDB.push(aCategory);
    res.redirect("/category/33306036/list-all");
});

/**
 * Router for rendering the "List All Categories" page.
 * @name GET-/category/33306036/list-all
 * @function
 */

router.get("/category/33306036/list-all" , function (req, res) {
    res.render("list-all-category", {categories: categoriesDB});
});

/**
 * Route handler for displaying event details.
 * @name GET-/category/33306036/show-event-details
 * @function
 * @param {import("express").Request} 
 * @param {import("express").Response} 
 */
router.get("/category/33306036/show-event-details", function(req, res){
      /**
       * getting id of the event for url
       */
    const showEventId = req.query.id;
            console.log(eventsDB);
            
        /**
         * accessing eventsDB array globally
         * @type{Object[]}
         */
            let events=global.eventsDB;
            console.log(events);
            
        if(!eventsDB?.length){
            //when eventsDB is empty
            res.render("show-event-without-events.html");
        
        }else{
             if(showEventId==undefined){
                res.render("show-event-details", {events:eventsDB, index: 0 , categories: categoriesDB});
            }else{
                for(let index = 0; index < eventsDB.length; index++) {
                     if(eventsDB[index].id == showEventId) {
                    res.render("show-event-details", {events:eventsDB, index:index, categories:categoriesDB});
                    break;
                }
            }
        }
    }
});



/**
 * Route handler for listing categories filtered by a keyword.
 * @name GET-/category/33306036/list-by-keyword?id=
 * @function
 * @param {import("express").Request} 
 * @param {import("express").Response} 
 * filtering category list by keyword in name and description
 */
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


/**
 * Rendering the "Delete Category by ID" page.
 * @name GET-/category/33306036/delete-by-ID
 * @function
 */
router.get("/category/33306036/delete-by-ID", function (req, res) {
	res.render("delete-category-by-ID.html"); 
});


/**
 * Processing the "Delete Category by ID" form.
 * @name POST-/category/33306036/delete-by-ID
 * @function
 */
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

/**
 * @exports router
 * @exports categoriesDB
 * @exports eventsDB
 */
module.exports = router
module.exports.categoriesDB = categoriesDB;
module.exports.eventsDB = eventsDB;