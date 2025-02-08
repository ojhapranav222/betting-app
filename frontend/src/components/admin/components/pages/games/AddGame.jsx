import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../ui/button';
import Sidebar from '../../ui/Sidebar';
import Header from '../../ui/Header';

export default function AddGame() {
  const navigate = useNavigate();

  // Form state for the game details
  const [country1, setCountry1] = useState('');
  const [country2, setCountry2] = useState('');
  const [point1, setPoint1] = useState('');
  const [point2, setPoint2] = useState('');
  const [type, setType] = useState('');
  const [isLive, setIsLive] = useState(false);
  const [startingIn, setStartingIn] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  
  const newGame = { country1, country2, point1, point2, type, isLive };
  if (!isLive) {
    newGame.startingIn = startingIn;
  }
  
  // Retrieve only the user-added games from localStorage
  let storedGames = localStorage.getItem('userAddedGames');
  let games = storedGames ? JSON.parse(storedGames) : [];
  
  // Append the new game to user-added games array
  const updatedGames = [...games, newGame];
  
  // Update localStorage for user-added games
  localStorage.setItem('userAddedGames', JSON.stringify(updatedGames));
  
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
          <label className="block text-gray-700">Country 1</label>
          <input
            type="text"
            value={country1}
            onChange={(e) => setCountry1(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter Country 1"
            required
          />
        </div>

        {/* Country 2 */}
        <div className="mb-4">
          <label className="block text-gray-700">Country 2</label>
          <input
            type="text"
            value={country2}
            onChange={(e) => setCountry2(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter Country 2"
            required
          />
        </div>

        {/* Point 1 */}
        <div className="mb-4">
          <label className="block text-gray-700">Point 1</label>
          <input
            type="text"
            value={point1}
            onChange={(e) => setPoint1(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter Point 1"
            required
          />
        </div>

        {/* Point 2 */}
        <div className="mb-4">
          <label className="block text-gray-700">Point 2</label>
          <input
            type="text"
            value={point2}
            onChange={(e) => setPoint2(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter Point 2"
            required
          />
        </div>

        {/* Game Type */}
        <div className="mb-4">
          <label className="block text-gray-700">Game Type</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter Game Type (e.g., ODI Series, T20 International)"
            required
          />
        </div>

        {/* Is Live? */}
        <div className="mb-4">
          <label className="block text-gray-700">Is Live?</label>
          <select
            value={isLive ? 'true' : 'false'}
            onChange={(e) => setIsLive(e.target.value === 'true')}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="true">Live</option>
            <option value="false">Scheduled</option>
          </select>
        </div>

        {/* Starting In (only if not live) */}
        {!isLive && (
          <div className="mb-4">
            <label className="block text-gray-700">Starting In</label>
            <input
              type="text"
              value={startingIn}
              onChange={(e) => setStartingIn(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Enter time until start (e.g., 2h 30m)"
              required={!isLive}
            />
          </div>
        )}

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