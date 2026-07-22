import React from 'react'

const CaptainDetails = () => {
  return (
    <div>
        <div className='flex items-center justify-between'>
        <div className='flex items-center justify-start gap-3'>
          <img className='h-10 w-10 rounded-full object-cover' src="https://imgs.search.brave.com/l7Yyu4symDd7EDgMAg2btFDDgvyn91AkRNJI3DW8ujk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWd2/My5mb3Rvci5jb20v/aW1hZ2VzL2dhbGxl/cnkvZ2VuZXJhdGUt/YS0zZC1haS1hdmF0/YXItb2YtYS1tYWxl/LWluLWZvdG9yLmpw/Zw" alt="" />
          <h4 className='text-lg font-medium'>Harsh Mishra</h4>
        </div>
        <div>
          <h4 className='text-xl font-semibold'>₹296</h4>
          <p className='text-sm text-gray-600'>Earned</p>
        </div>
      </div>

      <div className='flex items-start bg-gray-100 mt-6 rounded-xl justify-center p-3 gap-5'>
        <div className='text-center'>
          <i className='text-3xl mb-2 font-thin ri-timer-2-line'></i>
          <h5 className='text-lg font-medium'>10.2</h5>
          <p className='text-sm text-gray-600'>Hours Online</p>
        </div>
        <div className='text-center'>
          <i className='text-3xl mb-2 font-thin ri-speed-up-line'></i>
          <h5 className='text-lg font-medium'>10.2</h5>
          <p className='text-sm text-gray-600'>Hours Online</p>
        </div>
        <div className='text-center'>
           <i className='text-3xl mb-2 font-thin ri-booklet-line'></i>
          <h5 className='text-lg font-medium'>10.2</h5>
          <p className='text-sm text-gray-600'Hours Online>Hours Online</p> 
        </div>
      </div>
    </div>
  )
}

export default CaptainDetails