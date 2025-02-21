import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useSmallScreen from '../ui/SmallScreen';

function BetCard() {
  const [betData, setBetData] = useState(null);
  const isSmallScreen = useSmallScreen();
  const [isOpen, setIsOpen] = useState(isSmallScreen ? false : true);
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  async function fetchData() {
    try {
      const response = await axios.get(`${baseUrl}/api/v1/bet/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBetData(response.data);
    } catch (err) {
      console.error(err.response?.data?.message || "Error fetching bets");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleCancel(id) {
    try {
      await axios.put(`${baseUrl}/api/v1/bet/cancel/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchData(); // Refresh bet data after canceling
    } catch (error) {
      console.error('Error canceling bet:', error);
    }
  }

  return (
    <div className="mt-24 w-full sm:w-[40%] px-6 sm:px-8 h-screen pb-24">
      {/* Section Title */}
      <h1 className="text-gray-400 text-left mb-6 font-bold text-2xl sm:text-3xl border-b pb-3 border-gray-700">
        My Bets
      </h1>

      {/* Bet List */}
      <div className="flex flex-col gap-4">
        {betData?.bets?.length > 0 ? (
          betData.bets.map((bet, index) => (
            <div
              key={index}
              className="bg-gray-900 p-4 rounded-lg shadow-md border border-gray-700"
            >
              <p className="text-gray-300 text-sm">
                Match: <span className="font-bold">{bet.match_name}</span>
              </p>
              <p className="text-gray-300 text-sm">
                Your Team: <span className="font-bold">{bet.team_name}</span>
              </p>
              <p className="text-gray-300 text-sm">
                Opposing Team: <span className="font-bold">
                  {bet.team_name === bet.team_a ? bet.team_b : bet.team_a}
                </span>
              </p>
              <p className="text-gray-300 text-sm">
                Amount: <span className="font-bold">₹{bet.amount_bet}</span>
              </p>
              <p
                className={`text-sm font-bold ${
                  bet.status === 'won' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                Status: {bet.status.toUpperCase()}
              </p>
              {!bet.winner && bet.bet && bet.status === 'approved' && (
                <button
                  onClick={() => handleCancel(bet.id)}
                  className="bg-red-600 mt-4 text-white text-sm px-3 py-1 rounded-lg hover:bg-red-700 transition"
                >
                  Cancel Bet
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center mt-6">
            Your Bet Slip is Empty
          </p>
        )}
      </div>
    </div>
  );
}

export default BetCard;