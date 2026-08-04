const express = require('express')
const {body,query} = require('express-validator')
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

router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isString().isLength({min:3}).withMessage("Invalid Pickup Address"),
    query('destination').isString().isLength({min:3}).withMessage("Invalid Destination Address"),
    rideController.getFare
)

router.post('/confirm',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid Ride Id'),
    rideController.confirmRide
)

router.get('/start-ride',
    authMiddleware.authCaptain,
    query('rideId').isMongoId().withMessage('invalid ride id'),
    query('otp').isString().isLength({min:6, max:6}).withMessage("invalid otp"),
    rideController.startRide

)
router.post('/end-ride',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage("invalid ride id"),
    rideController.endRide
)
module.exports = router;