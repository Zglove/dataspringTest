
class Client {
    constructor() {}
    getGreeting() {
        var date = new Date();
        var hour = date.getHours();
        var greeting = '';
        if (hour > 6 && hour <= 12) {
            greeting = "Good morning"
        }else if(hour > 12 && hour <= 18) {
            greeting = "Good afternoon"
        }else {
            greeting = "Good evening"
        }
        // console.log(greeting);
        return greeting;
    }
}

module.exports = {
    Client
}