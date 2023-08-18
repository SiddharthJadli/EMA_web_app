
//jade
const randString = require("randomstring")

class event{
    constructor(eventId, name, description, startDateTime, endDateTime, duration, isActive, capacity, availableTickets, categoryID){
        
        this.eventId = "E" + randString.generate({length: 2, charset: "ABCDEFGHIJKLMNOPQRSTUvWXYZ"}) 
                    + "-" + randString.generate({length: 4, charset: "0123456789"});
        this.name = name;
        this.description = description;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.duration = duration;
        this.isActive = isActive;
        this.capacity = capacity;
        this.availableTickets = availableTickets;
        this.categoryID = categoryID;
    }
}
