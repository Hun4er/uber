import React from 'react'
import Car from '../assets/Car.png'

const ConfirmedRide = (props) => {
  return (
    <div>
      <h5 onClick={()=>{
          props.setConfirmRidePannel(false)
        }} className='p-1 text-center w-[93%] absolute top-0'><i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>Confirm Your Ride</h3>
        <div className='flex gap-2 justify-between flex-col items-center'>
          <img className='h-20' src={Car} alt="" />
          <div className='w-full mt-5'>
            <div className='flex items-center gap-5 p-3 border-b-2'>
              <i className="ri-map-pin-user-line"></i>
              <div>
                <h3 className='text-lg font-medium'>562/11</h3>
                <p className='text-sm -m-1 text-gray-600'>Tdi Lake Grove,Sonipat,Haryana</p>
              </div>
            </div>
            <div className='flex items-center gap-5 p-3 border-b-2'>
              <i className='ri-map-pin-2-fill'/>
              <div>
                <h3 className='text-lg font-medium'>562/11</h3>
                <p className='text-sm -m-1 text-gray-600'>Tdi Lake Grove,Sonipat,Haryana</p>
              </div>
            </div>
            <div className='flex items-center gap-5 p-3 '>
                <i className="ri-money-rupee-circle-fill"></i>
              <div>
                <h3 className='text-lg font-medium'>193</h3>
                <p className='text-sm -m-1 text-gray-600'>Cash Cash</p>
              </div>
            </div>
          </div>
          <button onClick={()=>{
            props.setVehicleFound(true)
            props.setConfirmRidePannel(false)
          }} className='w-full mt-5 bg-green-600 text white font-semibold p-2 rounded-lg'>Confirm</button>
        </div>
    </div>
  )
}

export default ConfirmedRide