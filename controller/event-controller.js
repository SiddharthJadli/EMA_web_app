const Event = require("../models/event");
const Category = require("../models/category");
const statsController = require("../controller/stats")

module.exports = {
	insertEvent: async function (req, res) {
		let anEvent = new Event({ name: req.body.name, description: req.body.description, startTime: req.body.startTime, duration: req.body.duration, capacity: req.body.capacity, availableTickets: req.body.availableTickets, categories: req.body.categories});   
        
        //Splitting user input
        let categoryIDList = req.body.categories.split(",");
        
        let i=0;
        //Removing any whitespace in the array elements
        categoryIDList.forEach(categoryID => {
            categoryIDList[i] = categoryID.trim();
            i++;
        });

        const category = await Category.find({catId: {$in: categoryIDList}});
        anEvent.categoryList = category;

        await anEvent.save();

        statsController.incrementCounter('add');

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

        if(await Event.findOne({eventId: eventID}) == null){
            res.status(404).json({
                "status": "Event ID not found",
            })
        } else {
            let updatedEvent = await Event.findOneAndUpdate({eventId: eventID},{name: name, capacity: capacity});

            statsController.incrementCounter('update');

            res.status(200).json({
                "status": "updated successfully"
            })
        }
    },

	deleteEvent: async function (req, res) {
		let eventID = req.body.eventID;
        let anEvent = await Event.findOne({eventId: eventID});

        anEvent.categoryList.forEach(async (catID) => {
            let category = await Category.findOne({ _id: catID });
            
            for (let i=0; category.eventsList.length; i++){
                if (category.eventsList[i] == anEvent._id){
                    category.eventsList.splice(i,1);
                    break;
                }
            }
        })

	    let deletedEvent = await Event.deleteOne(anEvent._id);  

        statsController.incrementCounter('delete');
        
        res.status(200).json(deletedEvent)
    }
}
