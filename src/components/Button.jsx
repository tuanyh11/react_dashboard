import React from 'react';
import {useNavigate} from "react-router-dom"

import { useStateContext } from '../contexts/ContextProvider';

const Button = ({ icon, bgColor, color, bgHoverColor, size, text, borderRadius, width }) => {
  const { setIsClicked, initialState } = useStateContext();

  const nav = useNavigate()

  const handleLogout = () => { 
    localStorage.clear()
    nav("/login")
  }

  return (
    <button
      type="button" 
      onClick={() => handleLogout()}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
