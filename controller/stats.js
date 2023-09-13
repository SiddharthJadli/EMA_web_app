const Operation = require("../models/operation");
const event = require("../models/event");
const category = require("../models/category");

async function getCounter(key) {
    const operation = await Operation.findOne({ operation: key });
    return operation.counter;
}

module.exports = {
    incrementCounter: async function(key) {
        const operation = await Operation.findOne({operation: key});
        operation.counter = operation.counter + 1;
        await operation.save();
    },

    getCounter: async function(key) {
        const operation = await Operation.findOne({operation: key});
        operation.counter;
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
    },

    addCount: async function (req, res) {
        const addCount = await getCounter('add');
        res.status(200).json({count: addCount});
    },

    updateCount: async function (req, res) {
        const updateCount = await getCounter('update');
        res.status(200).json({count: updateCount});
    },

    deleteCount: async function (req, res) {
        const deleteCount = await getCounter('delete');
        res.status(200).json({count: deleteCount});
    }
};

