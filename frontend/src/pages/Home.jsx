import React,{useRef, useState} from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import { LocationSearchPannel } from '../components/LocationSearchPannel'
import VehiclePannel from '../components/VehiclePannel'
import ConfirmedRide from '../components/ConfirmedRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'

const home = () => {
  const [pickup, setPickup]=useState('')
  const [destination, setDestination] = useState('')
  const [panelOpne, setPanelOpen] = useState(false)
  const [vehiclePannel, setVehiclePannel] = useState(false)
  const [confirRidePannel, setConfirmRidePannel] = useState(false)
  const [vehicleFound,setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)


  const pannelRef = useRef(null)
  const pannelCloseRef = useRef(null)
  const vehiclePannelRef = useRef(null)
  const confirmRidePannelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)



  const submitHandler=(e)=>{
    e.preventDefault()

  }

  useGSAP(function(){
    if(panelOpne){
      gsap.to(pannelRef.current,{
        height: '70%',
        padding:24 
      })
      gsap.to(pannelCloseRef.current,{
        opacity:1
      })
    }else{
      gsap.to(pannelRef.current,{
        height:'0%',
        padding:0
      })
      gsap.to(pannelCloseRef.current,{
        opacity:0
      })
    }
  },[panelOpne])

  useGSAP(function(){
   if(vehiclePannel){
     gsap.to(vehiclePannelRef.current,{
      transform:"translateY(0)"
    })
   }else {
     gsap.to(vehiclePannelRef.current,{
      transform:"translateY(100%)"
    })
   }
  },[vehiclePannel])

    useGSAP(function(){
   if(confirRidePannel){
     gsap.to(confirmRidePannelRef.current,{
      transform:"translateY(0)"
    })
   }else {
     gsap.to(confirmRidePannelRef.current,{
      transform:"translateY(100%)"
    })
   }
  },[confirRidePannel])

      useGSAP(function(){
   if(vehicleFound){
     gsap.to(vehicleFoundRef.current,{
      transform:"translateY(0)"
    })
   }else {
     gsap.to(vehicleFoundRef.current,{
      transform:"translateY(100%)"
    })
   }
  },[vehicleFound])

       useGSAP(function(){
   if(waitingForDriver){
     gsap.to(waitingForDriverRef.current,{
      transform:"translateY(0)"
    })
   }else {
     gsap.to(waitingForDriverRef.current,{
      transform:"translateY(100%)"
    })
   }
  },[waitingForDriver])
  
  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 left-5 top-5 absolute' src="https://imgs.search.brave.com/GKyI6dgPjeQta0ogOaTTl0C7gqPzxQAm3-_ss9qnPLg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTIwMTYtMjAxOC03/MDB4Mzk0LnBuZw" alt="" />

      <div className='h-screen w-screen'>
        {/* Map/Image for Temporary Use */}
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1100/format:webp/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] p-6 bg-white relative'>
          <div>
            <h5 
            ref={pannelCloseRef}
            onClick={()=>{
              setPanelOpen(false)
            }}
            className='absolute right-6 top-6 text-2xl'>
              <i className="ri-arrow-down-wide-line"></i>
            </h5>
          </div>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
        <form onSubmit={(e)=>{
          submitHandler(e)
        }} >
          <div className="line absolute h-16 w-1 bottom-[28.7%] left-10 bg-gray-700 rounded-full "></div>
          <input
          value={pickup}
          onClick={()=>{
            setPanelOpen(true)
          }}
          onChange={(e)=>{
            setPickup(e.target.value)
          }}
           className='bg-[#eee] px-12 text-lg rounded-lg w-full mt-5'
            type="text" 
            placeholder='Add a pick-up location'/>
          <input 
          value={destination}
          onClick={()=>{
            setPanelOpen(true)
          }}
          onChange={(e)=>{
            setDestination(e.target.value)
          }}
          className='bg-[#eee] px-12 text-lg rounded-lg w-full mt-3' 
          type="text" 
          placeholder='Enter your destination'/>
        </form>
        </div>
        <div ref={pannelRef} className='bg-white h-0'>
          <LocationSearchPannel setPanelOpen={setPanelOpen} setVehiclePannel={setVehiclePannel}/>
        </div>
      </div>

      <div ref={vehiclePannelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <VehiclePannel setConfirmRidePannel={setConfirmRidePannel} setVehiclePannel={setVehiclePannel}/>
      </div>

         <div ref={confirmRidePannelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
          <ConfirmedRide setConfirmRidePannel={setConfirmRidePannel} setVehicleFound={setVehicleFound}/>
      </div>

        <div ref={vehicleFoundRef}  className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
          <LookingForDriver setVehicleFound={setVehicleFound} />
      </div>

       <div ref={waitingForDriverRef}  className='fixed w-full z-10 bottom-0  bg-white px-3 py-6 pt-12'>
          <WaitingForDriver setWaitingForDriver={setWaitingForDriver}/>
      </div>
      

      
    </div>
  )
}

export default home