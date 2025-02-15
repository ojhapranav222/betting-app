import React from 'react'
import Navbar2 from './Navbar2'
import Events from './upcoming/Events'
import BetCard from './upcoming/BetCard'

function UpcomingGames() {
  return (
    <div className='bg-black relative w-full h-screen overflow-hidden'>
        <Navbar2 />
        <div className='flex justify-around items-start h-screen overflow-y-scroll'>
            <Events />
            <BetCard />
        </div>
    </div>
  )
}

export default UpcomingGames