import React, { useState } from 'react'
import Navbar2 from '../Navbar2'
import Sidebar from './Sidebar'

function Password() {
    const [isVerified, setIsVerified] = useState(false)
  return (
    <div className="relative w-full h-screen overflow-hidden" style={{background: 'linear-gradient(135deg, #0D47A1, #1565C0, #2196F3, #43A047)'}}>
        <div className='bg-black absolute h-screen w-screen opacity-20'></div>
        <Navbar2 />
        <div className='relative pl-36 z-10 pt-12 flex items-center h-screen'>
            <Sidebar />
            <main className='px-20 text-white w-[70%] -mt-5'>
                <h1 className='text-xl font-bold mt-10 p-4'>
                    Change Password
                </h1>
                <div className='flex flex-col gap-4'>
                    {/* Email Box */}
                    <form>
                        <div className='flex flex-col'>
                            <h3 className='font-semibold text-lg mb-2'>E-mail</h3>
                            <div className='bg-gray-100 text-black p-4 border-2 border-black rounded-lg'>
                            <p>pansy12@gmail.com</p>
                            </div>
                        </div>

                        {/* Current Password Box */}
                        <div className='flex flex-col'>
                            <h3 className='font-semibold text-lg mb-2 mt-4'>Current Password</h3>
                            <div className='flex'>
                                <input 
                                    type="password" 
                                    placeholder='Your current password' 
                                    className='p-4 w-full border-2 border-black rounded-lg'
                                />
                                <button className='ml-4 p-4 text-white bg-[#0d99ff] rounded-md hover:bg-[#0066cc] transition-all duration-200'>
                                    {isVerified ? 'Lock' : 'Verify'}
                                </button>
                            </div>
                        </div>
                    </form>

                    
                    <form>
                        {/* New Password Box */}
                        <div className='flex flex-col'>
                            <h3 className='font-semibold text-lg mb-2'>New Password</h3>
                            <input 
                                type="password" 
                                placeholder='Enter new password' 
                                className= {`p-4 placeholder:text-white w-full border-2 border-black rounded-lg ${!isVerified ? 'cursor-not-allowed' : 'cursor-text'}`}
                                disabled = {!isVerified}
                            />
                        </div>

                        {/* Confirm Password Box */}
                        <div className='flex flex-col'>
                            <h3 className='font-semibold mt-4 text-lg mb-2'>Confirm Password</h3>
                            <input 
                                type="password" 
                                placeholder='Re-enter your password' 
                                className= {`p-4 placeholder:text-white w-full border-2 border-black rounded-lg ${!isVerified ? 'cursor-not-allowed' : 'cursor-text'}`}
                                disabled = {!isVerified}
                            />
                        </div>

                        <button type='submit' className={`bg-[#0D99FF] mt-8 hover:bg-[#0066cc] transition-all duration-200 text-white p-2 px-6 w-[100px] rounded-md text-center ${!isVerified ? 'cursor-not-allowed bg-gray-500 hover:bg-gray-500' : 'cursor-pointer'}`}>
                            Save
                        </button>
                    </form>
                </div>
            </main>
        </div>
    </div>
  )
}

export default Password