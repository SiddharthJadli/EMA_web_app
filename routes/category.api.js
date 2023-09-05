const express = require('express');
const router = express.Router();
const Category = require("../models/category");
const Event = require("../models/event");

router.post("/api/v1/category/33306036/add", async function (req, res) {
    let {name, description} = req.body;

    try {
        let aCategory = new Category({name, description});
        await aCategory.save();
        res.json({message: 'Category Added', category: newCategory});
    } catch (err) {
        console.log(err);
		res.status(200).json(food);
    }

});

router.get("/api/v1/category/33306036/list", async (req, res) => {
    let categories= await category.find({}).populate("cars");
    res.json(categories);
});


router.delete("/api/v1/category/33306036/delete", async (req, res) => {
    let id = req.body.categoryID;
   try {
    let eventsDeleted = await Event.deleteMany({ categoryID: categoryID });

    let result = await Category.findOneAndRemove({_id: categoryID});

    if (result) {
        res.json({acknowledged: true, deletedCount: result.deletedCount, eventsDeleted: eventsDeleted.deletedCount});
    } else {
        res.json({acknowledged: false, deletedCount: 0, eventsDeleted: eventsDeleted.deletedCount});
    }
   } catch(err) {
    console.log(err);
    //and deletes all the events in eventlist
   }
});




module.exports = router;
