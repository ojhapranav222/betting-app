import React from 'react'
import Navbar2 from '../Navbar2'
import Sidebar from './Sidebar'

function Main() {
  return (
    <div className="relative w-full h-screen overflow-hidden" style={{background: 'linear-gradient(135deg, #0D47A1, #1565C0, #2196F3, #43A047)'}}>
        <div className='bg-black absolute h-screen w-screen opacity-20'></div>
        <Navbar2 />
        <div className='relative pl-36 z-10  pt-12 flex items-center h-screen'>
            <Sidebar />
            <main className='flex justify-center w-full flex-col items-center px-20 text-white'>
            <h1 className='text-xl font-bold p-4 border-b border-b-white w-[80%] text-center'>
                    Personal Information
                </h1>
                <div className='flex flex-col gap-4 w-full'>
                    {/* Name Box */}
                    <div className='flex flex-col'>
                        <h3 className='font-semibold text-lg mb-2'>Name</h3>
                        <div className='bg-gray-100 text-black p-4 border-2 border-black rounded-lg'>
                        <p>Pany Parkinson</p>
                        </div>
                    </div>

                    {/* DOB Box */}
                    <div className='flex flex-col'>
                        <h3 className='font-semibold text-lg mb-2'>DOB</h3>
                        <div className='bg-gray-100 text-black p-4 border-2 border-black rounded-lg'>
                        <p>31 July</p>
                        </div>
                    </div>

                    {/* Phone Box */}
                    <div className='flex flex-col'>
                        <h3 className='font-semibold text-lg mb-2'>Phone</h3>
                        <div className='bg-gray-100 text-black p-4 border-2 border-black rounded-lg'>
                        <p>+91 XXXXX XXXXX</p>
                        </div>
                    </div>

                    {/* Location Box */}
                    <div className='flex flex-col'>
                        <h3 className='font-semibold text-lg mb-2'>Location</h3>
                        <div className='bg-gray-100 text-black p-4 border-2 border-black rounded-lg'>
                        <p>London, UK</p>
                        </div>
                    </div>

                    <div className='bg-[#0D99FF] text-white p-2 px-6 w-[100px] rounded-md text-center'>
                        Save
                    </div>
                </div>
            </main>
        </div>
    </div>
  )
}

export default Main