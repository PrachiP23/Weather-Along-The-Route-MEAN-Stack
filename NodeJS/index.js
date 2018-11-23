const express = require('express');
const bodyParser = require('body-parser');
const cors =  require('cors');

const { mongoose } = require('./db.js');
var waypointController  = require('./controllers/waypointController');
var googleMapsClient = require('./controllers/google_api.js');
var weatherApiController = require('./controllers/weatherController.js');

var app = express();
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}));

app.listen(3000, () => console.log('Server started at port : 3000'));

app.use('/RouteWaypoint', waypointController);
app.use('/WeatherDetails', weatherApiController);