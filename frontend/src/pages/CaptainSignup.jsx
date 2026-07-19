import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const captainsignup = () => {
  const navigate = useNavigate();


  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
 



  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const { captain, setCaptain } = React.useContext(CaptainDataContext)

  const submitHandler = async(e) => {
    e.preventDefault();
   const captainData = ({
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: password,
      vehicle: {
        color:vehicleColor,
        plate: vehiclePlate,
        capacity:vehicleCapacity,
        vehicleType: vehicleType
      }
    })

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,captainData)
    if(response.status == 201){
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token',data.token)
      navigate('/captain-home')
    }

    setFirstname('');
    setLastname('');
    setEmail('');
    setPassword('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleCapacity('');
    setVehicleType('');

  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10 ' src="https://imgs.search.brave.com/GKyI6dgPjeQta0ogOaTTl0C7gqPzxQAm3-_ss9qnPLg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTIwMTYtMjAxOC03/MDB4Mzk0LnBuZw" alt="" />
        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <h3 className='text-lg font-medium mb-2' >What's Your Name</h3>
          <div className='flex gap-4 mb-5'>
            <input
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value)
              }}
              required
              className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-lg'
              type="text"
              placeholder='First Name'
            />
            <input
              value={lastname}
              onChange={(e) => {
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
            onChange={(e) => {
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
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-lg'
            required type="password" placeholder='password' />


          <div className='mb-5'>
            <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>

            <div className='grid grid-cols-2 gap-4'>
              <input
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                required
                className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-lg'
                type='text'
                placeholder='Vehicle color'
              />

              <input
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
                required
                className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-lg'
                type='text'
                placeholder='Vehicle plate'
              />

              <input
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
                required
                className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-lg'
                type='number'
                placeholder='Vehicle capacity'
              />

              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                required
                className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg'
              >
                <option value='' disabled>Select vehicle type</option>
                <option value='car'>Car</option>
                <option value='auto'>Auto</option>
                <option value='motorcycle'>Motorcycle</option>
              </select>
            </div>
          </div>
          <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-sm'>Create Account</button>

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