const randString = require("randomstring")

class Event{
    constructor(name, description, startTime, duration, isActive="off", image, capacity, availableTickets, categoryID){
        
        this.id = "E" + randString.generate({length: 2, charset: "ABCDEFGHIJKLMNOPQRSTUvWXYZ"}) 
                    + "-" + randString.generate({length: 4, charset: "0123456789"});
        
        this.name = name;
        this.description = description;
        
        //Format Date time
        this.startTime = startTime;

        //Find out when this event ends using duration minutes value
        this.endTime = "";
        
        //Format in hourse and minutes
        this.duration = duration;

        this.isActive = isActive;
        
        this.image = image;
        
        if (capacity == ""){
            this.capacity = 1000;
        } else {
            this.capacity = capacity;;
        }
        
        if (availableTickets == ""){
            this.availableTickets = this.capacity;
        } else {
            this.availableTickets = availableTickets;
        }
        
        this.categoryID = categoryID;
    }
}

module.exports = Event;