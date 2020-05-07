var mongoose = require('mongoose');

var rideSchema = mongoose.Schema({//data structure writing into db
    
	d_id: String,
	s_time: Number,
	name: String,
	cond: String,
	data:	[{
			speed: {
				type: String,
				required: true
			},
			rpm: {
				type: String,
				required: true
			},
			time: {
				type: Date,
				default: Date.now
			},
			distance: String,
			average: String,
			maximum: String,
	}]
});

var Ride = module.exports = mongoose.model('ride', rideSchema);
