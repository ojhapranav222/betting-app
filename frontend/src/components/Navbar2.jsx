import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoWalletOutline } from "react-icons/io5";
import axios from 'axios';

function Navbar2() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropVisible, setDropVisible] = useState(false);
  const [dropWallet, setDropWallet] = useState(false);
  const [admin, setIsAdmin] = useState(false)
  const [user, setUser] = useState('U')

  function toggleDropDown() {
    setDropVisible(!dropVisible);
  }

  function toggleDrowWallet(){
    setDropWallet(!dropWallet);
  }

  useEffect(() => {
    const storedIsLoggedIn = !!localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');

    if (storedIsLoggedIn === true && storedUsername === 'admin') {
      setIsLoggedIn(true);
      setIsAdmin(true);
    } else if (storedIsLoggedIn === true) {
      setIsLoggedIn(true);
    }
  }, [])

  useEffect(() => {
    async function fetchData() {
      try{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/me`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        setUser(response.data.user)
      } catch(err){
        console.log(err)
      }
    }

    fetchData()
  }, [])

  function handleLogout() {
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  const profileInitial = user?.name ? user.name[0].toUpperCase() : '';


  return (
    <div className="w-full bg-opacity-10 bg-black rounded-lg backdrop-blur-md h-[80px] flex sm:justify-between justify-around items-center sm:px-10 fixed top-0 z-[99]">
      <Link to='/' className="uppercase font-bold cursor-pointer text-white tracking-wider text-3xl mr-12">Nxt</Link>
      {isLoggedIn ? (
        <div className='flex gap-12 items-center'>
            {admin && (<Link to='/admin/dashboard' className='text-xl font-semibold text-white cursor-pointer px-6 py-2 rounded-full hover:text-black hover:bg-white transition-all duration-300'>Admin</Link>)}
          <Link to='/games' className='text-xl font-semibold text-white cursor-pointer px-6 py-2 rounded-full hover:text-black hover:bg-white transition-all duration-300'>Bet Now</Link>
          <div className="relative">
            <div className="text-white text-3xl cursor-pointer" onClick={toggleDrowWallet}>
              <IoWalletOutline />
            </div>
            <span className="absolute -top-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              ₹{user?.balance}
            </span>
          </div>
          {dropWallet && ( 
            <ul className='bg-white absolute top-20 rounded-xl right-24'>
              <li className='text-black text-sm cursor-pointer p-4 hover:underline'>Balance: {user?.balance}</li>
              <Link to='/history'>
                <li className='text-black text-sm cursor-pointer p-4 hover:underline'>History</li>
              </Link>
              <Link to='/deposit'>
                <li className='text-black text-sm cursor-pointer p-4 hover:underline'>Deposit</li>
              </Link>
              <li className='text-black text-sm cursor-pointer p-4 hover:underline'>
                <Link to='/withdraw'>Withdraw</Link>
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

export default Navbar2;