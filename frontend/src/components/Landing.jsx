import React from 'react'
import Main from './landing/Main'
import Features from './landing/Features'
import Upcoming from './landing/Upcoming'
import Ratings from './landing/Rating'
import ReviewSection from './landing/Review'
import useSmallScreen from './ui/SmallScreen'

function Landing() {
  const isSmallScreen = useSmallScreen()
  return (
    <div className='flex flex-col'>
        <Main />
        <Features />
        <Ratings />
        {!isSmallScreen && <ReviewSection />}
    </div>
  )
}

export default Landing