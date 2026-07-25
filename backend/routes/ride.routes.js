const express = require('express')
const {body} = require('express-validator')
const router = express.Router()
const rideController = require('../controllers/ride.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/create', 
    authMiddleware.authUser,
    body('pickup').isString().isLength({min:3}).withMessage("Invalid Pickup Address"),
    body('destination').isString().isLength({min:3}).withMessage("Invalid Destination Address"),
    body('vehicleType').isString().isIn(['auto','car','motorcycle']).withMessage("Invalid Vechicle Type"),
    rideController.createRide

)



module.exports = router;