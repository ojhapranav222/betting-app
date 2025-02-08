import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import axios from 'axios';

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('/sampleData/events.json')
      .then((response) => {
        const jsonData = response.data; // Static data from events.json
        // Retrieve user-added games stored separately in localStorage
        const storedUserGamesStr = localStorage.getItem('userAddedGames');
        const userAddedGames = storedUserGamesStr ? JSON.parse(storedUserGamesStr) : [];
    
        // Optionally reverse user-added games if desired
        const reversedUserGames = userAddedGames.slice().reverse();
    
        // Merge user-added games with the static data (order as needed)
        const combinedData = [...reversedUserGames, ...jsonData];
    
        // Update state (and note: we're not storing the combined data back)
        setEvents(combinedData);
      })
      .catch((error) => {
        console.error("Error fetching game data:", error);
      });
  }, []);  

  return (
    <div className='mt-24 w-[50%] h-screen overflow-y-scroll overflow-x-hidden'>
        <h1 className='text-white text-center mb-8 font-bold text-3xl'>Upcoming Events</h1>
        <div className='flex flex-col gap-4 pb-36'>
            {events ? ( events.map((event, index) => (
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
            ))) : (<p className='text-white text-center'>No upcoming or live games at this moment</p>)}
        </div>
    </div>
  )
}

export default Events