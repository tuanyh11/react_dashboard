import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Ecommerce, Orders, Calendar, Employees, Stacked, Pyramid, Customers, Kanban, Line, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor } from './pages';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';
import Login from './pages/Login';
import {privateRoutes, publicRoutes} from './router'
import { USER_INFO } from './config/CONST';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

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
          {USER_INFO &&
            privateRoutes.map((route, index) => {

              const Layout = route.layout
              const Element = route.element
              const path = route.path
              return <Route path={path} key={index} element={<Layout><Element/></Layout>} />
            }) 
          }
          {
            publicRoutes.map((route, index) => {
              const Layout = route.layout
              const Element = route.element
              const path = route.path
              return <Route path={path} key={index} element={USER_INFO && path === '/login' ? <Navigate to={'/'}/> : <Layout><Element/></Layout>} />
            })
          }
          <Route path={'*'}  element={!USER_INFO  && <Navigate to={'/login'}/>} />
          <Route path={'*'}  element={USER_INFO  && <Navigate to={'/'}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
