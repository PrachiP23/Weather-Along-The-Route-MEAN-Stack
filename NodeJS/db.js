const mongoose = require('mongoose');

var url = 'mongodb://localhost:27017/waypointdb';
mongoose.connect(url, (err) => {
    if(err) throw err;
    else{
        console.log("Database connection successful..!");
    }
});

module.exports = mongoose;