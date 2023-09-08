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

// enable Express to parse request bodies as JSON and URL-encoded
router.use(express.urlencoded({ extended: true}));
router.use(express.json());
const mongoose = require('mongoose');
const Category = require("../models/category");





/**
 * Route handler for rendering the "Add Category" page.
 * @name GET-/category/33306036/add
 * @function
 */
router.get("/category/33306036/add", async(req,res) => {
    res.render("add-category");
});


/**
 * Route handler for processing the "Add Category" form.
 * @name POST-/category/33306036/add
 * @function
 */
router.post("/category/33306036/add", async (req,res) => {
    try{
        let reqBody = req.body;
        console.log(reqBody);
    
        
        const aCategory = new Category({
            name: reqBody.name,
            description: reqBody.description,
            image: reqBody.image,
            createdAt: new Date(),
        });

        await aCategory.save();
        console.log('category saved to Mongodb', aCategory);
        const categories = await Category.find({});

        res.render("list-all-category", {categories});
    } catch (error) {
        console.log("err saving category",error);
        res.status(500).json({ message: 'Internal Server Error' });

        
    }
    });
   

/**
 * Router for rendering the "List All Categories" page.
 * @name GET-/category/33306036/list-all
 * @function
 */

router.get("/category/33306036/list-all" , async (req, res)=>  {
    try{
        const categories = await Category.find({});
        res.render("list-all-category", {categories});

    } catch (err) {
        console.log('error getting categories');
    }
});

/**
 * Route handler for displaying event details.
 * @name GET-/category/33306036/show-event-details
 * @function
 * @param {import("express").Request} 
 * @param {import("express").Response} 
 */
router.get("/category/33306036/show-event-details", function(req, res){
   
  const showEventId = req.query.id;
          console.log(eventsDB);
          let events=global.eventsDB;
          console.log(events);
          
      if(!eventsDB?.length){
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
 * @name GET-/category/33306036/list-by-keyword
 * @function
 * @param {import("express").Request} 
 * @param {import("express").Response} 
 * filtering category list by keyword in name and description
 */
router.get("/category/33306036/list-by-keyword", async (req, res) => {
    const keyword = req.query.keyword;
    const categories = await Category.find({
        name: {$regex: keyword, $options: 'i'}

    });

    res.render("list-all-category", {categories,keyword});

});


/**
 * Rendering the "Delete Category by ID" page.
 * @name GET-/category/33306036/delete-by-ID
 * @function
 */
router.get("/category/33306036/delete-by-ID", async (req, res) => {
	res.render("delete-category-by-ID"); 
});


router.post('/category/33306036/delete-by-ID', async (req, res) => {
    const categoryID = req.body.categoryID;

    try {
        console.log("Received categoryID:", categoryID);

    const deletedCategory = await Category.findOneAndDelete({ id: categoryID });
    res.redirect('/category/33306036/list-all');

    if (deletedCategory) {

      console.log('Deleted category:', deletedCategory);
      res.status(200).json({ message: 'category deleted', deletedCategory });
    } else {
      console.log('Category ID not found:', categoryID);
    }

    res.redirect('/category/33306036/list-all');
  } catch (error) {
    console.log('Error deleting category:');
}
});



/**
 * @exports router
//  * @exports categoriesDB
//  * @exports eventsDB
//  */
module.exports = router
// module.exports.categoriesDB = categoriesDB;
module.exports.eventsDB = eventsDB;