import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../ui/button';
import Sidebar from '../../ui/Sidebar';
import Header from '../../ui/Header';
import axios from 'axios';

export default function AddGame() {
  const navigate = useNavigate();

  // Form state for the game details
  const [teamA, setCountry1] = useState('');
  const [teamB, setCountry2] = useState('');
  const [matchName, setType] = useState('');
  const [endTime, setEndTime] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState(null);
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  async function handleSubmit(e) {
    e.preventDefault();
  
      const newGame = {
        matchName,
        teamA,
        teamB,
        endTime,
        ...(additionalNotes ? { additionalNotes } : null) // Only add additionalNotes if it's provided
    };

    console.log(newGame)
    
    await axios.post(`${baseUrl}/api/v1/game/add`, newGame, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => console.error('Error adding game:', error));
  
  
  // Navigate back
  navigate('/admin/games');
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-row items-start mt-16">
        {/* Sidebar */}
        <Sidebar />
        {/* Main Content */}
        <div className="flex-1 ml-64">
          <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Game</h1>
      <form onSubmit={handleSubmit} className="max-w-md bg-white p-6 rounded shadow">
        {/* Country 1 */}
        <div className="mb-4">
          <label className="block text-gray-700">Team A</label>
          <input
            type="text"
            value={teamA}
            onChange={(e) => setCountry1(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter Country 1"
            required
          />
        </div>

        {/* Country 2 */}
        <div className="mb-4">
          <label className="block text-gray-700">Team B</label>
          <input
            type="text"
            value={teamB}
            onChange={(e) => setCountry2(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter Country 2"
            required
          />
        </div>

        {/* Game Type */}
        <div className="mb-4">
          <label className="block text-gray-700">Match Name</label>
          <input
            type="text"
            value={matchName}
            onChange={(e) => setType(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter Game Type (e.g., ODI Series, T20 International)"
            required
          />
        </div>

        {/* Starting In (only if not live) */}
        <div className="mb-4">
          <label className="block text-gray-700">Ending In</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter time until start (e.g., 2h 30m)"
          />
        </div>

        {/* Additional Notes */}
        <div className="mb-4">
          <label className="block text-gray-700">Additional Notes</label>
          <textarea
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded h-24 resize-none"
            placeholder="Enter any additional notes..."
          />
        </div>

        <Button type="submit" variant="primary" className="w-full">
          Save Game
        </Button>
      </form>
      </main>
    </div>
    </div>
    </div>
  );
}