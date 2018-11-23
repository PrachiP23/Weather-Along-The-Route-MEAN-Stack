const request = require('request');
var async = require('async');
var Promise = require('promise');

  //'7cc72055cf03c02e9bf988f2a7b7b7e2';
let lat = '18.6609675';
let lon = '73.7303324' ;
let city = 'portland';
//let url = 'http://api.openweathermap.org/data/2.5/weather?lat=$(lat)&lon=$(lon)&appid=${apiKey}'

// var weatherMethod = {
//    getWeather : function(lat, lon, callback){
    
//         var apiKey = 'e89b713e5e3cfeda66f52722407c4352';
//         let weather ={};
//         let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
//         request.get(url, function (err, response, body) {
//             console.log('test1' + url);
//             if(err) console.log("Error in weather api:" + JSON.stringify(err));
//           //  else console.log(response);
//             if (!err && response.statusCode === 200) { 
//                 console.log('test2' + response.statusCode);
//                 var parsed = JSON.parse(body)
//                 console.log(parsed)
//                 return callback(parsed);
//             }
//         /*    else {
//                   weather = JSON.parse(body);
//             } */
//             /*    weatherDetails: {
//                     main: weather.weather[0].main;
//                     temp_min: weather.weather[0].temp_min;
//                     temp_max: weather.weather[0].temp_max;
//                 } 
//                 console.log('body description:', weather.weather[0].main);
//                 console.log('body Min temp:', weather.main.temp_min);
//                 console.log('body Max temp:', weather.main.temp_max);  */
            
//             return weather;
//         });
//     }
// } 
Prmoise:
var weatherMethod = {
    getWeather : function(lat, lon){
        
         var apiKey = 'e89b713e5e3cfeda66f52722407c4352';
         let weather ={};
         let url = 'http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}';
         return new Promise(function(resolve, reject) {

         request.get(url,function (err, response, body) {
             if(err) {
                 console.log("Error in weather api:" + JSON.stringify(err));
                 reject(err);
             }
           //  else console.log(response);
             if (!err && response.statusCode === 200) { 
                resolve(JSON.parse(body));

             }
            });
        });
    }
}  
         /*    else {
                   weather = JSON.parse(body);
             } */
    /*             weatherDetails: {
                     main: weather.weather[0].main;
                     temp_min: weather.weather[0].temp_min;
                     temp_max: weather.weather[0].temp_max;
                 } 
                console.log('body description:', weather.weather[0].main);
                 console.log('body Min temp:', weather.main.temp_min);
                 console.log('body Max temp:', weather.main.temp_max); 
             
             return weather;
         });
     }
 } */


 


exports.data = weatherMethod;
