import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar({ className }) {
  return (
    <div className={`bg-white border-r border-r-black text-black w-64 p-6 flex flex-col ${className}`}>
      <ul className='flex flex-col text-lg gap-6'>
        <NavLink 
          to='/profile' 
          className={({ isActive }) => 
            `py-2 px-4 rounded-md transition-all ${isActive ? 'bg-black text-white font-semibold' : 'hover:bg-gray-200'}`
          }
        >
          My Profile
        </NavLink>
        <NavLink 
          to='/history' 
          className={({ isActive }) => 
            `py-2 px-4 rounded-md transition-all ${isActive ? 'bg-black text-white font-semibold' : 'hover:bg-gray-200'}`
          }
        >
          Deposit History
        </NavLink>
        <NavLink 
          to='/history' 
          className={({ isActive }) => 
            `py-2 px-4 rounded-md transition-all ${isActive ? 'bg-black text-white font-semibold' : 'hover:bg-gray-200'}`
          }
        >
          Withdrawal History
        </NavLink>
        <NavLink 
          to='/history' 
          className={({ isActive }) => 
            `py-2 px-4 rounded-md transition-all ${isActive ? 'bg-black text-white font-semibold' : 'hover:bg-gray-200'}`
          }
        >
          Wallet Transaction History
        </NavLink>
      </ul>
    </div>
  );
}

export default Sidebar;