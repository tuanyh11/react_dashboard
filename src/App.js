import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import './App.css';

import { useStateContext } from './contexts/ContextProvider';
import {privateRoutes, publicRoutes} from './router'
import { ProtectedRouter } from './components';
import EmptyLayout from './Layout/EmptyLayout';
import { Login } from './pages';


const App = () => {

  const { setCurrentColor, setCurrentMode, currentMode, user} = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);



  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        

          <Routes>
            <Route element={<ProtectedRouter Element={user ? <Outlet/> :  <Navigate to={'/login'}/>}/>}>
              {
                privateRoutes.map((route, index) => {

                  const Layout = route.layout
                  const Element = route.element
                  const path = route.path
                  return <Route path={path} key={index} element={<Layout><Element/></Layout>} />
                }) 
              }
            </Route>
            <Route path={'/login'} element={<ProtectedRouter Element={user ?  <Navigate to={'/'}/> : <EmptyLayout><Login/></EmptyLayout>}/>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
