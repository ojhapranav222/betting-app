import React, { useState } from 'react';
import MagnetLines from '../ui/MagnetLines';
import { Link, useNavigate } from 'react-router-dom';
import SpotlightCard from '../ui/Spotlight';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === 'admin' && password == '1234') { 
      localStorage.setItem('username', username); 
      localStorage.setItem('isLoggedIn', true); 
      navigate('/');
    } else if (username === 'admin' && password != '1234'){
        alert('Invalid password');
    } else {
      localStorage.setItem('isLoggedIn', true)
      navigate('/')
    }
  };

  return (
    <div className='h-screen w-screen flex items-center justify-around bg-blue-950'>
      <div className='bg-black h-screen w-screen absolute bg-opacity-70'></div>
      <div className='relative flex flex-col justify-around h-screen'>
        <div className='flex flex-col items-center h-[calc(0.7*100vh)]'>
          <img src="/login.png" alt="" className='h-80 z-10' />
          <form className='rounded-3xl' onSubmit={handleSubmit}> 
            <SpotlightCard className='border border-white px-20 pt-8 rounded-lg -mt-28 flex flex-col gap-4' spotlightColour="rgba(0, 0, 255, 0.25)">
              <input 
                type="text" 
                placeholder='Username' 
                className='bg-transparent border-b relative z-10 border-b-white pb-2 outline-none text-white font-semibold' 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
              />
              <input 
              type="password" 
              placeholder='Password' 
              className='bg-transparent border-b border-b-white outline-none relative z-10 text-white font-semibold' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}  /> 
              <p className='text-white text-sm font-semibold cursor-default relative top-5 mb-0'>Don't have an account? <Link to="/register" className='text-blue-500 hover:underline cursor-pointer'>Register</Link></p>
              <button className='text-white mt-0 px-4 py-2 font-semibold border border-white rounded-lg relative top-12 bg-[#070b19] hover:bg-blue-950 transition-all duration-300'>Submit</button>
            </SpotlightCard>
          </form>
        </div>
        <Link to="/" className='text-white font-semibold border border-white py-2 rounded-full hover:text-[#070b19] hover:bg-white transition-all duration-300 w-28 flex justify-center'>Back</Link>
      </div>
      <div>
        <MagnetLines
          rows={10}
          columns={9}
          containerSize="70vmin"
          lineColor="tomato"
          lineWidth="0.8vmin"
          lineHeight="7vmin"
          baseAngle={0}
          style={{ margin: "2rem auto" }}
        />
      </div>
    </div>
  );
}

export default Login;