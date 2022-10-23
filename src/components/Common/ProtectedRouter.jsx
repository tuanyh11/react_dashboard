import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { USER } from '../../config/CONST'

const ProtectedRouter = () => {
    console.log(USER?.token)
  return USER?.token ? <Outlet/> : <Navigate to="/login"/>
}

export default ProtectedRouter