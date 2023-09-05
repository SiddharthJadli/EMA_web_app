const mongoose = require('mongoose');
const validator = require('validator');
var randString = require("randomstring")

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
    id: {
        type: String,
        unique: true,
        required: true,
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
            message: 'Name only accept alphanumeric values only.'
        }
    },
    description: String,
    image: String,

    events: [
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


categorySchema.pre('save', function (next) {
    const createdAtFormatted = new Intl.DateTimeFormat("en-Au", {
                hour: "2-digit",
                minute: "2-digit",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
               }).format(this.createdAt);

               this.createdAtFormatted=createdAtFormatted;
});


 /**
   * Adding event to the categories object.
   *For storing different event into categoies object
   *
   * @param {Object} event - The event to be added.
   */
    // addEvent(event){
    //     this.events.push(event)
    // }


/**
 * @exports Category
 */
module.exports = mongoose.model("Category", categorySchema);
