var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyB8hoL_oJU--nicSwKQTmqTnLpJb9UNJIc'
  });
  
/*module.exports = {
    getDirections : function (req, callback)  {
    googleMapsClient.directions({
    origin: req.origin,
    destination: req.destination,
    mode: req.mode,
  
    }, function(err, response) {
        if (err) console.log("Error in gmaps:" + JSON.stringify(err));
        console.log(response);
        console.log('--------------');
        console.log(response.json.routes);
      if (!err) { 
        callback(response.json.geocoded_waypoints);
      };
    });
  }
} */


var methods = {
  
  getDirections: function(req, callback)  {
    googleMapsClient.directions({
      origin: req.origin, 
      destination: req.destination,
      mode: req.mode,
    
    }, function(err, response) {
        if(err) console.log("Error in gmaps:" + JSON.stringify(err));
     //   else console.log(response);
        if (!err) { 
            return callback(response);
          //  return response;
        };
      });
  }

};

exports.data = methods;

  
  /*var inputs = {
    origin:  "Toronto", //"1600 Amphitheatre Parkway, Mountain View, CA",
    destination: "Montreal", //"1 Infinite Loop, Cupertino, CA 95014, USA",
    mode: "driving",
  };
  
  getDirections(inputs, function(result){
  console.log("Response: ", result)
  });   */

  //module.exports = googleMapsClient;
  