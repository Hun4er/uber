import React from 'react'
import Car from '../assets/Car.png'
import Bike from '../assets/Bike.png'
import Auto from '../assets/Auto.png'

const VehiclePannel = (props) => {
  return (
    <div>
        <h5 onClick={()=>{
          props.setVehiclePannel(false)
        }} className='p-1 text-center w-[93%] absolute top-0'><i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>Choose  a Vehicle</h3>
      {/* Car */}
        <div onClick={()=>{
            props.setConfirmRidePannel(true)
        }} className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between'>
          <img className='h-20' src={Car} alt="" />
          <div className='ml-2 w-1/2'>
            <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-line"></i>4</span></h4>
            <h5 className='font-medium text-sm' >2 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹193</h2>
        </div>
        {/*Motorcycle */}
          <div onClick={()=>{
            props.setConfirmRidePannel(true)
        }} className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between'>
          <img className='h-20' src={Bike} alt="" />
          <div className='ml-2 w-1/2'>
            <h4 className='font-medium text-base'>Moto <span><i className="ri-user-line"></i>1</span></h4>
            <h5 className='font-medium text-sm' >3 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable Bike rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹65</h2>
        </div>

        {/*Auto */}
          <div onClick={()=>{
            props.setConfirmRidePannel(true)
        }} className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between'>
          <img className='h-20' src={Auto} alt="" />
          <div className='ml-2 w-1/2'>
            <h4 className='font-medium text-base'>UberAuto <span><i className="ri-user-line"></i>3</span></h4>
            <h5 className='font-medium text-sm' >1 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable Auto rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹118</h2>
        </div>
    </div>
  )
}

export default VehiclePannel