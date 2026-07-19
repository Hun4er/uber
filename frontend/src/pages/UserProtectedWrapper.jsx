import React, { useContext, useEffect,useState} from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'



const UserProtectedWrapper = ({
  children
}) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const {user, setUser} = React.useContext(UserDataContext);
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {

    if (!token) {
      navigate('/login')
    }
  },[token])
  axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  }).then(Response=>{
    if(Response.status==200){
      setUser(Response.data.user)
      setIsLoading(false)
    }
  })
    .catch(err=>{
      localStorage.removeItem('token')
      navigate('/login')
    })
  
    if(isLoading){
      return
      <div>Loading...</div>
    }
  return (
    <>
      {children}
    </>
  )
}

export default UserProtectedWrapper