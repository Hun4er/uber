import React from 'react'
import Car from '../assets/Car.png'
import { Link } from 'react-router-dom'

const Riding = () => {
  return (
    <div className='h-screen'>
      <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
        <i className="text-lg font-medium ri-home-5-line"></i>
      </Link>
      <div className='h-1/2'>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1100/format:webp/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className='h-1/2 p-4'>
        <div className='flex items-center justify-between'>
          <img className="h-12" src={Car} alt="" />
          <div className='text-right'>
            <h2 className='text-lg font-medium' >Harsh</h2>
            <h4 className='text-lg font-semibold -mt-1 -mb-1'>HR02 CA 4444</h4>
            <p className='text-sm text-gray-600'> Honda City </p>
          </div>
        </div>
        <div className='flex gap-2 justify-between flex-col items-center'>
          <div className='w-full mt-5'>

            <div className='flex items-center gap-5 p-3 border-b-2'>
              <i className='ri-map-pin-2-fill' />
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

        </div>
        <button className='w-full mt-5 bg-green-600 text white font-semibold p-2 rounded-lg'>Make a Payment</button>
      </div>
    </div>
  )
}

export default Riding