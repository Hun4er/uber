import React, { useCallback, useEffect, useRef, useState, useContext } from 'react'
import axios from 'axios'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import { LocationSearchPannel } from '../components/LocationSearchPannel'
import VehiclePannel from '../components/VehiclePannel'
import ConfirmedRide from '../components/ConfirmedRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'
import { useSocket } from '../context/SocketContext'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpne, setPanelOpen] = useState(false)
  const [vehiclePannel, setVehiclePannel] = useState(false)
  const [confirRidePannel, setConfirmRidePannel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [activeField, setActiveField] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)
  const [ride, setRide] = useState(null)

  const pannelRef = useRef(null)
  const pannelCloseRef = useRef(null)
  const vehiclePannelRef = useRef(null)
  const confirmRidePannelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const pickupInputRef = useRef(null)
  const destinationInputRef = useRef(null)
  const lastRequestedValueRef = useRef('')

  const { joinSocket, sendMessageToEvent, receiveMessageFromEvent, connected } = useSocket()
  const { user } = useContext(UserDataContext)
  const navigate = useNavigate()

  // Register user identity with socket server (handles reconnect automatically)
  useEffect(() => {
    if (!user?._id) return
    console.log('[Home] Joining socket as user:', user._id)
    joinSocket('user', user._id)
  }, [joinSocket, user?._id])

  // Single set of ride socket listeners — no duplicates
  useEffect(() => {
    if (!connected) return

    console.log('[Home] Registering ride socket listeners')

    const unsubAccepted = receiveMessageFromEvent('ride-accepted', (data) => {
      console.log('[Home] ride-accepted received:', data)
      setRide(data)
      setVehicleFound(false)
      setWaitingForDriver(true)
    })

    const unsubConfirmed = receiveMessageFromEvent('ride-confirmed', (data) => {
      console.log('[Home] ride-confirmed received:', data)
      setRide(data)
      setVehicleFound(false)
      setWaitingForDriver(true)
    })

    const unsubStarted = receiveMessageFromEvent('ride-started', (data) => {
      console.log('[Home] ride-started received:', data)
      setRide(data)
      setWaitingForDriver(false)
      navigate('/riding', {
        state: {
          ride: data,
          rideDate: new Date().toLocaleString()
        }
      })
    })

    const unsubEnded = receiveMessageFromEvent('ride-ended', (data) => {
      console.log('[Home] ride-ended received:', data)
      setRide(null)
      setWaitingForDriver(false)
      setVehicleFound(false)
      navigate('/home')
    })

    return () => {
      unsubAccepted()
      unsubConfirmed()
      unsubStarted()
      unsubEnded()
    }
  }, [connected, receiveMessageFromEvent, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
  }

  const handleInputFocus = useCallback((field) => {
    setActiveField(field)
    setPanelOpen(true)
  }, [])

  const handleFieldChange = useCallback((field, value) => {
    const trimmedValue = value.trim()

    if (field === 'pickup') {
      setPickup(value)
    } else {
      setDestination(value)
    }

    if (trimmedValue.length < 3) {
      setSuggestions([])
      setIsLoadingSuggestions(false)
      return
    }

    setActiveField(field)
    setPanelOpen(true)
  }, [])

  const fetchFare = useCallback(async (pickupValue, destinationValue) => {
    const trimmedPickup = pickupValue?.trim()
    const trimmedDestination = destinationValue?.trim()

    if (!trimmedPickup || !trimmedDestination || trimmedPickup.length < 3 || trimmedDestination.length < 3) {
      setFare({})
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup: trimmedPickup, destination: trimmedDestination },
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })

      if (response.data) {
        setFare(response.data)
      }
    } catch (error) {
      console.error('Unable to fetch fare', error)
      setFare({})
    }
  }, [])

  const handleSelectSuggestion = useCallback(async (suggestion) => {
    const selectedValue = (suggestion?.description || suggestion || '').trim()

    if (activeField === 'pickup') {
      setPickup(selectedValue)
      setSuggestions([])
      setIsLoadingSuggestions(false)
      setPanelOpen(true)
      setActiveField('destination')
      lastRequestedValueRef.current = selectedValue.toLowerCase()
      setTimeout(() => {
        destinationInputRef.current?.focus()
      }, 0)
      return
    }

    if (activeField === 'destination') {
      const nextPickup = pickup.trim()
      const nextDestination = selectedValue

      setDestination(nextDestination)
      setSuggestions([])
      setIsLoadingSuggestions(false)
      setPanelOpen(false)
      await fetchFare(nextPickup, nextDestination)
      setVehiclePannel(true)
      lastRequestedValueRef.current = selectedValue.toLowerCase()
    }
  }, [activeField, fetchFare, pickup])

  useEffect(() => {
    const currentValue = activeField === 'pickup' ? pickup : activeField === 'destination' ? destination : ''
    const normalizedValue = currentValue.trim().toLowerCase()

    if (!activeField || currentValue.trim().length < 3) {
      setSuggestions([])
      setIsLoadingSuggestions(false)
      return
    }

    if (normalizedValue === lastRequestedValueRef.current) {
      setSuggestions([])
      setIsLoadingSuggestions(false)
      return
    }

    const controller = new AbortController()
    const timer = setTimeout(async () => {
      setIsLoadingSuggestions(true)

      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { input: currentValue },
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          signal: controller.signal,
        })

        if (!controller.signal.aborted) {
          setSuggestions(Array.isArray(response.data) ? response.data : [])
          lastRequestedValueRef.current = normalizedValue
        }
      } catch (error) {
        if (!axios.isCancel(error) && !controller.signal.aborted) {
          console.error('Unable to fetch location suggestions', error)
          setSuggestions([])
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingSuggestions(false)
        }
      }
    }, 400)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [activeField, pickup, destination])

  useGSAP(function () {
    if (panelOpne) {
      gsap.to(pannelRef.current, { height: '70%', padding: 24 })
      gsap.to(pannelCloseRef.current, { opacity: 1 })
    } else {
      gsap.to(pannelRef.current, { height: '0%', padding: 0 })
      gsap.to(pannelCloseRef.current, { opacity: 0 })
    }
  }, [panelOpne])

  useGSAP(function () {
    if (vehiclePannel) {
      gsap.to(vehiclePannelRef.current, { transform: 'translateY(0)' })
    } else {
      gsap.to(vehiclePannelRef.current, { transform: 'translateY(100%)' })
    }
  }, [vehiclePannel])

  useGSAP(function () {
    if (confirRidePannel) {
      gsap.to(confirmRidePannelRef.current, { transform: 'translateY(0)' })
    } else {
      gsap.to(confirmRidePannelRef.current, { transform: 'translateY(100%)' })
    }
  }, [confirRidePannel])

  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, { transform: 'translateY(0)' })
    } else {
      gsap.to(vehicleFoundRef.current, { transform: 'translateY(100%)' })
    }
  }, [vehicleFound])

  useGSAP(function () {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, { transform: 'translateY(0)' })
    } else {
      gsap.to(waitingForDriverRef.current, { transform: 'translateY(100%)' })
    }
  }, [waitingForDriver])

  async function createRide(vehicleType) {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
        pickup,
        destination,
        vehicleType
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (response.data?.ride) {
        setRide(response.data.ride)
      }
    } catch (error) {
      console.error('Unable to create ride', error)
    }
  }

  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 left-5 top-5 absolute z-10' src="https://imgs.search.brave.com/GKyI6dgPjeQta0ogOaTTl0C7gqPzxQAm3-_ss9qnPLg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTIwMTYtMjAxOC03/MDB4Mzk0LnBuZw" alt="" />

      <div className='h-screen w-screen'>
        <LiveTracking />
      </div>

      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] p-6 bg-white relative'>
          <div>
            <h5
              ref={pannelCloseRef}
              onClick={() => setPanelOpen(false)}
              className='absolute right-6 top-6 text-2xl opacity-0'
            >
              <i className="ri-arrow-down-wide-line"></i>
            </h5>
          </div>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={submitHandler}>
            <div className="line absolute h-16 w-1 bottom-[28.7%] left-10 bg-gray-700 rounded-full"></div>
            <input
              ref={pickupInputRef}
              value={pickup}
              onFocus={() => handleInputFocus('pickup')}
              onClick={() => handleInputFocus('pickup')}
              onChange={(e) => handleFieldChange('pickup', e.target.value)}
              className='bg-[#eee] px-12 text-lg p-3 rounded-lg w-full mt-5'
              type="text"
              placeholder='Add a pick-up location'
            />
            <input
              ref={destinationInputRef}
              value={destination}
              onFocus={() => handleInputFocus('destination')}
              onClick={() => handleInputFocus('destination')}
              onChange={(e) => handleFieldChange('destination', e.target.value)}
              className='bg-[#eee] px-12 text-lg p-3 rounded-lg w-full mt-3'
              type="text"
              placeholder='Enter your destination'
            />
          </form>
        </div>
        <div ref={pannelRef} className='bg-white h-0'>
          <LocationSearchPannel
            setPanelOpen={setPanelOpen}
            setVehiclePannel={setVehiclePannel}
            suggestions={suggestions}
            isLoadingSuggestions={isLoadingSuggestions}
            onSelectSuggestion={handleSelectSuggestion}
          />
        </div>
      </div>

      <div ref={vehiclePannelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <VehiclePannel
          setVehicleType={setVehicleType}
          fare={fare}
          setConfirmRidePannel={setConfirmRidePannel}
          setVehiclePannel={setVehiclePannel}
        />
      </div>

      <div ref={confirmRidePannelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
        <ConfirmedRide
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setConfirmRidePannel={setConfirmRidePannel}
          setVehicleFound={setVehicleFound}
          createRide={createRide}
        />
      </div>

      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
        <LookingForDriver
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setVehicleFound={setVehicleFound}
        />
      </div>

      {/* WaitingForDriver slides up when captain accepts */}
      <div ref={waitingForDriverRef} className='fixed w-full z-20 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
        <WaitingForDriver
          ride={ride}
          setVehicleFound={setVehicleFound}
          waitingForDriver={waitingForDriver}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>
    </div>
  )
}

export default Home