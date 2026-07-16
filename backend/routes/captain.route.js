const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register',[
    body('email').isEmail().withMessage("Invalid Email Address"),
    body('fullname.firstname').isLength({min:3}).withMessage("First Name must be atleast 3 characters"),
    body('password').isLength({min:6}).withMessage("Password must be atleast 6 characters"),
    body('vehicle.color').isLength({min:3}).withMessage("Vehicle color must be atleast 3 characters"),
    body('vehicle.plate').isLength({min:3}).withMessage("Vehicle plate must be atleast 3 characters"),
    body('vehicle.capacity').isInt({min:1}).withMessage("Vehicle capacity must be atleast 1 "),
    body('vehicle.vehicleType').isIn(['car','motorcycle', 'auto']).withMessage("Invalid vehicle type.")

],
captainController.registerCaptain

)

router.post('/login',[
    body('email').isEmail().withMessage("Invalid Email Address"),
    body('password').isLength({min:6}).withMessage("Password must be atleast 6 characters"),

],
captainController.loginCaptain
)
router.get('/profile',authMiddleware.authCaptain,captainController.getCaptainProfile)
router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain)
module.exports = router;