const Category = require("../models/category");
const Event = require("../models/event");
const Operation = require("./stats")

module.exports = { // cant populate event list after adding

    addCategory: async function (req, res) {
        console.log("Request body:", req.body);
        const aCategory = new Category({name: req.body.name, description: req.body.description, image: req.body.image, eventId: req.body.eventId});
        await aCategory.save();
        // if (req.body.eventId) {
        //     const events = await Event.find({categoryId: aCategory._id});
        //     aCategory.eventList = events;
        //     await aCategory.save();
        // }

        res.status(200).json({category: aCategory.catId});
        Operation.incrementAdd;

    },


    listCategory: async (req, res) => {
        let categories = await Category.find({}).populate("eventsList");
        res.json(categories);
    },


    deleteCategory: async function (req, res) {
        let categoryID = req.body.catId;
        let aCategory = await Category.findOne({catId: categoryID});
        console.log('Received categoryID:', categoryID);
        if (! aCategory) {
            return res.status(404).json({"status": "Category not found"});
        }
        // finding events that have the categoryID
        const events = await Event.find({categoryList: aCategory._id});

        for (const event of events) { // finding event from events array,remove category from event's category list
            const index = event.categoryList.indexOf(aCategory._id);
            if (index !== -1) {
                event.categoryList.splice(index, 1);
                await event.save();
            }
        }
        // deleting event and category
        const deletingEvent = events.map((event) => event._id);
        await Event.deleteMany({
            _id: {
                $in: deletingEvent
            }
        });
        const deletedCategory = await Category.deleteOne({_id: aCategory._id});
        res.status(200).json(deletedCategory);
        Operation.incrementDelete;

    },


    updateCategory: async function (req, res) {
        let categoryID = req.body.catId;
        let name = req.body.name;
        let description = req.body.description;
        console.log('Received categoryID:', categoryID);

        let updatedCategory = await Category.findOneAndUpdate({
            catId: categoryID
        }, {
            name: name,
            description: description
        },);

        if (! updatedCategory) {
            return res.json({"status": "CategoryID not found"});
        } else {
            res.status(200).json({"status": "updated successfully"});
        } Operation.incrementUpdate;

    }
}
