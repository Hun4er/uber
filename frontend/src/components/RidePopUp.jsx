import React from 'react'

const RidePopUp = (props) => {
 

  return (
    <div>
      <h5 onClick={() => props.setRidePopPanel(false)} className='p-1 text-center w-[93%] absolute top-0'><i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
      <h3 className='text-2xl font-semibold mb-5'>New Ride Available</h3>
      <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <img className='h-12 rounded-full object-cover w-full' src="https://imgs.search.brave.com/6Uni_bwf9eee_CFa-w9FmxNw14wGikdBvykZKIRDrKg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjE4/NjM4Mzk4My9waG90/by9wb3J0cmFpdC1j/cmVhdGl2ZS1hbmQt/bWFuLWZvci1wcmlk/ZS1pbi1vZmZpY2Ut/b2YtYWJvdXQtdXMt/c3RhcnR1cC1ncm93/dGgtYW5kLWNhcmVl/ci1hbWJpdGlvbi5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/OGhjQTJGak9iNFlK/VjhJdUJYWm9mbzlh/aVFCWlBiT3dpR2RW/cmNTWXZZND0" alt="" />
            <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
            <i className="ri-map-pin-user-line"></i>
            <div>
              <h3 className='text-lg font-medium'>Pickup</h3>
              <p className='text-sm -m-1 text-gray-600'>{props.ride?.pickup}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className='ri-map-pin-2-fill' />
            <div>
              <h3 className='text-lg font-medium'>Destination</h3>
              <p className='text-sm -m-1 text-gray-600'>{props.ride?.destination}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 '>
            <i className="ri-money-rupee-circle-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
              <p className='text-sm -m-1 text-gray-600'>Cash</p>
            </div>
          </div>
        </div>
        <div className='flex mt-5 w-full items-center justify-between'>
          <button 
          onClick={() => props.setRidePopPanel(false)}
           className=' mt-1 bg-gray-300 text-gray-700 font-semibold p-3 px-10 rounded-lg'>Ignore</button>
          <button onClick={props.confirmRide} className=' mt-5 bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Accept</button>
        </div>
      </div>
    </div>
  )
}

export default RidePopUp
