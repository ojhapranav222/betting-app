import React from 'react'
import Card from '../ui/Card';

function Events() {
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
        },
        { 
          country1: 'West Indies', 
          country2: 'Afghanistan', 
          point1: '1.8', 
          point2: '1.7', 
          isLive: true, 
          type: 'T20I Series' 
        },
        { 
          country1: 'South Africa', 
          country2: 'England', 
          point1: '1.6', 
          point2: '2.2', 
          isLive: false, 
          startingIn: '2h 30m', 
          type: 'Test Series' 
        },
        { 
          country1: 'India', 
          country2: 'New Zealand', 
          point1: '2.05', 
          point2: '1.55', 
          isLive: true, 
          type: 'ODI Series' 
        },
        { 
          country1: 'Australia', 
          country2: 'Pakistan', 
          point1: '1.7', 
          point2: '2.1', 
          isLive: false, 
          startingIn: '1h 15m', 
          type: 'T20 World Cup' 
        },
        { 
          country1: 'Sri Lanka', 
          country2: 'India', 
          point1: '1.85', 
          point2: '1.6', 
          isLive: true, 
          type: 'Asia Cup' 
        },
        { 
          country1: 'England', 
          country2: 'West Indies', 
          point1: '1.5', 
          point2: '2.5', 
          isLive: false, 
          startingIn: '4h 00m', 
          type: 'ODI Series' 
        },
        { 
          country1: 'New Zealand', 
          country2: 'South Africa', 
          point1: '1.9', 
          point2: '1.7', 
          isLive: true, 
          type: 'Test Series' 
        },
        { 
          country1: 'Australia', 
          country2: 'England', 
          point1: '1.65', 
          point2: '2.15', 
          isLive: false, 
          startingIn: '3h 45m', 
          type: 'ODI Series' 
        },
        { 
          country1: 'Pakistan', 
          country2: 'India', 
          point1: '1.8', 
          point2: '1.7', 
          isLive: true, 
          type: 'T20 International' 
        }
      ];
  return (
    <div className='mt-24 w-[50%] h-screen overflow-y-scroll overflow-x-hidden'>
        <h1 className='text-white text-center mb-8 font-bold text-3xl'>Upcoming Events</h1>
        <div className='flex flex-col gap-4 pb-36'>
            {events.map((event, index) => (
                <Card
                key={index}
                country1={event.country1}
                country2={event.country2}
                point1={event.point1}
                point2={event.point2}
                isLive={event.isLive}
                startingIn={event.startingIn}
                type={event.type}
                />
            ))}
        </div>
    </div>
  )
}

export default Events