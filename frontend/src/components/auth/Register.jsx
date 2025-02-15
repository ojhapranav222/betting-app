import React from 'react'
import MagnetLines from '../ui/MagnetLines'
import { Link } from 'react-router-dom'
import SpotlightCard from '../ui/Spotlight'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function Register() {
    const [email, setEmail] = useState('');
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [pinCode, setPincode] = useState('');
    const [state, setState] = useState('')
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const baseUrl = import.meta.env.VITE_BACKEND_URL

    const cleanedFName = fName.trim().replace(/\s+/g, ' ').toLowerCase().replace(/^./, (str) => str.toUpperCase());
    const cleanedLName = lName.trim().replace(/\s+/g, ' ').toLowerCase().replace(/^./, (str) => str.toUpperCase());
    const fullName = `${cleanedFName} ${cleanedLName}`

    const formData = {
      email,
      name: fullName,
      phone,
      pincode: pinCode,
      state,
      password
  }

    async function handleSubmit(e){
        e.preventDefault();
        setErrorPassword('');

        console.log('form submit clicked')

        try{
            const response = await axios.post(`${baseUrl}/api/v1/user/register`, formData)
            console.log(formData)
            navigate('/login')
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <div className='h-screen w-screen flex items-center justify-around bg-red-950'>
        <div className='bg-black h-screen w-screen absolute bg-opacity-70'></div>
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
        <div className='relative flex flex-col items-end justify-around h-screen'>
            <div className='flex flex-col items-center -mt-12'>
              <img src="/register.png" alt="" className='h-64 relative -top-4 z-10' />
                
              <form className='rounded-3xl' onSubmit={handleSubmit}> 
                <SpotlightCard 
                  className="border border-white px-20 pt-12 rounded-lg -mt-28 flex flex-col gap-6" 
                  spotlightColor="rgba(255, 0, 0, 0.2)"
                >
                  <div className='flex gap-4'>
                    <input 
                      type="text" 
                      placeholder='First Name' 
                      className='bg-transparent border-b border-b-white outline-none text-white font-semibold z-10' 
                      value={fName} 
                      onChange={(e) => setFName(e.target.value)} 
                    />
                    <input 
                      type="text" 
                      placeholder='Last Name' 
                      className='bg-transparent border-b border-b-white outline-none text-white font-semibold z-10' 
                      value={lName} 
                      onChange={(e) => setLName(e.target.value)} 
                    />
                  </div>
                  <input 
                    type="text" 
                    placeholder='Phone Number' 
                    className='bg-transparent border-b border-b-white pb-2 outline-none text-white font-semibold' 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                  />
                  <input 
                    type="email" 
                    placeholder='Email' 
                    className='bg-transparent border-b border-b-white outline-none text-white font-semibold' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                  <div className='flex gap-4'>
                    <input 
                      type="text" 
                      placeholder='Pin Code' 
                      className='bg-transparent border-b border-b-white outline-none text-white font-semibold' 
                      value={pinCode} 
                      onChange={(e) => setPincode(e.target.value)} 
                    />
                    <input 
                      type="text" 
                      placeholder='State' 
                      className='bg-transparent border-b border-b-white outline-none text-white font-semibold' 
                      value={state} 
                      onChange={(e) => setState(e.target.value)} 
                    />
                  </div>
                  {errorPassword && <p className='text-red-500 text-xs font-semibold'>{errorPassword}</p>}
                  <input 
                    type="password" 
                    placeholder='Password' 
                    className='bg-transparent border-b border-b-white outline-none text-white font-semibold' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                  <p className='text-white text-sm font-semibold cursor-default text-center relative top-5'>
                    Already have an account? <Link to="/login" className='text-red-500 hover:underline cursor-pointer'>Login</Link>
                  </p>
                  <button 
                    type="submit" 
                    className="text-white py-2 font-semibold border border-white rounded-lg relative top-12 bg-[#150303] hover:bg-red-950 transition-all duration-300"
                  >
                    Submit
                  </button>
                </SpotlightCard>
              </form>  
            </div>
            <Link to="/" className='text-white font-semibold border border-white py-2 rounded-full hover:text-[#070b19] hover:bg-white transition-all duration-300 w-28 flex justify-center'>Back</Link>
        </div>
    </div>
  )
}

export default Register