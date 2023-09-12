const Operation = require("../models/operation");

module.exports = {
    incrementAdd: async function(req,res) {
    const operation = await Operation.findOne();
    operation.add++;
    await operation.save();
    // res.status(200).json({
    //     addCount: operation.add
    //     });
    },

    // getAdd: async function getAdd ()=>{
    //     const operation = await Operation.findOne();
    //     res.status(200).json({
    //         addCount: operation.add
    //         });
    //     },
    // }
    
    incrementUpdate: async function(req,res) {
    const operation = await Operation.findOne();
    operation.update++
    await operation.save();
    // res.status(200).json({
    //     addCount: operation.update
    //     })
    },
    
    incrementDelete: async function(req,res) {
    const operation = Operation.findOne();
    operation.delete++
    await operation.save();
    // res.status(200).json({
    //     addCount: operation.delete
    //     })
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