import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const userlogin = () => {
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [userData, setUserData] = useState({});

  const submitHandler=(e)=>{
    e.preventDefault();
    setUserData({
      email:email,
      password:password
    });
  
    setEmail('')
    setPassword('')
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10 ' src="https://imgs.search.brave.com/GKyI6dgPjeQta0ogOaTTl0C7gqPzxQAm3-_ss9qnPLg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTIwMTYtMjAxOC03/MDB4Mzk0LnBuZw" alt="" />
      <form onSubmit={(e)=>{
        submitHandler(e)
      }}>
        <h3 className='text-xl font-medium mb-2' >What's Your Email</h3>
        <input
        value={email}
        onChange={(e)=>{
          setEmail(e.target.value)
        }}
         required
        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-sm'
         type="email"
          placeholder='email@example.com'
          />
          <h3 className='text-xl font-medium mb-2'>Enter Password</h3>
          <input 
             value={password}
        onChange={(e)=>{
          setPassword(e.target.value)
        }}
          className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-sm'
          required type="password" placeholder='password'/>
          <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-sm'>Login</button>

      </form>
          <p className='text-center'>New Here? <Link to='/signup' className='text-blue-600'>Create New Accound</Link></p>
      </div>
      <div>
        <Link to='/captain-login' className='bg-[#10b461] flex flex-center justify-center text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-sm'>Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default userlogin