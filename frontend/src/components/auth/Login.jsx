import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useSmallScreen from '../ui/SmallScreen';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const isSmallScreen = useSmallScreen();
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/api/v1/user/login`, {
        email: username,
        password,
      }, { withCredentials: true });
  
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      if (response.data.user.role === 'admin'){
        localStorage.setItem('username', 'admin');
      }
      navigate('/');
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error);
      setError(error.response?.data?.message || 'An error occurred');
    }
  }
  
  return (
    <div className='h-screen w-screen flex items-center justify-center bg-white text-black'>
      <div className='w-full max-w-md p-8 space-y-6 bg-gray-100 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold text-center'>Login</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <input 
              type='text' 
              placeholder='Username' 
              className='w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black' 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>
          <div>
            <input 
              type='password' 
              placeholder='Password' 
              className='w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          {error && <p className='text-red-500 text-sm'>{error}</p>}
          <button type='submit' className='w-full px-4 py-2 font-semibold border border-black rounded-md bg-black text-white hover:bg-gray-800 transition-all duration-300'>Submit</button>
        </form>
        <p className='text-center text-gray-600 text-sm'>
          Don't have an account? <Link to='/register' className='text-black font-semibold hover:underline'>Register</Link>
        </p>
        <Link to='/' className='block text-center font-semibold border border-black py-2 rounded-md hover:bg-black hover:text-white transition-all duration-300'>Back</Link>
      </div>
    </div>
  );
}

export default Login;