import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoWalletOutline } from "react-icons/io5";
import axios from 'axios';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropVisible, setDropVisible] = useState(false);
  const [dropWallet, setDropWallet] = useState(false);
  const [admin, setIsAdmin] = useState(false)
  const [user, setUser] = useState({})

  function toggleDropDown() {
    setDropVisible(!dropVisible);
  }

  function toggleDrowWallet(){
    setDropWallet(!dropWallet);
  }

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');

    setIsLoggedIn(!!localStorage.getItem('token'))

    if (storedUsername === 'admin') {
      setIsAdmin(true);
    }
  }, [])

  const profileInitial = user?.name ? user.name[0].toUpperCase() : '';

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token'); // Ensure token is stored
        if (!token) {
          console.error("No token found, user might not be logged in.");
          return;
        }
  
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error.response?.data || error.message);
      }
    }
  
    fetchData();
  }, []);  

  function handleLogout() {
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  return (
    <div className="w-full bg-opacity-10 bg-black rounded-lg backdrop-blur-md h-[80px] flex sm:justify-between justify-around items-center sm:px-10 fixed top-0 z-[99]">
      <h1 className="uppercase font-bold cursor-pointer text-white tracking-wider text-3xl" onClick={() => setIsLoggedIn((prev) => !prev)}>Nxt</h1>
      {isLoggedIn ? (
        <div className='flex gap-12 items-center'>
            {admin && (<Link to='/admin/dashboard' className='text-xl font-semibold text-white cursor-pointer px-6 py-2 rounded-full hover:text-black hover:bg-white transition-all duration-300'>Admin</Link>)}
          <Link to='/upcoming' className='text-xl font-semibold text-white cursor-pointer px-6 py-2 rounded-full hover:text-black hover:bg-white transition-all duration-300'>Upcoming Games</Link>
          <Link to='/upcoming' className='text-xl font-semibold text-white cursor-pointer px-6 py-2 rounded-full hover:text-black hover:bg-white transition-all duration-300'>Live Games</Link>
          <div className='text-white text-3xl cursor-pointer' onClick={toggleDrowWallet}>
            <IoWalletOutline />
          </div>
          {dropWallet && ( 
            <ul className='bg-white absolute top-20 rounded-xl right-24'>
              <li className='text-black text-sm cursor-pointer p-4 hover:underline'>Balance: {user.balance}</li>
              <li className='text-black text-sm cursor-pointer p-4 hover:underline'>History</li>
              <li className='text-black text-sm cursor-pointer p-4 hover:underline'>
                <Link to='/deposit'>Deposit</Link>
              </li>
              <li className='text-black text-sm cursor-pointer p-4 hover:underline'>
                <Link to='/withdraw'>Withdraw</Link>\
              </li>
            </ul>
          )}
          <div className='text-white bg-gray-500 text-xl font-semibold h-5 w-5 flex items-center justify-center p-6 rounded-full cursor-pointer' onClick={toggleDropDown}> 
            <p>{profileInitial}</p> 
          </div>
          {dropVisible && ( 
            <ul className='bg-white absolute top-20 rounded-xl right-6'>
              <Link to='/profile'><li className='text-black text-sm cursor-pointer p-4 hover:underline'>Profile</li></Link>
              <li className='text-red-500 text-sm cursor-pointer p-4 hover:underline' onClick={handleLogout}>Logout</li>
            </ul>
          )}
        </div>
      ) : (
        <div className='text-white flex justify-between w-[20%]'>
          <Link to='/login' className='text-xl font-semibold border border-white px-6 py-2 rounded-full hover:text-black hover:bg-white transition-all duration-300'>Login</Link>
          <Link to='/register' className='text-xl font-semibold border border-white px-6 py-2 rounded-full hover:text-black hover:bg-white transition-all duration-300'>Register</Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;