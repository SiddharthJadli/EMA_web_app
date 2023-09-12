const Category = require("../models/category");
const Event = require("../models/event");
const Operation = require("./stats")

module.exports = {
    addCategory: async function (req, res) {
        try {
            console.log("Request body:", req.body);
            let aCategory = new Category({name: req.body.name, description: req.body.description, image: req.body.image, eventId: req.body.eventID});
            await aCategory.save();
            res.status(200).json({id: aCategory.catId});

            Operation.incrementAdd;
        } catch (err) {
            console.error(err);
            res.status(400).json({error: 'Validation failed', details: err.message});
        }
    },

    listCategory: async (req, res) => {
        try {
            let categories = await Category.find({}).populate("eventsList");
            res.status(200).json(categories);
        } catch (err) {
            console.error(err);
            res.json({message: 'Error'});
        }
    },

    deleteCategory: async function (req, res) {
        let categoryID = req.body.catId;
        let aCategory = await Category.findOne({catId: categoryID});
        console.log('Received categoryID:', categoryID);

        if (! aCategory) {
            return res.status(404).json({"status": "Category not found"});
        } else {
            const response = {
                "acknowledged": true
            }
        } aCategory.eventsList.forEach(async (eventId) => {
            let event = await Event.findOne({_id: eventId});

            for (let i = 0; category.eventsList.length; i++) {
                if (category.eventsList[i] == anEvent._id) {
                    category.eventsList.splice(i, 1);
                    break;
                }
            }
        })

        let deletedCategory = await Category.deleteOne(aCategory._id);
        res.status(200).json(deletedCategory)

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
        }

        Operation.incrementUpdate;
    }
}
