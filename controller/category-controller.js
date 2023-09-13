const Event = require("../models/event");
const Category = require("../models/category");
const statsController = require("../controller/stats")
const event = require("../models/event");

module.exports = {
    addCategory: async function (req, res) {
        let aCategory = new Category({name: req.body.name, description: req.body.description, image: req.body.image, events: req.body.events});
        console.log("Request body:", req.body);
        if(req.body.eventIDList) {
        let eventIDList = req.body.events.split(",");
        let i = 0;
        eventIDList.forEach(eventId => {
            eventIDList[i] = eventId.trim();
            i++;
        });

        const event = await Event.find({eventId: {$in: eventIDList}});
        aCategory.eventsList = event;
    }
        await aCategory.save();
        statsController.incrementCounter('add');
        res.status(200).json({category: aCategory.catId});
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
