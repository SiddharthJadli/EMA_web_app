const randString = require("randomstring")
/**
* Represents a category.
*
* @param {string} eventId - The ID of the event associated with the category.
* @param {string} name - The name of the category.
* @param {string} description - The description of the category.
* @param {string} image - The image URL of the category.
* @param {Date} createdAt - The creation date of the category.
*/

class Category{
    constructor(eventId, name, description, image, createdAt ){
        
        this.id = "C" + randString.generate({length: 2, charset: "ABCDEFGHIJKLMNOPQRSTUVWNYZ"}) 
                    + "-" + randString.generate({length: 4, charset: "0123456789"});
        this.name = name;
        this.description = description;
        this.image = image;
        this.events = [];  
        this.eventId = eventId;
        this.createdAt = createdAt;  
        this.createdAtFormatted = new Intl.DateTimeFormat("en-Au", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
       }).format(this.createdAt);
        
    }

 /**
   * Adding event to the category.
   *
   * @param {Object} event - The event to be added.
   */
    addEvent(event){
        this.events.push(event)
    }
}

/**
 * @exports Category
 */
module.exports = Category;