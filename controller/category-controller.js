const Event = require("../models/event");
const Category = require("../models/category");
const statsController = require("../controller/stats")

module.exports = {
    addCategory: async (req, res) => {
        console.log("Request body:", req.body);
        let aCategory = new Category({name: req.body.name, description: req.body.description,image: req.body.image, eventsList: req.body.eventsList});
        await aCategory.save();
        res.status(200).json({category: aCategory.catId});
    },

    addEventToCategory: async (req, res) => {
        const{categoryId, eventId} = req.body;
        const category = await Category.findOne({ catId: categoryId });
        const event = await Event.findOne({ eventId: eventId });
        category.eventsList.push(event._id);
        await category.save();
        statsController.incrementCounter('add');
        res.status(200).json({ message: 'Event added successfully' });
    },
 

    listCategory: async (req, res) => {
        let categories = await Category.find({}).populate({path: 'eventsList', model: 'Event'});
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
        statsController.incrementCounter('delete');
        res.status(200).json(deletedCategory);

    },


    updateCategory: async function (req, res) {
        let categoryID = req.body.catId;
        let name = req.body.name;
        let description = req.body.description;
        console.log('Received categoryID:', categoryID);

        let updatedCategory = await Category.findOneAndUpdate({catId: categoryID}, {name: name, description: description});
        statsController.incrementCounter('update');

        if (! updatedCategory) {
            return res.json({"status": "CategoryID not found"});
        } else {
            res.status(200).json({"status": "updated successfully"});
        } 
    }
}
