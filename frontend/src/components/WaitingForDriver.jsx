import React from 'react'
import Car from '../assets/Car.png'

const WaitingForDriver = () => {
  return (
      <div>
              <h5 onClick={()=>{
                  props.setWaitingForDriver(false)
                }} className='p-1 text-center w-[93%] absolute top-0'><i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
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
                 
                </div>
            </div>
  )
}

export default WaitingForDriver