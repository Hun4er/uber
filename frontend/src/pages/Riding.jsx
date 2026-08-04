import React, { useEffect } from 'react'
import Car from '../assets/Car.png'
import { useLocation } from 'react-router-dom'
import { useSocket } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

const Riding = () => {
  const location = useLocation()
  const ride = location.state?.ride
  const rideDate = location.state?.rideDate
  const { receiveMessageFromEvent, connected } = useSocket()
  const navigate = useNavigate()

  useEffect(() => {
    if (!connected) return undefined

    const unsubscribeEnded = receiveMessageFromEvent('ride-ended', (data) => {
      console.log('[Riding] ride-ended received', data)
      navigate('/home')
    })

    return () => unsubscribeEnded()
  }, [navigate, receiveMessageFromEvent, connected])

  const captainName = ride?.captain?.fullname?.firstname
    ? `${ride.captain.fullname.firstname} ${ride.captain.fullname.lastname || ''}`.trim()
    : 'Captain'

  return (
    <div className='h-screen flex flex-col relative'>
      {/* Map Area */}
      <div className='h-1/2'>
        <LiveTracking ride={ride} />
      </div>

      {/* Ride Info Panel */}
      <div className='h-1/2 p-4 bg-white flex flex-col justify-between overflow-y-auto'>
        {/* Captain Card */}
        <div className='flex items-center justify-between mb-3 pb-3 border-b-2'>
          <div className='flex items-center gap-3'>
            <div className='h-14 w-14 rounded-full bg-gray-200 overflow-hidden'>
              <img
                className='h-full w-full object-cover'
                src="https://imgs.search.brave.com/6Uni_bwf9eee_CFa-w9FmxNw14wGikdBvykZKIRDrKg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjE4/NjM4Mzk4My9waG90/by9wb3J0cmFpdC1j/cmVhdGl2ZS1hbmQt/bWFuLWZvci1wcmlk/ZS1pbi1vZmZpY2Ut/b2YtYWJvdXQtdXMt/c3RhcnR1cC1ncm93/dGgtYW5kLWNhcmVl/ci1hbWJpdGlvbi5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/OGhjQTJGak9iNFlK/VjhJdUJYWm9mbzlh/aVFCWlBiT3dpR2RW/cmNTWXZZND0"
                alt="Captain"
              />
            </div>
            <div>
              <h2 className='text-lg font-semibold'>{captainName}</h2>
              <p className='text-sm text-gray-500'>
                {ride?.captain?.vehicle?.model || ride?.captain?.vehicle?.vehicleType || 'Vehicle'}
              </p>
            </div>
          </div>
          <div className='text-right'>
            <h4 className='text-xl font-bold tracking-widest'>
              {ride?.captain?.vehicle?.plate || '—'}
            </h4>
            <p className='text-xs text-gray-500'>Plate No.</p>
          </div>
        </div>

        {/* Trip Details */}
        <div className='flex-1'>
          <div className='flex items-center gap-4 p-2 border-b'>
            <i className="ri-map-pin-2-fill text-gray-700"></i>
            <div>
              <h3 className='text-sm font-medium text-gray-500'>Destination</h3>
              <p className='text-base font-semibold'>{ride?.destination || '—'}</p>
            </div>
          </div>
          <div className='flex items-center gap-4 p-2 border-b'>
            <i className="ri-map-pin-user-line text-gray-700"></i>
            <div>
              <h3 className='text-sm font-medium text-gray-500'>Pickup</h3>
              <p className='text-base font-semibold'>{ride?.pickup || '—'}</p>
            </div>
          </div>
          <div className='flex items-center gap-4 p-2'>
            <i className="ri-money-rupee-circle-fill text-gray-700"></i>
            <div>
              <h3 className='text-sm font-medium text-gray-500'>Fare</h3>
              <p className='text-base font-semibold'>₹{ride?.fare || 0} &bull; Cash</p>
            </div>
          </div>
        </div>

        {/* Make Payment Button */}
        <button className='w-full mt-3 bg-black text-white font-semibold p-3 rounded-xl text-base'>
          Make a Payment
        </button>
      </div>
    </div>
  )
}

export default Riding