import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { links } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import { RiArrowDownSLine } from 'react-icons/ri';

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();

  const [dropdown, setDropdown] = useState({
    name: '',
    isOn: false
  })

  const handleCloseSideBar = (isHasChild, name) => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }

      setDropdown(pre => pre.name === name ? {...pre, isOn: !pre.isOn}: {isOn: true, name: name})
    
  };





  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link to="/" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
              <SiShopware /> <span>Shoppy</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10 ">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <div key={link.name}>
                    <NavLink
                      to={`/${link.path}`}
                      onClick={() => handleCloseSideBar(link?.items, link.path)}
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? currentColor : '',
                      })}
                      className={({ isActive }) => (isActive ? activeLink : normalLink)}
                    >
                      <div className='flex items-center'>
                        {link.icon}
                        <span className="capitalize ml-2">{link.name}</span>
                      </div>
                      {link?.items && <div className='ml-auto px-4 text-lg'><RiArrowDownSLine/></div>}
                    </NavLink>
                    {link?.items && dropdown.name === link.name && dropdown.isOn  && 
                     <div className='text-start pl-6 capitalize text-sm'>
                      {link.items.map((item, i) => 
                        <NavLink
                          to={`/${item.path}`}
                          key={i}
                          style={({ isActive }) => ({
                          backgroundColor: isActive ? currentColor : '',
                          })}
                          className={({ isActive }) => (` ${isActive ? activeLink : normalLink}`)}
                         >
                          {item.name}
                         </NavLink> 
                      )}
                     </div>
                    }
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
