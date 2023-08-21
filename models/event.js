const randString = require("randomstring")

class Event{
    constructor(name, description, startTime, duration, isActive="off", image, capacity, availableTickets, categoryID){
        
        this.id = "E" + randString.generate({length: 2, charset: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"}) 
                    + "-" + randString.generate({length: 4, charset: "0123456789"});
        
        this.name = name;
        this.description = description;
        
        //Format Date time
        this.startTime = new Date(startTime);
        this.startTimeFormatted = new Intl.DateTimeFormat("en-Au", {
            hour: "2-digit",
            minute: "2-digit",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
           }).format(this.startTime);
        
        //Find out when this event ends using duration minutes value
        this.endTime = new Date(this.startTime.getTime() + duration * 60000);
        this.endTimeFormatted = new Intl.DateTimeFormat("en-Au", {
            hour: "2-digit",
            minute: "2-digit",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
           }).format(this.endTime);
        

        //Format in hourse and minutes
        this.duration = `${Math.floor(duration /60)}h ${duration % 60}min`;

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


