
//jade
const randString = require("randomstring")

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

    addEvent(event){
        this.events.push(event)
    }
}

module.exports = Category;