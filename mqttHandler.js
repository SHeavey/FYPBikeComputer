var mqtt = require('mqtt');//sudo npm install = downloaded  necessary libraries
var rideController = require('./rideController');


var  treshold_time  =  20 // The minimum time allowed for a ride to be marked as ended


var broker = 'mqtt://farmer.cloudmqtt.com:11836';
var user = "gevhoohx";
var pass = "C3pzwLvEM5ns";

var devices = {}; //device object

var connectedToBroker = false;

var options = {
    username : user,
    password : pass
};
var mqtt_client = mqtt.connect(broker, options);

exports.connected = function() {
    return connectedToBroker;
};

mqtt_client.on('connect', function() {
    console.log("Connected to MQTT broker.");
    connectedToBroker = true;
    mqtt_client.subscribe('all_data');
});

mqtt_client.on('error', function(err) {//error/offline in mqtt library
    connectedToBroker = false;
    console.log("MQTT Connection error!! " + err);
});

mqtt_client.on('offline', function() {
    connectedToBroker = false;
    console.log("MQTT Client is offline!");
});

mqtt_client.on('message', function(topic, message, packet) {
    if (topic == 'all_data') {
		
		var msg  = JSON.parse(message);
		
		var speed = msg.speed;
		var rpm	= msg.rpm;
		var distance =	msg.distance;
		var average		=	msg.average;
		var maximum		= msg.maximum;
		var time_n		= Math.floor(Date.now()/1000);
		var d_id		= msg.d_id;
		var cond =  ""; // Ride condition
		var name		=  ""	// Ride Name  
		
		//if (speed != "" && rpm != "")
		
		var data = {
                speed : speed,
                rpm : rpm,
                distance : distance,
                average : average,
                maximum : maximum
            };
		
		if(!(d_id in devices)){  // If true, This is a new device that is not in our devices array.  Lets insert it into our devices object  
			
			devices[d_id] = {start_time : time_n, last_time : time_n};  //set the device
			
			rideController.newOverMessage(d_id, time_n, name, cond, data) //Insert a New ride data	
			
			}
		else{
			if((time_n - devices[d_id]['last_time']) > treshold_time){ // This device last sent message is above the treshold. So this most be a new ride
				devices[d_id] = {start_time : time_n, last_time : time_n}; //reset the device
				rideController.newOverMessage(d_id, time_n, name, cond, data) //Insert a New ride data
				}
			
			else{ // This ride is currently ongoing
				
				devices[d_id]['last_time'] =  time_n;  //set the last_time to current time
				
				rideController.updateOverMessage(d_id, devices[d_id]['start_time'], data) //Append to the ride data of this Ride
				
				
				}
			
			
			}
		
    } 
	
	else{
        console.log('Not a proper msg');
    
	}


    
});
//{speed : 10,rpm : 60,distance : 0.01,average : 10,median : 10}
//in aws instance, file : /etc/mongodb.conf
// mongodb client tools
