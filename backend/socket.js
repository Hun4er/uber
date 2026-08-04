const { Server } = require('socket.io');
const mongoose = require('mongoose');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');
const rideModel = require('./models/ride.model');

let io = null;

function initializeSocket(server) {
  if (io) return io;

  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    socket.data = { userId: null, userType: null };
    console.log(`[Socket] Connected: ${socket.id}`);

    socket.on('join', async (data) => {
      try {
        if (!data || typeof data !== 'object') {
          return socket.emit('error', { message: 'Invalid join payload' });
        }

        const { userId, userType } = data;
        if (!mongoose.isValidObjectId(userId) || !['user', 'captain'].includes(userType)) {
          return socket.emit('error', { message: 'Invalid user payload' });
        }

        if (userType === 'user') {
          const user = await userModel.findById(userId);
          if (!user) {
            return socket.emit('error', { message: 'User not found' });
          }
          socket.data.userId = userId;
          socket.data.userType = userType;
          await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
          console.log(`[Socket] User joined: userId=${userId} socketId=${socket.id}`);
        } else {
          const captain = await captainModel.findById(userId);
          if (!captain) {
            return socket.emit('error', { message: 'Captain not found' });
          }
          socket.data.userId = userId;
          socket.data.userType = userType;
          await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
          console.log(`[Socket] Captain joined: captainId=${userId} socketId=${socket.id}`);
        }
      } catch (error) {
        console.error('[Socket] join error', error);
        socket.emit('error', { message: 'Unable to join socket channel' });
      }
    });

    socket.on('update-location-captain', async (data) => {
      try {
        if (!data || typeof data !== 'object') {
          return socket.emit('error', { message: 'Invalid location payload' });
        }

        const { userId, location } = data;
        const lat = Number(location?.lat);
        const lng = Number(location?.lng);

        if (!mongoose.isValidObjectId(userId) || !Number.isFinite(lat) || !Number.isFinite(lng)) {
          return socket.emit('error', { message: 'Invalid location coordinates' });
        }

        const updatedCaptain = await captainModel.findByIdAndUpdate(userId, {
          location: { lat, lng },
          socketId: socket.id
        }, { new: true });

        const activeRide = await rideModel.findOne({
          captain: userId,
          status: { $in: ['accepted', 'ongoing'] }
        }).populate('user').populate('captain');

        if (activeRide?.user?.socketId) {
          sendMessageToSocketId(activeRide.user.socketId, 'captain-location-updated', {
            rideId: activeRide._id,
            captainId: userId,
            location: updatedCaptain?.location
          });
        }
      } catch (error) {
        console.error('[Socket] update-location-captain error', error);
        socket.emit('error', { message: 'Unable to update captain location' });
      }
    });

    socket.on('ride-started', async (data) => {
      try {
        const { rideId, userId } = data || {};
        if (!mongoose.isValidObjectId(rideId) || !mongoose.isValidObjectId(userId)) {
          return socket.emit('error', { message: 'Invalid ride start payload' });
        }

        const updatedRide = await rideModel.findByIdAndUpdate(rideId, { status: 'ongoing' }, { new: true })
          .populate('user').populate('captain');
        if (!updatedRide) {
          return socket.emit('error', { message: 'Ride not found' });
        }

        console.log(`[Socket] ride-started: rideId=${updatedRide._id}`);
        if (updatedRide.user?.socketId) {
          sendMessageToSocketId(updatedRide.user.socketId, 'ride-started', updatedRide);
        }
      } catch (error) {
        console.error('[Socket] ride-started error', error);
        socket.emit('error', { message: 'Unable to start ride' });
      }
    });

    socket.on('ride-ended', async (data) => {
      try {
        const { rideId, userId } = data || {};
        if (!mongoose.isValidObjectId(rideId) || !mongoose.isValidObjectId(userId)) {
          return socket.emit('error', { message: 'Invalid ride end payload' });
        }

        const updatedRide = await rideModel.findByIdAndUpdate(rideId, { status: 'completed' }, { new: true })
          .populate('user').populate('captain');
        if (!updatedRide) {
          return socket.emit('error', { message: 'Ride not found' });
        }

        console.log(`[Socket] ride-ended: rideId=${updatedRide._id}`);
        if (updatedRide.user?.socketId) {
          sendMessageToSocketId(updatedRide.user.socketId, 'ride-ended', updatedRide);
        }
      } catch (error) {
        console.error('[Socket] ride-ended error', error);
        socket.emit('error', { message: 'Unable to end ride' });
      }
    });

    socket.on('ride-cancelled', async (data) => {
      try {
        const { rideId, userId } = data || {};
        if (!mongoose.isValidObjectId(rideId) || !mongoose.isValidObjectId(userId)) {
          return socket.emit('error', { message: 'Invalid ride cancellation payload' });
        }

        const updatedRide = await rideModel.findByIdAndUpdate(rideId, { status: 'cancelled' }, { new: true })
          .populate('user').populate('captain');
        if (!updatedRide) {
          return socket.emit('error', { message: 'Ride not found' });
        }

        if (updatedRide.user?.socketId) {
          sendMessageToSocketId(updatedRide.user.socketId, 'ride-cancelled', updatedRide);
        }
      } catch (error) {
        console.error('[Socket] ride-cancelled error', error);
        socket.emit('error', { message: 'Unable to cancel ride' });
      }
    });

    socket.on('disconnect', async () => {
      try {
        if (socket.data.userType === 'user') {
          await userModel.findByIdAndUpdate(socket.data.userId, { socketId: null });
          console.log(`[Socket] User disconnected: ${socket.id}`);
        } else if (socket.data.userType === 'captain') {
          await captainModel.findByIdAndUpdate(socket.data.userId, { socketId: null });
          console.log(`[Socket] Captain disconnected: ${socket.id}`);
        }
      } catch (error) {
        console.error('[Socket] disconnect cleanup error', error);
      }
    });

    socket.on('error', (err) => {
      console.error('[Socket] Socket error', err);
    });
  });

  return io;
}

/**
 * Emit an event to a specific socket by ID.
 * Uses Socket.IO's built-in io.to() for reliable delivery —
 * does NOT rely on a custom Map that can go stale.
 */
function sendMessageToSocketId(socketId, event, message) {
  if (!io) {
    console.error('[Socket] sendMessageToSocketId: io not initialized!');
    return false;
  }
  if (!socketId) {
    console.warn(`[Socket] sendMessageToSocketId: socketId is null/undefined for event "${event}"`);
    return false;
  }

  console.log(`[Socket] Emitting "${event}" to socketId=${socketId}`);
  io.to(socketId).emit(event, message);
  return true;
}

module.exports = { initializeSocket, sendMessageToSocketId };
