import React, { useState, useContext } from 'react'
import { useSocket } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {
    const ride = props.ride
    const [otp, setOtp] = useState('')
    const { sendMessageToEvent } = useSocket()
    const { captain } = useContext(CaptainDataContext)
    const navigate = useNavigate()

    const closePanels = () => {
        props.setConfirmRidePopUpPanel?.(false)
        props.setRidePopPanel?.(false)
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params: {
                rideId: props.ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.status == 200) {
            console.log('captain started ride', { rideId: props.ride?._id, otp })
            const rideDate = new Date().toLocaleString()
            closePanels()
            navigate('/captain-riding', {
                state: {
                    ride: response.data,
                    rideDate
                }
            })
        }



    }

    return (
        <div>
            <h5 onClick={closePanels} className='p-1 text-center w-[93%] absolute top-0'><i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm This Ride To Start</h3>
            <div className='flex items-center justify-between p-3 border-2'>
                <div className='flex items-center gap-3'>
                    <img className='h-12 rounded-full object-cover w-full' src="https://imgs.search.brave.com/6Uni_bwf9eee_CFa-w9FmxNw14wGikdBvykZKIRDrKg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjE4/NjM4Mzk4My9waG90/by9wb3J0cmFpdC1j/cmVhdGl2ZS1hbmQt/bWFuLWZvci1wcmlk/ZS1pbi1vZmZpY2Ut/b2YtYWJvdXQtdXMt/c3RhcnR1cC1ncm93/dGgtYW5kLWNhcmVl/ci1hbWJpdGlvbi5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/OGhjQTJGak9iNFlK/VjhJdUJYWm9mbzlh/aVFCWlBiT3dpR2RW/cmNTWXZZND0" alt="" />
                    <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>

                </div>
            </div>
            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>Pickup</h3>
                            <p className='text-sm -m-1 text-gray-600'>{ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className='ri-map-pin-2-fill' />
                        <div>
                            <h3 className='text-lg font-medium'>Destination</h3>
                            <p className='text-sm -m-1 text-gray-600'>{ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 '>
                        <i className="ri-money-rupee-circle-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
                            <p className='text-sm -m-1 text-gray-600'>Cash</p>
                        </div>
                    </div>
                </div>
                <div className='mt-5 w-full'>
                    <form onSubmit={submitHandler}>
                        <input
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className='bg-[#eee] px-6 font-mono text-lg p-4 rounded-lg w-full mt-3'
                            type="text" placeholder='Enter OTP' />
                        <button type='submit' className='flex text-lg justify-center w-full mt-5 bg-green-600 text-white font-semibold p-3 rounded-lg'>Confirm</button>
                        <button onClick={closePanels} className='w-full text-lg mt-1 bg-red-500 text-white font-semibold p-3 rounded-lg'>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopUp