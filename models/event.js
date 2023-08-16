class event{
    constructor(name, startTime, duration, isActive=True, image, capacity=1000, availableTickets=null, categoryID){
        
        this.ID = "E" + makestring() + "-" + Math.floor(1000 + Math.random() * 9000).toString;
        
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