const mongoose = require('mongoose');
var randString = require("randomstring");
const validator = require('validator');

const categorySchema = new mongoose.Schema({
    catId: {
        type: String,
        unique: true,
        default: () => {
            return "C" + randString.generate({length: 2, charset: "ABCDEFGHIJKLMNOPQRSTUVWNYZ"}) 
            + "-" + randString.generate({length: 4, charset: "0123456789"});
        }
    },

    name: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return validator.isAlphanumeric(value);
            },
            message: 'Name only accept alphanumeric values only.'
        }
    },

    description: String,

    image: {
        type: String,
        default: "../Images/Categoryimg.png"
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    createdAtFormatted: {
        type: String,
        default: function () {
            return new Intl.DateTimeFormat("en-Au", {
                hour: "2-digit",
                minute: "2-digit",
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }).format(this.createdAt || Date.now())
        }
    },

    eventId: String,

    eventsList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            default: [],
            ref: 'Event'
        }
    ]
});

module.exports = mongoose.model("Category", categorySchema);
