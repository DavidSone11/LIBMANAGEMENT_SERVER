
var moment = require("moment");

module.exports = {
     timeToObject :function(){
        var travelTime = moment().add(642, 'seconds').format('hh:mm A');// it will add 642 seconds in the current time and will give time in 03:35 PM format
        console.log(travelTime);
        var travelTime1 = moment().add(11, 'mins').format('hh:mm A');// it will add 11 mins in the current time and will give time in 03:35 PM format
        var travelTime2 = moment().add(2, 'hours').format('hh:mm A');// it will add 2 hours in the current time and will give time in 03:35 PM format
     }
};


