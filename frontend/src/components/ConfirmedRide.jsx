import React from 'react'
import Car from '../assets/Car.png'

const ConfirmedRide = () => {
  return (
    <div>
      <h5 onClick={()=>{
          props.setVehiclePannel(false)
        }} className='p-1 text-center w-[93%] absolute top-0'><i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>Confirm Your Ride</h3>
        <div className='flex gap-2 justify-between flex-col items-center'>
          <img className='h-20' src={Car} alt="" />
          <div className='w-full'>
            <div className='flex items-center'>
              <i className='ri-map-pin-2-fill'/>
              <div>
                <h3 className='text-lg font-medium'>562/11</h3>
                <p className='text-sm -m-1 text-gray-600'>Tdi Lake Grove,Sonipat,Haryana</p>
              </div>
            </div>
            <div></div>
            <div></div>
          </div>
          <button className='w-full bg-green-600 text white font-semibold p-2 rounded-lg'>Confirm</button>
        </div>
    </div>
  )
}

export default ConfirmedRide