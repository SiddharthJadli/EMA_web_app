const randString = require("randomstring")

class event{
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

module.exports = event;

function makestring() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 2) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}