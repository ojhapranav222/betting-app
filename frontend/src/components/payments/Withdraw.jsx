import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function WithdrawalForm() {
  const [amount, setAmount] = useState("");
  const [upiId, setUpiId] = useState("");
  const baseUrl = import.meta.env.VITE_BACKEND_URL
  const navigate = useNavigate();

  const handleWithdraw = async () => {
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount!");
      return;
    }

    try {
      await axios.post(`${baseUrl}/api/v1/withdrawal/request`, { amount, upiId }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
      });
      alert("Withdrawal request submitted successfully. Status: Pending.");
      navigate("/"); // Redirect to landing page
    } catch (error) {
      alert(error.response.data.message);
      console.error("Withdrawal Error:", error);
    }
  };

  return (
    <div className="bg-black border border-white rounded-lg py-8 px-6 w-full max-w-md mx-auto">
      <h2 className="text-white text-xl font-semibold mb-4">Withdraw Funds</h2>

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="bg-black text-white mb-6 border-b border-white outline-none px-4 py-2 w-full"
        required
      />

      <input
        type="text"
        placeholder="Enter your Upi Id"
        value={upiId}
        onChange={(e) => setUpiId(e.target.value)}
        className="bg-black text-white mb-6 border-b border-white outline-none px-4 py-2 w-full"
        required
      />

      <button
        className="px-8 py-2 w-full text-white font-semibold text-xl rounded-lg bg-gradient-to-r from-red-700 to-red-500 hover:bg-gradient-to-l transition-all ease-in-out"
        onClick={handleWithdraw}
      >
        Withdraw
      </button>
    </div>
  );
}

export default WithdrawalForm;