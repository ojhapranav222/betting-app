import React from 'react'
import Navbar2 from './Navbar2'
import Events from './upcoming/Events'
import BetCard from './upcoming/BetCard'
import useSmallScreen from './ui/SmallScreen'

function UpcomingGames() {
  const isSmallScreen = useSmallScreen();
  return (
    <div className='relative w-full h-screen overflow-hidden'>
        <Navbar2 />
        <div className='flex justify-around items-start h-screen overflow-y-scroll'>
            <Events />
            {!isSmallScreen && <BetCard />}
        </div>
    </div>
  )
}

export default UpcomingGames