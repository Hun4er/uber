import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef, useState, useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useSocket } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const ride = location.state?.ride
    const rideDate = location.state?.rideDate

    const finishRidePanelRef = useRef(null)
    const { receiveMessageFromEvent, connected } = useSocket()
    const { captain } = useContext(CaptainDataContext)

    useEffect(() => {
        if (!connected) return undefined

        const unsubscribeEnded = receiveMessageFromEvent('ride-ended', (data) => {
            console.log('[CaptainRiding] ride-ended received', data)
            navigate('/captain-home')
        })

        return () => unsubscribeEnded()
    }, [receiveMessageFromEvent, connected, navigate])

    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0%)'
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [finishRidePanel])

    return (
        <div className='h-screen relative overflow-hidden'>
            {/* Map Area */}
            <div className='h-4/5 w-full'>
                <LiveTracking ride={ride} />
            </div>

            {/* Bottom Bar */}
            <div
                className='h-1/5 p-4 flex items-center justify-between gap-4 bg-yellow-400 relative cursor-pointer'
                onClick={() => setFinishRidePanel(true)}
            >
                <h5 className='p-1 text-center w-full absolute top-0 left-0'>
                    <i className="text-3xl text-gray-600 ri-arrow-up-wide-line"></i>
                </h5>
                <div className='mt-3'>
                    {ride ? (
                        <div className='text-sm text-gray-800 space-y-0.5'>
                            <p className='font-semibold text-base'>
                                {ride.user?.fullname?.firstname} {ride.user?.fullname?.lastname}
                            </p>
                            <p><span className='font-medium'>To:</span> {ride.destination}</p>
                            <p><span className='font-medium'>Fare:</span> ₹{ride.fare}</p>
                        </div>
                    ) : (
                        <h4 className='text-xl font-semibold'>Ride in progress</h4>
                    )}
                    {rideDate ? <p className='text-xs text-gray-700 mt-1'>Started: {rideDate}</p> : null}
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        setFinishRidePanel(true)
                    }}
                    className='bg-green-600 text-white font-semibold p-3 px-6 rounded-lg whitespace-nowrap'
                >
                    Finish Ride
                </button>
            </div>

            {/* Finish Ride Panel */}
            <div
                ref={finishRidePanelRef}
                className='fixed w-full h-screen translate-y-full z-10 bottom-0 bg-white px-3 py-10 pt-12'
            >
                <FinishRide
                    ride={ride}
                    setFinishRidePanel={setFinishRidePanel}
                />
            </div>
        </div>
    )
}

export default CaptainRiding