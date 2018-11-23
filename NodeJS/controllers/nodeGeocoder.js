var NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'google',
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyB8hoL_oJU--nicSwKQTmqTnLpJb9UNJIc', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};
 
var geocoder = NodeGeocoder(options);

module.exports = geocoder;
/*geocoder.geocode('29 champs elysée paris', function(err, res) {
    console.log(res);
  }); */

/*  geocoder.reverse({lat:steps[i].start_location.lat, lon:steps[i].start_location.lng}, function(err, res) {
    console.log(res.city);
}); */

  