import React, { useEffect, useState } from 'react'
import Navbar2 from '../Navbar2'
import Sidebar from './Sidebar'
import axios from 'axios';
import useSmallScreen from '../ui/SmallScreen';

function Main() {
    const [user, setUser] = useState(null);
    const isSmallScreen = useSmallScreen();
    const baseUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        async function fetchData(){
            const response = await axios.get(`${baseUrl}/api/v1/user/me`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUser(response.data.user);
        }
        fetchData();
    }, [])
    
    const date = user?.registration_date || null;
    const registration_date = date ? date.split("T")[0] : null;

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{background: 'linear-gradient(135deg, #0D47A1, #1565C0, #2196F3, #43A047)'}}>
        <div className='bg-black absolute h-screen w-screen opacity-20'></div>
        <Navbar2 />
        <div className='relative sm:pl-36 px-10 z-10  pt-12 flex items-center h-screen'>
            {!isSmallScreen && <Sidebar />}
            <main className='flex justify-center w-full flex-col items-center sm:px-20 text-white'>
                <h1 className='text-xl font-bold p-4 border-b border-b-white w-[80%] text-center'>
                    Personal Information
                </h1>
                <div className='flex flex-col gap-4 w-full'>
                    {/* Name Box */}
                    <div className='flex flex-col'>
                        <h3 className='font-semibold text-lg mb-2'>Name</h3>
                        <div className='bg-gray-100 text-black p-4 border-2 border-black rounded-lg'>
                        <p>{user? user.name : "Loading Name..."}</p>
                        </div>
                    </div>

                    {/* DOB Box */}
                    <div className='flex flex-col'>
                        <h3 className='font-semibold text-lg mb-2'>Registration Date</h3>
                        <div className='bg-gray-100 text-black p-4 border-2 border-black rounded-lg'>
                        <p>{user ? registration_date : "Loading Registration Date:"}</p>
                        </div>
                    </div>

                    {/* Phone Box */}
                    <div className='flex flex-col'>
                        <h3 className='font-semibold text-lg mb-2'>Phone</h3>
                        <div className='bg-gray-100 text-black p-4 border-2 border-black rounded-lg'>
                        <p>{user ? user.phone_number : "Loading Phone Number"}</p>
                        </div>
                    </div>

                    {/* Location Box */}
                    <div className='flex flex-col'>
                        <h3 className='font-semibold text-lg mb-2'>Pincode</h3>
                        <div className='bg-gray-100 text-black p-4 border-2 border-black rounded-lg'>
                        <p>{user ? user.pincode : "Loading Pin Code"}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
  )
}

export default Main