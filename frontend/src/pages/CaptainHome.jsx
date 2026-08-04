import React, { useRef, useState, useEffect, useContext } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Link, useNavigate } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { useSocket } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'
const CaptainHome = () => {
  const [ridePopPanel, setRidePopPanel] = useState(false)
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)
  const [ride, setRide] = useState(null)
  const navigate = useNavigate()

  const ridePopPanelRef = useRef(null)
  const confirmRidePopUpPanelRef = useRef(null)
  const { captain } = useContext(CaptainDataContext)
  const { joinSocket, sendMessageToEvent, receiveMessageFromEvent, connected } = useSocket()


  useEffect(() => {
    if (!captain?._id) return

    joinSocket('captain', captain._id)

    const updateLocation = () => {
      if (!navigator.geolocation) return
      navigator.geolocation.getCurrentPosition((position) => {
        sendMessageToEvent('update-location-captain', {
          userId: captain._id,
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        })
      })
    }

    updateLocation()
    const locationInterval = setInterval(updateLocation, 10000)

    return () => clearInterval(locationInterval)
  }, [captain?._id, joinSocket, sendMessageToEvent])


  useEffect(() => {
    if (!connected) return

    console.log('[CaptainHome] Registering ride listeners')

    const unsubNewRide = receiveMessageFromEvent('new-ride', (data) => {
      console.log('[CaptainHome] new-ride received:', data)
      setRide(data)
      setRidePopPanel(true)
    })

    const unsubRideEnded = receiveMessageFromEvent('ride-ended', (data) => {
      console.log('[CaptainHome] ride-ended received:', data)
      setRide(null)
      setRidePopPanel(false)
      setConfirmRidePopUpPanel(false)
    })

    return () => {
      unsubNewRide()
      unsubRideEnded()
    }
  }, [connected, receiveMessageFromEvent])

  async function confirmRide() {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
        rideId: ride._id,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.status === 200) {
        setRidePopPanel(false)
        setConfirmRidePopUpPanel(true)
      }
    } catch (err) {
      console.error('confirmRide error', err)
    }
  }

  useGSAP(function () {
    if (ridePopPanel) {
      gsap.to(ridePopPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(ridePopPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridePopPanel])

  useGSAP(function () {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePopUpPanel])
  return (
    <div className='h-screen'>
      <div className='fixed p-8 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src="https://imgs.search.brave.com/GKyI6dgPjeQta0ogOaTTl0C7gqPzxQAm3-_ss9qnPLg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTIwMTYtMjAxOC03/MDB4Mzk0LnBuZw" alt="" />
        <Link to='/captain-login' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className='h-3/5'>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1100/format:webp/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className='h-2/5 p-6'>
        <CaptainDetails />

      </div>
      <div ref={ridePopPanelRef} className='fixed w-full translate-y-full z-10 bottom-0 bg-white px-3 py-10 pt-12'>
        <RidePopUp

          ride={ride}
          setRidePopPanel={setRidePopPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          confirmRide={confirmRide}
        />
      </div>
      <div ref={confirmRidePopUpPanelRef} className='fixed w-full h-screen translate-y-full z-10 bottom-0 bg-white px-3 py-10 pt-12'>
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          setRidePopPanel={setRidePopPanel}

        />
      </div>
    </div>
  )
}

export default CaptainHome