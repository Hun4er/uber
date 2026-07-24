import React, {useRef, useState} from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import {Link} from 'react-router-dom'
import Car from '../assets/Car.png'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'

const CaptainHome = () => {
  const [ridePopPanel, setRidePopPanel] = useState(true)
  const [confirmRidePopUpPanel,setConfirmRidePopUpPanel] = useState(false)

  const ridePopPanelRef = useRef(null)
  const confirmRidePopUpPanelRef = useRef(null);

  useGSAP(function(){
    if(ridePopPanel){
    gsap.to(ridePopPanelRef.current,{
      transform:'translateY(0)'
    })
    }else{
      gsap.to(ridePopPanelRef.current,{
        transform:'translateY(100%)'
      })
    }
  }, [ridePopPanel])

   useGSAP(function(){
    if(confirmRidePopUpPanel){
    gsap.to(confirmRidePopUpPanelRef.current,{
      transform:'translateY(0)'
    })
    }else{
      gsap.to(confirmRidePopUpPanelRef.current,{
        transform:'translateY(100%)'
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
        <CaptainDetails/>

      </div>
      <div ref={ridePopPanelRef} className='fixed w-full translateY-full z-10 bottom-0 bg-white px-3 py-10 pt-12'>
        <RidePopUp setRidePopPanel={setRidePopPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}/>
      </div>
      <div ref={confirmRidePopUpPanelRef} className='fixed w-full h-screen translateY-full z-10 bottom-0 bg-white px-3 py-10 pt-12'>
        <ConfirmRidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopPanel={setRidePopPanel}/>
      </div>
    </div>
  )
}

export default CaptainHome