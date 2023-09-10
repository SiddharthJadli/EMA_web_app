const Event = require("../models/event");
const Category = require("../models/category");

module.exports = {
	insertEvent: async function (req, res) {
		let anEvent = new Event({ name: req.body.name, description: req.body.description, startTime: req.body.startTime, duration: req.body.duration, capacity: req.body.capacity, categories: req.body.categories});
        
        let categoryIDList = anEvent.categories.split(",");
        categoryIDList.forEach(categoryID => {
            let category = Category.findOne({categoryId: categoryID});
            anEvent.categoryList.push(category._id);
        });
        
		await anEvent.save();
		res.json(anEvent.eventId);
	},

    listEvents: async function (req, res) {
		let events = await Event.find({}).populate("category");
        res.json(events);
    },

    updateEvent: async function (req, res) {
		let eventID = req.body.eventId;
        let name = req.body.name;
        let capacity = req.body.capacity;

        let anEvent = Event.findOne({eventId: eventID});
        anEvent.name = name;
        anEvent.capacity = capacity;
        anEvent.save()

        await anEvent.save();

		res.status(200).json({
            "status": "updated successfully"
        })
    },

	deleteEvent: async function (req, res) {
		let eventID = req.body.eventId;

	    let anEvent = Event.findByIdAndRemove({eventId: eventID})

        // This is the part where you delete the event from the category
        // anEvent.categoryList.forEach(categoryID => {
        //     let aCategory = Category.findOne({ _id: categoryID});
             
        //     for (let i=0; aCategory.events.length; i++){
        //         if (aCategory.events[i] == ){
        //             farm.animals.splice(i,1);
        //             break;
        //         }
        //     }
        // });

        await anEvent.save();

        res.status(200).json({
            "acknowledged": true,
            "deletedCount": 1
        })
	},
};
