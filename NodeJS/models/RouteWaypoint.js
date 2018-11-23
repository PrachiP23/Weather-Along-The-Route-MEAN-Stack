const mongoose = require('mongoose');

var RouteWaypoint = mongoose.model('RouteWaypoint',{
    origin: {type:String},
    destination: {type:String},
    mode : {type:String},
    result: {type:JSON},
    request: {type:JSON},
    weatherDetails: {type:JSON}
    
});

module.exports = {RouteWaypoint};