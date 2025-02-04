import React from 'react'
import Navbar2 from '../Navbar2'
import Sidebar from './Sidebar'

function Transactions() {
  return (
    <div className="relative w-full h-screen overflow-hidden" style={{background: 'linear-gradient(135deg, #0D47A1, #1565C0, #2196F3, #43A047)'}}>
        <div className='bg-black absolute h-screen w-screen opacity-20'></div>
        <Navbar2 />
        <div className='relative pl-36 z-10 pt-12 flex items-center h-screen'>
            <Sidebar />
            <main className='px-20 text-white w-full flex flex-col gap-6 justify-start items-center'>
                <h1 className='text-5xl font-bold mt-10 p-4'>
                    Transactions
                </h1>
                <p>No transactions made until now.</p>
            </main>
        </div>
    </div>
  )
}

export default Transactions