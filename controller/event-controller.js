const Event = require("../models/event");
const Category = require("../models/category");

module.exports = {
	insertEvent: async function (req, res) {
		let anEvent = new Event({ name: req.body.name, description: req.body.description, startTime: req.body.startTime, duration: req.body.duration, capacity: req.body.capacity, categories: req.body.categories});
        
        //Splitting user input
        let categoryIDList = req.body.categories.split(",");
        
        let i=0;
        //Removing any whitespave in the array elements
        categoryIDList.forEach(categoryID => {
            categoryIDList[i] = categoryID.trim();
            i++;
        });

        const category = await Category.find({catId: {$in: categoryIDList}});
        anEvent.categoryList = category;

        await anEvent.save();

		res.json(anEvent.eventId);
	},

    listEvents: async function (req, res) {
		let events = await Event.find({}).populate("categoryList");
        res.json(events);
    },

    updateEvent: async function (req, res) {
		let eventID = req.body.eventID;
        let name = req.body.name;
        let capacity = req.body.capacity;

        let updatedEvent = Event.findOneAndUpdate({eventId: eventID},{name: name, capacity: capacity});
        await updatedEvent.save();

        res.status(200).json({
            "status": "updated successfully"
        })
    },

	deleteEvent: async function (req, res) {
		let eventID = req.body.eventID;
        let anEvent = Event.findOne({eventId: eventID});

        anEvent.categoryList.forEach(catID => {
            let category = Category.findOne({ _id: catID });
            
            for (let i=0; category.eventsList.length; i++){
                if (category.eventsList[i] == anEvent._id){
                    category.eventsList.splice(i,1);
                    break;
                }
            }
        })

	    let deletedEvent = Event.findByIdAndRemove({ _id: anEvent._id });
        await deletedEvent.save();  
        
        res.status(200).json({
            "acknowledged": true,
            "deletedCount": 1 //Is this supposed to be done differently?
        })
    }
}
