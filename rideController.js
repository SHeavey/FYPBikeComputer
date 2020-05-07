Ride = require('./rideModel');


/*   Module to get all Rides. excluding their data   */
exports.index = function (req, res) {
	
	var rideprojection = { // This is the field that will not be return
		_v: 0,
		data: 0,
		};
		
    Ride.find({}, rideprojection, function (err, rides) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        } else {
            res.json({
                status: "success",
                data: rides
            });
        }
    });
};


// mqtt messge handler function for new insert
exports.newOverMessage = function (d_id, time, name, cond, data) {
    var ride = new Ride();
    ride.d_id = d_id;
    ride.s_time = time;
    ride.name = name;
    ride.cond = cond;
    ride.data = data;

    console.log(data);

    ride.save(function (err) { //MVC..mongodb's write and save function, push data to db
        if (err) {
            console.log("Not saved due to " + err);
        }
    });
};


// mqtt messge handler function for appending to the data of this ride
exports.updateOverMessage = function (d_idn, time_n, data_n) {

    Ride.findOneAndUpdate(
		{d_id : d_idn, s_time: time_n},
		{$push: {data: data_n}},
		function (err, success) { 
        if (err) {
            console.log("Not saved due to " + err);
        }
    });
};


/****   GET the data of a single Ride with an _id ******/
exports.view = function (req, res) {
	
	var rideprojection = { // This first will not be included in the result
		_v: 0,
		};
    Ride.findById(req.params.ride_id, rideprojection, function (err, ride_data) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        } else {
            res.json(ride_data);
			//console.log(ride_data)
        }
    });
};



/****   GET the data of a single Ride with an _id ******/
exports.conditions = function (req, res) {
	
    Ride.aggregate([
		{
		 $group : {
			 _id: "$cond",  //group by conditions
			 count: {$sum: 1}  //Get the count
			 }
		}
		
	], function (err, ride_cond) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
			console.log(err);
        } else {
            res.json(ride_cond);
			//console.log(ride_data)
        }
    });
};



/****   GET the data of all Ride with an  this field : value ******/
exports.view_custome = function (req, res) {
	
	var rideprojection = { // This fieled will not be return
		data: 0
		};
    Ride.find({field : req.params.value}, rideprojection, function (err, ride_data) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        } else {
            res.json({
                data: ride_data
            });
        }
    });
};



// Module to Update Ride condition and Ride Name
exports.update_cond = function (req, res) {  //console.log(req);
    Ride.findOneAndUpdate(
		{_id : req.body.ride_id},
		{$set: {name: req.body.name, cond: req.body.cond}},
		function (err, success) { 
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        } else {
            res.json({
                status: "success"
            });
        }
    });
	
	
};




exports.delete = function (req, res) {
    Ride.findOneAndRemove({
        _id: req.params.ride_id
    }, function (err, ride) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        } else {
            res.json({
                status: "success"
            });
        }
    });
};