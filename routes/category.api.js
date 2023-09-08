const express = require('express');

const Category = require("../models/category");
const Event = require("../models/event");

const router = express.Router();


router.post("/api/v1/category/33306036/add/", async function (req, res) {
    let {name, description} = req.body;

    try {
        let aCategory = new Category({name, description});
        await aCategory.save();
        res.status(200).json({id: aCategory.id});
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Validation failed', details: err.message });

    }

});

router.get("/api/v1/category/33306036/list/", async (req, res) => {
    try {
        let categories = await Category.find({}).populate("events");
        //eventsSchema
        res.status(200).json(categories);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Error' });
    }
});


router.delete("/api/v1/category/33306036/delete/", async (req, res) => {
    const {categoryID} = req.body;

   try {
    console.log('Deleting category with ID:', categoryID);
    const deletedCategory = await Category.findOneAndDelete(categoryID);
    console.log('Deleted category:', deletedCategory);

    if (!deletedCategory) {
      return res.json({ message: 'Category not found' });
    }
    // const eventsDeleted = await Event.deleteMany({ id: categoryID });
    // console.log('Events deleted:', eventsDeleted.deletedCount);
    //^ add when events is defined

    res.status(200).json({
      acknowledged: true,
    //   deletedCount: ,
    });
  } catch (err) {
    console.error('Error deleting category:', err);
   }
});



router.put("/api/v1/category/33306036/update-category/", async (req, res) => {
    // const categoryId = req.params.id
    const {name, description, categoryId} = req.body;

    try{
        // let updatedCategory = await Category.findOneAndUpdate( { id: categoryId },{ name, description });
        let updatedCategory = await Category.findOneAndUpdate( { categoryId, name, description });

        if (updatedCategory) {
            res.json({status: 'Category is updated', category: updatedCategory});
            console.log("Category found",updatedCategory );

        } else {
            console.log("Category not found");
            res.json({status:'ID not found'});
        }
    } catch(err) {
        console.error('Error updating category:', err);
    }
});



module.exports = router;
