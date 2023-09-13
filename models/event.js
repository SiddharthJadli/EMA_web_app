const mongoose = require('mongoose');
var randString = require("randomstring");
const validator = require('validator');

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
    // startTimeFormatted: {
    //     type: String,
    // },

    duration:{
        type: Number,
        required: true
    },
    // durationFormatted: {
    //     type: String,
    // },

    endTime:{
        type: Date, 
        default: function() {
            return new Date(this.startTime.getTime() + this.duration*60000);
        } //some error here
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

    categoryList: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category",
	}]
});
// eventSchema.pre('save', function (next) {
//     if (this.startTime && this.duration) {
//         const hours = Math.floor(this.duration / 60);
//         const minutes = this.duration % 60;

//         this.startTimeFormatted = new Intl.DateTimeFormat("en-Au", {
//             hour: "2-digit",
//             minute: "2-digit",
//             day: "2-digit",
//             month: "2-digit",
//             year: "numeric",
//         }).format(this.startTime);
//         this.endTime = new Date(this.startTime.getTime() + this.duration * 60000);
//         this.durationFormatted = `${hours}h ${minutes}min`;
//     }
// });
module.exports = mongoose.model("Event", eventSchema);