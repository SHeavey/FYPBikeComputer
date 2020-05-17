
let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let apiRoutes = require("./api-routes");
let mqttHandler = require("./mqttHandler");

let app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.set('view engine', 'ejs');  // We are using ejs as the rendering engine


mongoose.connect('mongodb://localhost/bikebackend2', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}); //body parsing?


if (!mongoose.connection) {
    console.log("Error while connecting to MongoDB!")
}

var port = process.env.PORT || 80;

app.use(express.static('public'));


app.use('/api', apiRoutes); //links to api-routes


app.get('/', function(req, res){
	
	res.render("index");   // render the views/index.ejs file
	
	});

app.get('/view/:ride_id', function(req, res){
	//so request.params is an object containing properties to the named route
	res.render("ride", {ride_id: req.params.ride_id});  // render the views/ride.ejs file, req.params provided by express
	
	});

app.get('/conditions', function(req, res){
	
	res.render("conditions");  // render the views/conditions.ejs file
	
	});


app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});

if (!mqttHandler.connected()) {
     console.log("Still not connected to MQTT broker...");
}
