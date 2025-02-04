import React from 'react'
import {
    FiSearch,
    FiMessageSquare,
    FiBell,
    FiChevronDown,
  } from "react-icons/fi";

import { Link } from 'react-router-dom';

function Header({className}) {
  return (
    <header className={`border-b shadow-sm bg-white ${className}`}>
            <div className="w-full px-10 h-16 flex items-center justify-between fixed bg-gray-100 z-10">
            {/* Logo */}
            <Link to="/">
                <h1 className="text-4xl font-bold">
                    NXT
                </h1>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 ml-20">
                <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-[80%] pl-10 pr-4 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
                </div>
            </div>
            </div>
        </header>
  )
}

export default Header