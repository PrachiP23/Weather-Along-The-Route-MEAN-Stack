const express = require('express');
var upperCase = require('upper-case');
var lowerCase = require('lower-case')
var router = express.Router();


var googleDirections = require('./google_api.js');


var { RouteWaypoint } = require('../models/RouteWaypoint');


router.get('/', (req, res) => {
    RouteWaypoint.find((err, docs) =>{
        if(!err) res.send(docs);
        else { console.log('Error in Retriving Location Waypoints :' + JSON.stringify(err, undefined, 2)); }   
    });
});

router.post('/', (req, res) => {
    var request= {request: {origin: {query: req.body.origin},
                    destination: {query: req.body.destination},
                    travelMode: upperCase(req.body.travelMode) }};
    
    //input to the api
    var inputs = {
        origin:  req.body.origin, //"1600 Amphitheatre Parkway, Mountain View, CA",
        destination: req.body.destination, //"1 Infinite Loop, Cupertino, CA 95014, USA",
        mode: lowerCase(req.body.travelMode)   
        };
    
    RouteWaypoint.find({request:request}, (err, docs ) =>  {
        if (!err) { 
            
            if(docs.length>0){
                console.log('From db');
                res.send(docs[0]);
            }else{
                console.log('API call');
                googleDirections.data.getDirections(inputs, function(result){
                    var waypts = new RouteWaypoint({
                        origin: req.body.origin,
                        destination: req.body.destination,
                        mode: result.query.mode,
                        result:result.json,
                        request: {request: {origin: {query: req.body.origin},
                            destination: {query: req.body.destination},
                            travelMode: upperCase(result.query.mode) }},
                        weatherDetails : [], 
                    }); 
               //     console.log(waypts);
                    
                    waypts.save((err, docs) => {
                        if(!err) res.send(docs);
                        else { console.log('Error in Saving Location Waypoints :' + JSON.stringify(err, undefined, 2)); } 
                    });
         
              });

            }
        }
        else { console.log('Error in Retriving Locations by Request :' + JSON.stringify(err, undefined, 2)); }
    });

    

       
});





module.exports = router;


