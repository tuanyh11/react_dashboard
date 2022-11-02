import React, { createContext, useContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode'

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#03C9D7');
  const [currentMode, setCurrentMode] = useState('Light');
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))) 

  const logout = () => {
    localStorage.clear()
    setUser()
  }


  const login = (data) => {
    localStorage.setItem("user", JSON.stringify(data))
    setUser(data)
  }

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  useEffect(() => {
    if(user?.token) {
     const {exp} = jwt_decode(user.token)
     if(exp * 1000 < new Date().getTime()) {
      setUser()
      localStorage.clear()
     }
    }
  }, [])

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  const handleClick = (clicked, cancel) => setIsClicked({ ...initialState, [clicked]: cancel || true });

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={{ currentColor, currentMode, activeMenu, screenSize, setScreenSize, handleClick, isClicked, initialState, setIsClicked, setActiveMenu, setCurrentColor, setCurrentMode, setMode, setColor, themeSettings, setThemeSettings, logout, user, setUser, login }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
