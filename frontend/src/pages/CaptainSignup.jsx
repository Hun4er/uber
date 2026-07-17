import {React, useState} from 'react'
import { Link } from 'react-router-dom'


const captainsignup = () => {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail]= useState('')
    const [password, setPassword]=useState('')
    const [captainData, setCaptainData] = useState({})
  
    const submitHandler=(e)=>{
      e.preventDefault();
      setCaptainData({
        fullname:{
          firstname:firstname,
          lastname:lastname
        },
        email:email,
        password:password 
      })
  
      setFirstname('');
      setLastname('');
      setEmail('');
      setPassword('');
  
    }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
       <div>
         <img className='w-16 mb-10 ' src="https://imgs.search.brave.com/GKyI6dgPjeQta0ogOaTTl0C7gqPzxQAm3-_ss9qnPLg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTIwMTYtMjAxOC03/MDB4Mzk0LnBuZw" alt="" />
       <form onSubmit={(e)=>{
         submitHandler(e)
       }}>
        <h3 className='text-lg font-medium mb-2' >What's Your Name</h3>
        <div className='flex gap-4 mb-5'>
           <input
          value={firstname}
          onChange={(e)=>{
            setFirstname(e.target.value)
          }}
          required
         className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-lg'
          type="text"
           placeholder='First Name'
           />
            <input
            value={lastname}
            onChange={(e)=>{
              setLastname(e.target.value)
            }}
          required
         className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-lg'
          type="text"
           placeholder='Last Name'
           />
        </div>
         <h3 className='text-lg font-medium mb-2' >What's Your Email</h3>
         <input
          value={email}
          onChange={(e)=>{
            setEmail(e.target.value)
          }}
          required
         className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-lg'
          type="email"
           placeholder='email@example.com'
           />
           <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
           <input 
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
           className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-lg'
           required type="password" placeholder='password'/>
           <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-sm'>Sign Up</button>
 
       </form>
           <p className='text-center'>Already Have an account?. <Link to='/captain-login' className='text-blue-600'>Log in Here</Link></p>
       </div>
       <div>
        <p className='text-[10px] leading-tight'>By Proceeding, you consent to get Calls.WhatsApp or SMS message, including by automated means, from Uber and It's affiliate to the number provided</p>
       </div>
     </div>
  )
}

export default captainsignup