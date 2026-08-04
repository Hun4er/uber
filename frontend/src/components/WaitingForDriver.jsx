import React from 'react'
import Car from '../assets/Car.png'

const WaitingForDriver = (props) => {
  const ride = props.ride
  const captainName = ride?.captain?.fullname?.firstname && ride?.captain?.fullname?.lastname
    ? `${ride.captain.fullname.firstname} ${ride.captain.fullname.lastname}`
    : ride?.captain?.fullname?.firstname || 'Captain assigned'
  const plate = ride?.captain?.vehicle?.plate || '—'
  const vehicleModel = ride?.captain?.vehicle?.model || ride?.captain?.vehicle?.vehicleType || 'Vehicle'

  return (
    <div>
      <h5
        onClick={() => props.setWaitingForDriver(false)}
        className='p-1 text-center w-[93%] absolute top-0 cursor-pointer'
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>

      {/* Captain Details Header */}
      <div className='flex items-center justify-between mb-3'>
        <div className='flex items-center gap-3'>
          <div className='h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden'>
            <img
              className='h-full w-full object-cover'
              src="https://imgs.search.brave.com/6Uni_bwf9eee_CFa-w9FmxNw14wGikdBvykZKIRDrKg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjE4/NjM4Mzk4My9waG90/by9wb3J0cmFpdC1j/cmVhdGl2ZS1hbmQt/bWFuLWZvci1wcmlk/ZS1pbi1vZmZpY2Ut/b2YtYWJvdXQtdXMt/c3RhcnR1cC1ncm93/dGgtYW5kLWNhcmVl/ci1hbWJpdGlvbi5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/OGhjQTJGak9iNFlK/VjhJdUJYWm9mbzlh/aVFCWlBiT3dpR2RW/cmNTWXZZND0"
              alt="Captain"
            />
          </div>
          <div>
            <h2 className='text-lg font-semibold'>{captainName}</h2>
            <p className='text-sm text-gray-500'>{vehicleModel}</p>
          </div>
        </div>
        <div className='text-right'>
          <h4 className='text-xl font-bold tracking-widest bg-yellow-100 border border-yellow-400 px-3 py-1 rounded-lg'>
            {ride?.otp || '----'}
          </h4>
          <p className='text-xs text-gray-500 mt-1'>Your OTP</p>
        </div>
      </div>

      {/* Vehicle Plate */}
      <div className='flex items-center gap-3 mb-4 p-2 bg-gray-50 rounded-lg'>
        <img className="h-10" src={Car} alt="Vehicle" />
        <div>
          <h4 className='text-base font-bold'>{plate}</h4>
          <p className='text-xs text-gray-500'>Vehicle Plate</p>
        </div>
      </div>

      {/* Ride Details */}
      <div className='w-full'>
        <div className='flex items-center gap-5 p-3 border-b-2'>
          <i className="ri-map-pin-user-line text-lg"></i>
          <div>
            <h3 className='text-base font-medium'>Pickup</h3>
            <p className='text-sm text-gray-600'>{ride?.pickup || 'Pickup location'}</p>
          </div>
        </div>
        <div className='flex items-center gap-5 p-3 border-b-2'>
          <i className='ri-map-pin-2-fill text-lg' />
          <div>
            <h3 className='text-base font-medium'>Destination</h3>
            <p className='text-sm text-gray-600'>{ride?.destination || 'Destination'}</p>
          </div>
        </div>
        <div className='flex items-center gap-5 p-3'>
          <i className="ri-money-rupee-circle-fill text-lg"></i>
          <div>
            <h3 className='text-base font-medium'>₹{ride?.fare}</h3>
            <p className='text-sm text-gray-600'>Cash</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver