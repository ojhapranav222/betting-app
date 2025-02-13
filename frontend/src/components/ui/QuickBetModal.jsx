import React, { useState } from 'react';
import axios from 'axios';

function QuickBetModal({ event, onClose }) {
    const [amount, setAmount] = useState('');
    const [selectedTeam, setSelectedTeam] = useState('team_a'); // Default selection

    const handleBet = async () => {
        if (!amount || isNaN(amount) || amount <= 0) {
            alert("Enter a valid bet amount!");
            return;
        }

        try {
            const baseUrl = import.meta.env.VITE_BACKEND_URL;
            const response = await axios.post(`${baseUrl}/api/v1/bet/place-bet`, {
                gameId: event.id,
                team: selectedTeam,  // This will be either 'team_a' or 'team_b'
                amount: parseFloat(amount),
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            alert(response.data.message);
            onClose(); // Close modal after successful bet
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Bet placement failed.");
        }
    };

    console.log(event)

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-900 p-6 rounded-lg text-white w-96">
                <h2 className="text-xl font-bold mb-4">Place Your Bet</h2>
                <p className="mb-2">Match: <span className="font-semibold">{event.match_name}</span></p>

                {/* Team Selection Dropdown */}
                <label className="block mb-2">Select Team:</label>
                <select
                    className="w-full p-2 rounded-lg text-black"
                    value={selectedTeam}
                    onChange={(e) => setSelectedTeam(e.target.value)}
                >
                    <option value="team_a">{event.team_a}</option>
                    <option value="team_b">{event.team_b}</option>
                </select>

                {/* Bet Amount Input */}
                <label className="block mt-4 mb-2">Bet Amount:</label>
                <input 
                    type="number"
                    className="w-full p-2 rounded-lg text-black"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                {/* Action Buttons */}
                <div className="flex justify-between mt-4">
                    <button onClick={onClose} className="bg-gray-600 px-4 py-2 rounded-lg">Cancel</button>
                    <button onClick={handleBet} className="bg-green-600 px-4 py-2 rounded-lg">Place Bet</button>
                </div>
            </div>
        </div>
    );
}

export default QuickBetModal;