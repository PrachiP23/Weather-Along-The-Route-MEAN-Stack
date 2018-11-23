const express = require('express');
var weatherRouter = express.Router();
const request = require('request');
var async = require('async');
var Promise = require('promise');
var { RouteWaypoint } = require('../models/RouteWaypoint');

weatherRouter.post('/', (req, res) => {
    var lat =req.body.lat;
    var lon =req.body.lng;
    var inputs = {
        lat: req.body.lat, 
        lon: req.body.lon, 
      };
    console.log('Inside Weather');
    var apiKey = 'e89b713e5e3cfeda66f52722407c4352';
  //  console.log(req); 
    var Rrequest ={request :req.body[0]};
  //  var lat =req.body[1].lat;
  //  var lon =req.body[1].lng;
   /* RouteWaypoint.find({request:Rrequest}, (err, docs) =>{
        weatherDetails = docs[0].weatherDetails;

        var tagMap = {};
        for (var i = 0; weatherDetails.length > i; i += 1) {
            tagMap[weatherDetails[i].coord] = weatherDetails[i].coord;
        }
        var hasTag = function(tagName) {
            return tagMap[tagName];
        }; 
        
    }); */
    

    let url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&units=imperial&appid='+apiKey;

  //  console.log(url);
    request.get(url,function (err, response, body) {
        if(err) {
            console.log("Error in weather api:" + JSON.stringify(err));
            reject(err);
        }
        if (!err && response.statusCode === 200) { 
           res.send(JSON.parse(body));
           
        }
       });

    

        
    }, function(err) {
        console.log(err);
    });



module.exports = weatherRouter;