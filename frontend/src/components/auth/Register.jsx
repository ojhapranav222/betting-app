import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useSmallScreen from '../ui/SmallScreen';

function Register() {
  const [email, setEmail] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [pinCode, setPincode] = useState('');
  const [state, setState] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const isSmallScreen = useSmallScreen();

  const formData = {
    email,
    name: `${fName.trim()} ${lName.trim()}`,
    phone,
    pincode: pinCode,
    state,
    password,
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    try {
      await axios.post(`${baseUrl}/api/v1/user/register`, formData);
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'An error occurred');
    }
  }

  return (
    <div className='h-screen w-screen flex items-center justify-center bg-white text-black'>
      <div className='w-full max-w-md p-8 space-y-6 bg-gray-100 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold text-center'>Register</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='flex gap-4'>
            <input 
              type='text' 
              placeholder='First Name' 
              className='w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black' 
              value={fName} 
              onChange={(e) => setFName(e.target.value)} 
            />
            <input 
              type='text' 
              placeholder='Last Name' 
              className='w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black' 
              value={lName} 
              onChange={(e) => setLName(e.target.value)} 
            />
          </div>
          <input 
            type='email' 
            placeholder='Email' 
            className='w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type='text' 
            placeholder='Phone Number' 
            className='w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black' 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
          />
          <div className='flex gap-4'>
            <input 
              type='text' 
              placeholder='Pin Code' 
              className='w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black' 
              value={pinCode} 
              onChange={(e) => setPincode(e.target.value)} 
            />
            <input 
              type='text' 
              placeholder='State' 
              className='w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black' 
              value={state} 
              onChange={(e) => setState(e.target.value)} 
            />
          </div>
          <input 
            type='password' 
            placeholder='Password' 
            className='w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          {error && <p className='text-red-500 text-sm'>{error}</p>}
          <button type='submit' className='w-full px-4 py-2 font-semibold border border-black rounded-md bg-black text-white hover:bg-gray-800 transition-all duration-300'>Submit</button>
        </form>
        <p className='text-center text-gray-600 text-sm'>
          Already have an account? <Link to='/login' className='text-black font-semibold hover:underline'>Login</Link>
        </p>
        <Link to='/' className='block text-center font-semibold border border-black py-2 rounded-md hover:bg-black hover:text-white transition-all duration-300'>Back</Link>
      </div>
    </div>
  );
}

export default Register;