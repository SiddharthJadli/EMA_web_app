const express = require("express");
const categoryController = require("../controller/category-controller");
/**
 * Express Router
 * @type {express.Router}
 */
const router = express.Router();
/**
 * Route for add a new category.
 * @name POST /add-category
 * @function
 */
router.post("/add-category", categoryController.addCategory);
/**
 * Route for listing a category.
 * @name POST /list-category
 * @function
 */
router.get("/list-category", categoryController.listCategory);
/**
 * Route for delete a category.
 * @name DELETE /delete-category
 * @function
 */
router.delete("/delete-category", categoryController.deleteCategory);
/**
 * Route for update a category.
 * @name PUT /update-category
 * @function
 */
router.put("/update-category", categoryController.updateCategory);
/**
 * Route for adding an event to a category.
 * @name POST /addEventToCategory
 * @function
 */
router.post("/addEventToCategory", categoryController. addEventToCategory);

module.exports = router;
