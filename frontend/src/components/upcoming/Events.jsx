import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import axios from 'axios';
import QuickBetModal from '../ui/QuickBetModal';

function Events() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState(null);

  function openModal(event){
      setSelectedEvent(event);
      setIsModalOpen(true);
  };
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios.get(`${baseUrl}/api/v1/game/all`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching game data:", error);
      });
  }, []);

  return (
    <div className='mt-24 w-[50%] h-screen overflow-y-scroll overflow-x-hidden'>
        <h1 className='text-white text-center mb-8 font-bold text-3xl'>Upcoming & Live Matches</h1>
        <div className='flex flex-col gap-4 pb-36'>
    {events ? (
        events.games?.map((event, index) => (
            event.bet ? (
              <>
                <Card
                    country1={event.team_a}
                    country2={event.team_b}
                    point1={event.odds_team_a}
                    point2={event.odds_team_b}
                    isLive={event.is_live}
                    startingIn={event.start_time.split("T")[1].split("Z")[0]}
                    type={event.match_name}
                    onCardClick={() => openModal(event)}
                />
              </>
            ) : (
                <div key={index} className="cursor-not-allowed opacity-50">
                    <Card
                        country1={event.team_a}
                        country2={event.team_b}
                        point1={event.odds_team_a}
                        point2={event.odds_team_b}
                        isLive={event.is_live}
                        startingIn={event.start_time.split("T")[1].split("Z")[0]}
                        type={event.match_name}
                    />
                </div>
            )
        ))
    ) : (
        <p className='text-white text-center'>No upcoming or live games at this moment</p>
    )}
</div>
{isModalOpen && selectedEvent && (
      <QuickBetModal 
        event={selectedEvent} 
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEvent(null); // Clear event data
        }} 
      />
    )}
    </div>
  )
}

export default Events