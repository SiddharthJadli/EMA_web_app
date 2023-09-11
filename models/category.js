const mongoose = require('mongoose');
var randString = require("randomstring");
const validator = require('validator');

/**
* Represents a category.
*
* @param {string} eventId - The ID of the event associated with the category.
* @param {string} name - The name of the category.
* @param {string} description - The description of the category.
* @param {string} image - The image URL of the category.
* @param {Date} createdAt - The creation date of the category.
*/
const categorySchema = new mongoose.Schema({
    catId: {
        type: String,
        required: true,

        unique: true,
        default: () => {
            return "C" + randString.generate({length: 2, charset: "ABCDEFGHIJKLMNOPQRSTUVWNYZ"}) 
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
            message: 'Name only accept alphanumeric values only.',
        }
    },

    description: String,
    image: String,

    eventsList: [
        { type: mongoose.Schema.Types.ObjectId, 
            ref: 'Event' },
        ],

    eventId: String,

    createdAt:{
        type: Date,
        default: Date.now,
    },

    createdAtFormatted: {
        type: String,
        default: function() {
            return new Intl.DateTimeFormat("en-Au", {
                hour: "2-digit",
                minute: "2-digit",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            }).format(this.createdAt || Date.now());
        }, 

    },
});

module.exports = mongoose.model("Category", categorySchema);
