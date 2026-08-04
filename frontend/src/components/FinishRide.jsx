import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FinishRide = (props) => {
    const navigate = useNavigate()
    const ride = props.ride

    async function endRide() {
        if (!ride?._id) {
            console.error('No ride ID available')
            return
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
                rideId: ride._id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.status === 200) {
                console.log('captain completed ride', { rideId: ride._id })
                navigate('/captain-home')
            }
        } catch (err) {
            console.error('endRide error', err)
        }
    }

    const userName = ride?.user?.fullname?.firstname
        ? `${ride.user.fullname.firstname} ${ride.user.fullname.lastname || ''}`.trim()
        : 'Passenger'

    return (
        <div className='h-screen'>
            <h5
                onClick={() => props.setFinishRidePanel(false)}
                className='p-1 text-center w-[93%] absolute top-0'
            >
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className='text-2xl font-semibold mb-5'>Finish This Ride</h3>
            <div className='flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3'>
                    <img
                        className='h-10 w-10 rounded-full object-cover'
                        src="https://imgs.search.brave.com/l7Yyu4symDd7EDgMAg2btFDDgvyn91AkRNJI3DW8ujk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWd2/My5mb3Rvci5jb20v/aW1hZ2VzL2dhbGxl/cnkvZ2VuZXJhdGUt/YS0zZC1haS1hdmF0/YXItb2YtYS1tYWxl/LWluLWZvdG9yLmpw/Zw"
                        alt="Passenger"
                    />
                    <h2 className='text-lg font-medium'>{userName}</h2>
                </div>
                <h5 className='text-lg font-semibold'>₹{ride?.fare}</h5>
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
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-money-rupee-circle-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
                            <p className='text-sm -m-1 text-gray-600'>Cash</p>
                        </div>
                    </div>
                </div>
                <div className='mt-5 w-full'>
                    <button
                        onClick={endRide}
                        className='flex justify-center text-lg w-full mt-5 bg-green-600 text-white font-semibold p-3 rounded-lg'
                    >
                        Complete Ride
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FinishRide