import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { USER } from '../../config/CONST'

const ProtectedRouter = () => {
  const location = useLocation()

  const isExistingUser = JSON.parse(localStorage.getItem('user'))
  
  return  isExistingUser?.token ? <Outlet/> : <Navigate to="/login"/>
}

export default ProtectedRouter