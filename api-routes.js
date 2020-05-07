
let router = require('express').Router();
var rideController = require('./rideController');

router.get('/', function (req, res) {
    res.json({
        status: 'Interactive Bike Backend is ON!',
    });
});

/*  Fetch all rides meta data  */
router.route('/rides')
    .get(rideController.index)

	
router.route('/ride')
    .post(rideController.update_cond)
    
router.route('/ride/:ride_id')
    .get(rideController.view)   /*  Get all data of this Ride  */
	.delete(rideController.delete) /*  Delete this Ride  */
    
router.route('/conditions')
    .get(rideController.conditions)   /*  Get ride conditions */


module.exports = router;

