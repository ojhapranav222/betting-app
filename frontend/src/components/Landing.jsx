import React from 'react'
import Main from './landing/Main'
import Features from './landing/Features'
import Upcoming from './landing/Upcoming'

function Landing() {
  return (
    <div className='flex flex-col'>
        <Main />
        <Features />
    </div>
  )
}

export default Landing