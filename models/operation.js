const mongoose = require('mongoose');

const operationSchema = new mongoose.Schema({
    operation: String,

    counter: {
        type: Number, 
        default: 0,
    }
});

module.exports = mongoose.model("Operation", operationSchema);