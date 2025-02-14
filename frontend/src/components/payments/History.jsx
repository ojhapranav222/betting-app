import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar2 from "../Navbar2";

function History() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const baseUrl = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    async function fetchHistory() {
        try {
            let withdrawals = [];
            try {
                const withdrawalRes = await axios.get(`${baseUrl}/api/v1/withdrawal/me`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                withdrawals = withdrawalRes.data.withdrawals;
            } catch (withdrawalError) {
                if (withdrawalError.response && withdrawalError.response.status === 404) {
                    console.warn("No withdrawals found, proceeding to deposits.");
                } else {
                    throw withdrawalError; // Rethrow if it's not a 404 error
                }
            }

            const depositRes = await axios.get(`${baseUrl}/api/v1/deposit/me`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            setWithdrawals(withdrawals);
            setDeposits(depositRes.data.deposits);
        } catch (error) {
            console.error("Error fetching history:", error);
        }
    }

    fetchHistory();
}, []);

  return (
    <div className="bg-black min-h-screen p-8 text-white">
        <Navbar2 />
      <h1 className="text-3xl font-semibold text-center mb-6 mt-24">Transaction History</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Withdrawal History */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Withdrawal History</h2>
          {withdrawals.length > 0 ? (
            <ul className="space-y-3">
              {withdrawals.map((withdrawal, index) => (
                <li
                  key={index}
                  className="bg-gray-800 p-4 rounded-md flex justify-between items-center"
                >
                  <span>₹{withdrawal.amount}</span>
                  <span
                    className={`text-sm font-medium ${
                      withdrawal.status === "pending"
                        ? "text-yellow-500"
                        : withdrawal.status === "approved"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No withdrawal history found.</p>
          )}
        </div>

        {/* Deposit History */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Deposit History</h2>
          {deposits.length > 0 ? (
            <ul className="space-y-3">
              {deposits.map((deposit, index) => (
                <li
                  key={index}
                  className="bg-gray-800 p-4 rounded-md flex justify-between items-center"
                >
                  <span>₹{deposit.amount}</span>
                  <span className="text-green-500 text-sm font-medium">Successful</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No deposit history found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default History;