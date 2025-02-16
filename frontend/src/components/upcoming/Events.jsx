import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import axios from 'axios';
import QuickBetModal from '../ui/QuickBetModal';

function Events() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState(null);

  function openModal(event) {
    setSelectedEvent(event);
    setIsModalOpen(true);
  }

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
    <div className="mt-24 w-[50%] h-screen overflow-y-scroll overflow-x-hidden">
      <h1 className="text-white text-center mb-8 font-bold text-3xl">
        Upcoming & Live Matches
      </h1>
      <div className="flex flex-col gap-4 pb-36">
        {events ? (
          events.games?.map((event, index) => (
            <div key={event.id || index} className={event.bet ? '' : 'cursor-not-allowed opacity-50'}>
              <Card
                country1={event.team_a}
                country2={event.team_b}
                createdAt={event.created_at}
                endTime={event.end_time}
                type={event.match_name}
                bet={event.bet}
                onBetClick={() => openModal(event)} // Pass only the button handler
              />
            </div>
          ))
        ) : (
          <p className="text-white text-center">
            No upcoming or live games at this moment
          </p>
        )}
      </div>

      {isModalOpen && selectedEvent && (
        <QuickBetModal
          event={selectedEvent}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedEvent(null);
          }}
        />
      )}
    </div>
  );
}

export default Events;