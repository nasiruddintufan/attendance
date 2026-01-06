import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Navigate, Outlet } from 'react-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from '../ui/loading';

const Layout = () => {
  const auth = getAuth();
  const [user,setuser] = useState(null);
  const [loading,setloading]=useState(true);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if(!user.emailVerified){
        setloading(false)
        return setuser(null)
      }
      setuser(user)
      setloading(false)
    } else {
      setuser(null)
      setloading(false)
    }
  });

  if(loading){
    return <Loading/>
  }

  if(!user){
    return <Navigate to="/login" />;
  }
  
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

export default Layout
