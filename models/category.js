
//jade
const randString = require("randomstring")

class Category{
    constructor(eventId, name, description, image, createdAt ){
        
        this.eventId = "E" + randString.generate({length: 2, charset: "ABCDEFGHIJKLMNOPQRSTUvWXYZ"}) 
                    + "-" + randString.generate({length: 4, charset: "0123456789"});
        this.name = name;
        this.description = description;
        this.image = image;
        this.createdAt = createdAt;  
        this.events = [];  
    }

    addEfent(event){
        this.events.push(event)
    }
}
