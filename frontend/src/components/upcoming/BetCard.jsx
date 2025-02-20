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
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBetData(response.data);
    } catch (err) {
      console.error(err.response.data.message);
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
    } catch (error) {
      console.error('Error canceling bet:', error);
    }
  }

  return (
    <div className="sm:relative w-[35%] z-0 h-screen overflow-y-scroll">
      {/* Hamburger button */}
      {isSmallScreen && (<button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-24 z-50 right-4 text-white text-3xl"
      >
        &#9776;
      </button>)}

      {/* Sliding Bet Card */}
      <div
        className={`fixed sm:static top-0 right-0 sm:w-full mt-36 border-2 border-black bg-gray-300 p-4 rounded-xl overflow-y-scroll transform transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ zIndex: 999 }}
      >
        <div className="flex gap-6 font-semibold">
          <button
            className="hover:bg-transparent rounded-full px-6 py-1"
            style={{
              background:
                'linear-gradient(135deg, #0D47A1, #1565C0, #2196F3, #43A047)',
            }}
          >
            My Bets
          </button>
        </div>
        {betData?.bets && betData.bets?.length > 0 ? (
          <div className="space-y-4 mt-4">
            {betData.bets?.map((bet, index) => (
              <div
                key={index}
                className="bg-gray-800 p-3 rounded-lg shadow-md border border-gray-600"
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
                {!bet.winner &&
                  bet.bet &&
                  bet.status === 'approved' && (
                    <button
                      onClick={() => handleCancel(bet.id)}
                      className="bg-red-600 mt-4 text-white text-sm px-3 py-1 rounded-lg hover:bg-red-700 transition"
                    >
                      Cancel Bet
                    </button>
                  )}
              </div>
            ))}
          </div>
        ) : (
          <h2 className="font-bold py-32 text-xl text-center text-gray-400">
            Your Bet Slip is Empty
          </h2>
        )}
      </div>
    </div>
  );
}

export default BetCard;