const Operation = require("../models/operation");
const event = require("../models/event");
const category = require("../models/category");

module.exports = {
    incrementCounter: async function(key) {
        const operation = await Operation.findOne({operation: key});
        operation.counter = operation.counter + 1;
        await operation.save();
    },

    getCounter: async function(req, res) {
        const anOperation = await Operation.findOne();
        res.status(200).json({anOperation});
    },


    //counting for category labels
    countCategories: async function (req, res) {
        const categoryCount = await category.countDocuments();
        res.status(200).json({count: categoryCount});
    
    },
    // counting events label
    countEvents: async function (req, res) {
        const eventCount = await event.countDocuments();
        res.status(200).json({count: eventCount});

    }
};