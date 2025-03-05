import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoWalletOutline } from "react-icons/io5";
import { FaBars, FaTimes } from "react-icons/fa";
import axios from 'axios';

function Navbar2() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropVisible, setDropVisible] = useState(false);
  const [dropWallet, setDropWallet] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [admin, setIsAdmin] = useState(false);
  const [user, setUser] = useState('U');
  const navigate = useNavigate();

  function toggleDropDown() {
    setDropVisible(!dropVisible);
  }

  function toggleDropWallet() {
    setDropWallet(!dropWallet);
  }

  function toggleMobileMenu() {
    setMenuOpen(!menuOpen);
  }

  useEffect(() => {
    const storedIsLoggedIn = !!localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');

    if (storedIsLoggedIn && storedUsername === 'admin') {
      setIsLoggedIn(true);
      setIsAdmin(true);
    } else if (storedIsLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/me`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUser(response.data.user);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  function handleLogout() {
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setMenuOpen(false);
    navigate('/');
  };

  const profileInitial = user?.name ? user.name[0].toUpperCase() : '';

  return (
    <nav className="w-full bg-opacity-10 bg-white shadow-md rounded-lg backdrop-blur-md h-[80px] flex justify-between items-center px-6 sm:px-10 fixed top-0 z-[99]">
      <Link to="/" className="uppercase font-bold text-black tracking-wider text-3xl">
        Nxt
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        {isLoggedIn ? (
          <>
            {admin && (
              <Link to="/admin/users" className="text-lg font-semibold text-black px-6 py-2 rounded-full hover:bg-gray-200 transition">
                Admin
              </Link>
            )}
            <Link to="/games" className="text-lg font-semibold text-black px-6 py-2 rounded-full hover:bg-gray-200 transition">
              Bet Now
            </Link>

            {/* Wallet Dropdown */}
            <div className="relative">
              <div className="text-black text-3xl cursor-pointer" onClick={toggleDropWallet}>
                <IoWalletOutline />
              </div>
              <span className="absolute -top-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                ₹{user?.balance}
              </span>
              <ul className={`absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg py-2 transform transition-all duration-300 ${
                dropWallet ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'
              }`}>
                <li className="text-black text-sm px-4 py-3 hover:bg-gray-100">Balance: ₹{user?.balance}</li>
                <Link to="/history"><li className="text-black text-sm px-4 py-3 hover:bg-gray-100">History</li></Link>
                <Link to="/deposit"><li className="text-black text-sm px-4 py-3 hover:bg-gray-100">Deposit</li></Link>
                <Link to="/withdraw"><li className="text-black text-sm px-4 py-3 hover:bg-gray-100">Withdraw</li></Link>
              </ul>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <div className="text-black bg-gray-500 text-xl font-semibold h-10 w-10 flex items-center justify-center rounded-full cursor-pointer" onClick={toggleDropDown}>
                {profileInitial}
              </div>
              <ul className={`absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg py-2 transform transition-all duration-300 ${
                dropVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'
              }`}>
                <Link to="/profile"><li className="text-black text-sm px-4 py-3 hover:bg-gray-100">Profile</li></Link>
                <li className="text-red-500 text-sm px-4 py-3 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          </>
        ) : (
          <div className="flex gap-4">
            <Link to="/login" className="text-lg font-semibold text-black px-6 py-2 rounded-full border border-black hover:bg-gray-200 transition">
              Login
            </Link>
            <Link to="/register" className="text-lg font-semibold text-white bg-black px-6 py-2 rounded-full hover:bg-gray-800 transition">
              Register
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      {isLoggedIn && (
        <div className="sm:hidden flex items-center">
          {menuOpen ? (
            <FaTimes className="text-2xl cursor-pointer text-black" onClick={toggleMobileMenu} />
          ) : (
            <FaBars className="text-2xl cursor-pointer text-black" onClick={toggleMobileMenu} />
          )}
        </div>
      )}

      {/* Mobile Menu with Animation */}
      <div className={`sm:hidden absolute top-[80px] left-0 w-full bg-white shadow-md rounded-lg p-6 flex flex-col gap-4 transition-all duration-300 ${
        menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'
      }`}>
        {isLoggedIn ? (
          <>
            {admin && <Link to="/admin/users" className="text-lg font-semibold text-black">Admin</Link>}
            <Link to="/games" className="text-lg font-semibold text-black">Bet Now</Link>
            <Link to="/bets" className='text-lg font-semibold text-black'>My Bets</Link>
            <Link to="/history" className="text-lg font-semibold text-black">History</Link>
            <Link to="/deposit" className="text-lg font-semibold text-black">Deposit</Link>
            <Link to="/withdraw" className="text-lg font-semibold text-black">Withdraw</Link>
            <button className="text-lg font-semibold text-red-500" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-lg font-semibold text-black border px-6 py-2 rounded-full text-center">Login</Link>
            <Link to="/register" className="text-lg font-semibold text-white bg-black px-6 py-2 rounded-full text-center">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar2;