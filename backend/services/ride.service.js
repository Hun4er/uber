const rideModel = require('../models/ride.model');
const mapService = require('../services/maps.service');
const crypto = require('crypto');
const { sendMessageToSocketId } = require('../socket');

async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    const baseFare = {
        auto: 30,
        car: 50,
        motorcycle: 20
    };
    const perKmRate = {
        auto: 10,
        car: 15,
        motorcycle: 8
    };
    const perMinuteRate = {
        auto: 2,
        car: 3,
        motorcycle: 1.5
    };

    return {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        motorcycle: Math.round(baseFare.motorcycle + ((distanceTime.distance.value / 1000) * perKmRate.motorcycle) + ((distanceTime.duration.value / 60) * perMinuteRate.motorcycle))
    };
}
module.exports.getFare = getFare;

function getOtp(num) {
    return crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
}

async function updateRideStatus(rideId, status, update = {}) {
    if (!rideId) {
        throw new Error('Ride ID is required');
    }

    const ride = await rideModel.findByIdAndUpdate(rideId, { status, ...update }, { new: true });
    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;
}

module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const fare = await getFare(pickup, destination);
    return rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType]
    });
};
module.exports.confirmRide = async ({
    rideId,captain
}) => {
    if (!rideId || !captain?._id) {
        throw new Error('Ride ID and captain are required')
    }

    const ride = await rideModel
        .findOneAndUpdate(
            { _id: rideId },
            { status: 'accepted', captain: captain._id },
            { new: true }
        )
        .populate('user')
        .populate({ path: 'captain', select: 'fullname vehicle' })
        .select('+otp')

    if (!ride) {
        throw new Error('Ride not found')
    }
    return ride
}

module.exports.startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp || !captain?._id) {
        throw new Error('Ride ID, OTP, and captain are required')
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp')

    if (!ride) {
        throw new Error('Ride not found')
    }
    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted')
    }

    if (ride.otp !== otp) {
        throw new Error('invalid otp')
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

    const updatedRide = await rideModel.findOne({ _id: rideId }).populate('user').populate('captain').select('+otp')
    sendMessageToSocketId(updatedRide.user.socketId, 'ride-started', updatedRide)
    return updatedRide
}
module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId || !captain?._id) {
        throw new Error('Ride ID and captain are required')
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp')

    if (!ride) {
        throw new Error('Ride not found')
    }
    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing')
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    const updatedRide = await rideModel.findOne({ _id: rideId }).populate('user').populate('captain').select('+otp')
    sendMessageToSocketId(updatedRide.user.socketId, 'ride-ended', updatedRide)
    return updatedRide
}



module.exports.acceptRide = async ({ rideId, captainId }) => updateRideStatus(rideId, 'accepted', { captain: captainId });

module.exports.cancelRide = async (rideId) => updateRideStatus(rideId, 'cancelled');
