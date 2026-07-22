import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {
    const [otp, setOtp] = useState('')
    const submitHandler = (e)=>{
        e.preventDefault()
    }
    return (
        <div>
            <h5 onClick={() => {
                props.setConfirmRidePopUpPanel(false)
            }} className='p-1 text-center w-[93%] absolute top-0'><i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm This Ride To Start</h3>
            <div className='flex items-center justify-between p-3 rounded-lg mt-4 '>
                <div className='flex items-center gap-3'>
                    <img className='h-10 w-10 rounded-full object-cover' src="https://imgs.search.brave.com/l7Yyu4symDd7EDgMAg2btFDDgvyn91AkRNJI3DW8ujk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWd2/My5mb3Rvci5jb20v/aW1hZ2VzL2dhbGxl/cnkvZ2VuZXJhdGUt/YS0zZC1haS1hdmF0/YXItb2YtYS1tYWxl/LWluLWZvdG9yLmpw/Zw" alt="" />
                    <h2 className='text-lg font-medium'>Prashant Kumar</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
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
                <div className='mt-5 w-full'>
                    <form onSubmit={(e)=>{
                        submitHanler(e)
                    }}>
                        <input
                        value={otp}
                        onChange={(e)=>setOtp(e.target.value)}
                         className='bg-[#eee] px-6 font-mono text-lg p-4 rounded-lg w-full mt-3'
                            type="text" placeholder='Enter OTP' />
                        <Link to='/captains-riding' onClick={() => {
                        }} className='flex text-lg justify-center w-full mt-5 bg-green-600 text-white font-semibold p-3 rounded-lg'>Confirm</Link>
                        <button onClick={() => {
                            props.setConfirmRidePopUpPanel(false)
                            props.setRidePopPanel(false)
                        }} className='w-full text-lg mt-1 bg-red-500 text-white font-semibold p-3 rounded-lg'>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopUp