import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';

import { useStateContext } from './contexts/ContextProvider';
import {privateRoutes, publicRoutes} from './router'
import { USER} from './config/CONST';
import { ProtectedRouter } from './components';
import EmptyLayout from './Layout/EmptyLayout';
import { Login } from './pages';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode} = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  console.log(USER)

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        

          <Routes>
            <Route element={<ProtectedRouter/>}>
              {
                privateRoutes.map((route, index) => {

                  const Layout = route.layout
                  const Element = route.element
                  const path = route.path
                  return <Route path={path} key={index} element={<Layout><Element/></Layout>} />
                }) 
              }
            </Route>
            {/* {
              publicRoutes.map((route, index) => {
                const Layout = route.layout
                const Element = route.element
                const path = route.path
                return 
              })
            } */}
            <Route path={'/login'} element={USER ? <Navigate to={'/'}/> : <EmptyLayout><Login/></EmptyLayout>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
