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
    <div className="mt-24 w-full sm:w-[40%] px-6 sm:px-8 h-screen overflow-y-auto">
      <h1 className="text-gray-400 text-left mb-6 font-bold text-2xl sm:text-3xl border-b pb-3 border-gray-700">
        Upcoming & Live Matches
      </h1>
      <div className="flex flex-col gap-4 pb-24">
  {events?.games?.filter(event => event.bet && new Date(event.end_time) > new Date()).length > 0 ? (
    events.games
      .filter(event => event.bet && new Date(event.end_time) > new Date())
      .map((event, index) => (
        <Card
          key={event.id || index}
          country1={event.team_a}
          country2={event.team_b}
          endTime={event.end_time}
          type={event.match_name}
          bet={event.bet}
          onBetClick={() => openModal(event)}
        />
      ))
  ) : (
    <p className="text-center text-gray-500 text-lg">No game coming up...</p>
  )}
</div>

      {isModalOpen && selectedEvent && (
        <QuickBetModal
          event={selectedEvent}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedEvent(null);
          }}
        />
      )}
    </div>
  );
}

export default Events;
