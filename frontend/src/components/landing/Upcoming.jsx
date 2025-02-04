import React from 'react'
import Card from '../ui/Card'

function Upcoming() {
    const events = [
        { 
          country1: 'India', 
          country2: 'Australia', 
          point1: '1.98', 
          point2: '1.5', 
          isLive: true, 
          type: 'World Cup' 
        },
        { 
          country1: 'England', 
          country2: 'South Africa', 
          point1: '2.1', 
          point2: '1.8', 
          isLive: false, 
          startingIn: '3h 15m', 
          type: 'ODI Series' 
        },
        { 
          country1: 'Pakistan', 
          country2: 'New Zealand', 
          point1: '1.75', 
          point2: '2.05', 
          isLive: true, 
          type: 'T20 International' 
        },
        { 
          country1: 'Sri Lanka', 
          country2: 'Bangladesh', 
          point1: '1.95', 
          point2: '1.65', 
          isLive: false, 
          startingIn: '1h 45m', 
          type: 'Asia Cup' 
        }
      ];      
  return (
    <div className='bg-black px-20 py-12'>
        <h1 className='text-white text-center text-5xl font-bold'>Ucoming Matches</h1>
        <div className='grid grid-cols-2 grid-rows-2 gap-4 mt-8'>
            {events.map((event, index) => (
                <Card
                key={index}
                country1 = {event.country1}
                country2 = {event.country2}
                point1 = {event.point1}
                point2 = {event.point2}
                isLive = {event.isLive}
                type = {event.type}
                startingIn = {event.startingIn}
                />
            ))}
        </div>
    </div>
  )
}

export default Upcoming