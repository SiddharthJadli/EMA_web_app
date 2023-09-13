const mongoose = require('mongoose');

const operationSchema = new mongoose.Schema({
    add: {
        type: Number, 
        default: 0
    },

    update: {
        type: Number, 
        default: 0
    },

    delete: {
        type: Number, 
        default: 0
    },
});


module.exports = mongoose.model("Operation", operationSchema);