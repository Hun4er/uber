const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model')

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;
    try {
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType });
        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
        const captainInRadius = await mapService.getCaptainsInRadius(pickupCoordinates.lat, pickupCoordinates.lng, 10000);
        const ridePayload = { ...ride.toObject(), otp: '' };

        ride.otp = ""
        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user')
        captainInRadius.map(captain => {
            sendMessageToSocketId(captain.socketId, 'new-ride', rideWithUser)
        })


        return res.status(201).json({ ride: ridePayload, message: 'Ride created successfully' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports.confirmRide = async(req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const { rideId } = req.body
    if (!rideId) {
        return res.status(400).json({ message: 'Ride ID is required' })
    }

    try{
        const ride = await rideService.confirmRide({rideId,captain:req.captain})
        const userSocketId = ride?.user?.socketId
        console.log('[Controller] confirmRide:', {
            rideId: ride?._id,
            userId: ride?.user?._id,
            captainId: ride?.captain?._id,
            userSocketId: userSocketId || 'NULL - user has no socketId!'
        })
        if (userSocketId) {
            const delivered = sendMessageToSocketId(userSocketId, 'ride-accepted', ride)
            console.log('[Controller] ride-accepted emitted:', { delivered })
        } else {
            console.error('[Controller] CANNOT NOTIFY USER - socketId is null! User must rejoin.')
        }
        return res.status(200).json(ride)
    }catch(err){
        console.error('[Controller] confirmRide error:', err.message)
        return res.status(500).json({message:err.message})
    }
}

module.exports.startRide = async(req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const { rideId, otp } = req.query
    if (!rideId || !otp) {
        return res.status(400).json({ message: 'Ride ID and OTP are required' })
    }

    try{
        const ride = await rideService.startRide({rideId, otp, captain:req.captain})
        console.log('ride start emitted', { rideId: ride?._id, userId: ride?.user?._id })
        if (ride?.user?.socketId) {
            sendMessageToSocketId(ride.user.socketId, 'ride-started', ride)
        }

        return res.status(200).json(ride)
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}

module.exports.endRide = async (req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const { rideId } = req.body
    if (!rideId) {
        return res.status(400).json({ message: 'Ride ID is required' })
    }

    try{
        const ride = await rideService.endRide({rideId, captain:req.captain})

        console.log('ride end emitted', { rideId: ride?._id, userId: ride?.user?._id, captainId: ride?.captain?._id })
        if (ride?.user?.socketId) {
            sendMessageToSocketId(ride.user.socketId, 'ride-ended', ride)
        }

        return res.status(200).json(ride)
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}
