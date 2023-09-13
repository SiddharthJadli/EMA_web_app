const express = require("express");
const categoryController = require("../controller/category-controller");

const router = express.Router();

router.post("/add-category", categoryController.addCategory);
router.get("/list-category", categoryController.listCategory);
router.delete("/delete-category", categoryController.deleteCategory);
router.put("/update-category", categoryController.updateCategory);
router.post("/addEventToCategory", categoryController. addEventToCategory);

module.exports = router;
