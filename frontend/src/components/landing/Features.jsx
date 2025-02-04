import React from 'react'
import GradientText from '../ui/GradientText'
import { AiOutlineThunderbolt } from "react-icons/ai";
import { CiMobile1 } from "react-icons/ci";
import { VscGraph } from "react-icons/vsc";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

function Features() {
  return (
    <div className='bg-black'>
        <h1 className="text-5xl font-bold gap-2 text-white text-center">Why
            <GradientText
            colors={["#40ffaa", "#FFC107", "#FFEB3B", "#FF5722", "#FDD835"]}
            animationSpeed={3}
            showBorder={false}
            className="custom-class uppercase px-6 py-1 font-bold"
            >
            NXT Gamer?
            </GradientText>
        </h1>
        <div className='grid grid-cols-2 grid-rows-2 mt-4 py-6 gap-y-24 text-white'>
            <div className='flex flex-col justify-center text-center items-center gap-4'>
                <div className='text-5xl text-green-500 h-20 w-20 flex justify-center items-center rounded-full bg-green-500 bg-opacity-10'><AiOutlineThunderbolt /></div>
                <h2 className='text-xl font-bold'>Instant Payouts</h2>
                <p className='text-sm text-gray-400'>Withdraw your winnings instantly to your preferred payment method</p>
            </div>
            <div className='flex flex-col justify-center text-center items-center gap-4'>
                <div className='text-5xl text-green-500 h-20 w-20 flex justify-center items-center rounded-full bg-green-500 bg-opacity-10'><VscGraph /></div>
                <h2 className='text-xl font-bold'>Best Odds</h2>
                <p className='text-sm text-gray-400'>Get competitive odds across all cricket matches and tournaments</p>
            </div>
            <div className='flex flex-col justify-center text-center items-center gap-4'>
                <div className='text-5xl text-green-500 h-20 w-20 flex justify-center items-center rounded-full bg-green-500 bg-opacity-10'><IoShieldCheckmarkOutline /></div>
                <h2 className='text-xl font-bold'>Secure Platform</h2>
                <p className='text-sm text-gray-400'>Your funds and personal information are protected with advanced security</p>
            </div>
            <div className='flex flex-col justify-center text-center items-center gap-4'>
                <div className='text-5xl text-green-500 h-20 w-20 flex justify-center items-center rounded-full bg-green-500 bg-opacity-10'><CiMobile1 /></div> 
                <h2 className='text-xl font-bold'>Mobile Betting</h2>
                <p className='text-sm text-gray-400'>Bet on your favorite matches anytime, anywhere with our mobile platform</p>
            </div>
        </div>
    </div>
  )
}

export default Features