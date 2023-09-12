const Operation = require("../models/operation");

module.exports = {

    incrementAdd: async function(req,res) {
    const operation = await Operation.findOne();
    operation.add++;
    await operation.save();
    res.status(200).json({
        addCount: operation.add
    });
    
    },
    
    incrementUpdate: async function(req,res) {
    const operation = await Operation.findOne();
    operation.update++
    await operation.save();
    res.status(200).json({
        addCount: operation.update
    })
    },
    
    incrementDelete: async function(req,res) {
    const operation = Operation.findOne();
    operation.delete++
    await operation.save();
    res.status(200).json({
        addCount: operation.delete
    })
    }
}




