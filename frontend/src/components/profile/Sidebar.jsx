import React from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar({className}) {
  return (
    <div className={`border-r border-r-white pr-24 flex flex-col items-center ${className}`} >
        <div className='h-24 w-24 bg-pink-800 text-white rounded-full text-4xl font-semibold flex items-center justify-center'>P</div>
        <ul className='flex flex-col text-black text-xl gap-4 mt-6 text-center'>
            <NavLink 
                to="/profile" 
                className={({ isActive }) => 
                `border-b-2 border-r-2 ${isActive ? 'border-black py-1' : 'border-transparent'}` 
                }
            >
                My Profile
            </NavLink>
            <NavLink 
                to="/history" 
                className={({ isActive }) => 
                `border-b-2 border-r-2 ${isActive ? 'border-black' : 'border-transparent'}` 
                }
            >
                Deposit History
            </NavLink>
            <NavLink 
                to="/history" 
                className={({ isActive }) => 
                `border-b-2 border-r-2 ${isActive ? 'border-black' : 'border-transparent'}` 
                }
            >
                Withdrawal History
            </NavLink>
            <NavLink 
                to="/history" 
                className={({ isActive }) => 
                `border-b-2 border-r-2 ${isActive ? 'border-black' : 'border-transparent'}` 
                }
            >
                Wallet Transaction History
            </NavLink>
        </ul>
    </div>
  )
}

export default Sidebar