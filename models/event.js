const mongoose = require('mongoose');
var randString = require("randomstring");

const eventSchema = new mongoose.Schema({
    eventId: {
        type: String,
        unique: true,
        default: () => {
            return "E" + randString.generate({length: 2, charset: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"}) 
                        + "-" + randString.generate({length: 4, charset: "0123456789"});
        }
    },

    name:  {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return validator.isAlphanumeric(value);
            },
            message: "Name accepts alphanumeric values only"
        }
    },

    description: String,
    
    startTime:{
        type: Date,
        required: true
    },

    duration:{
        type: Number,
        required: true
    },

    endTime:{
        type: Date, 
        default: () => {
            return this.startTime.setMinutes(this.startTime.getMinutes() + this.duration);
        }
    },

    isActive:{
        type: Boolean,
        default: true
    },
    
    image:{
        type: String,
        default: "../Images/event.png" 
    },

    capacity:{
        type: Number,
        default: 1000,
        validate: {
            validator: function(value) {
                return value >= 10 && value <= 2000 ;
            },
            message: "Capacity can only be between 10 and 2000 (inclusive)"
        }
    },

    availableTickets:{
        type: Number, 
        default: this.capacity,
        validate: {
            validator: function(value) {
                return value <= this.capacity;
            },
            message: "Available tickets can't be higher than the capacity!"
        }
    },

    categories: {
        type: String,
        required: true
    },

    categoryList: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category",
	}]
});


module.exports = mongoose.model("Event", eventSchema);