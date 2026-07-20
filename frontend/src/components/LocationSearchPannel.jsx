import React from 'react'

export const LocationSearchPannel = (props) => {
 
  const location = [
    "Tower-3,TDI Lake Grove,Kundali,Sonipat,Haryana 131023",
    "SRM University,Rajiv Gandhi Education City, Patla, Sonipat, Haryana 131023",
    "Ashoka University,Rajiv Gandhi Education City, Patla, Sonipat, Haryana 131023",
    "H4,TDI kingburry,Sector 61, Sonipat, Haryana 131023"
  ]
  return (
    <div>
      {/* This is Just a Sample Data */}
      {
      location.map(function(elem, idx){
        return <div key={idx} onClick={()=>{
          props.setVehiclePannel(true)
          props.setPanelOpen(false)
        }} className='flex gap-4 border-2 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
        <h2 className='bg-[#eee] h-8 flex item-center justify-center w-12 rounded'><i className="ri-map-pin-fill"></i></h2>
        <h4 className='font-medimum'>{elem}</h4>
      </div>
      })
    }

    
    </div>
  )
}
