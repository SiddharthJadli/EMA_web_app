const randString = require("randomstring")

class Event{
    constructor(name, startTime, duration, isActive=True, image, capacity=1000, availableTickets=null, categoryID){
        
        this.ID = "E" + randString.generate({length: 2, charset: "ABCDEFGHIJKLMNOPQRSTUvWXYZ"}) 
                    + "-" + randString.generate({length: 4, charset: "0123456789"});
        
        this.name = name;
        this.startTime = startTime;
        this.duration = duration;
        this.isActive = isActive;
        this.image = image;
        this.capacity = capacity;
        
        if (availableTickets == null){
            this.availableTickets = capacity;
        } else {
            this.availableTickets = availableTickets
        }
        
        this.categoryID = categoryID;
    }
}

module.exports = Event;