import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar2 from "../Navbar2";

function WithdrawalForm() {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [bankName, setBankName] = useState("");
  const [holderName, setHolderName] = useState("");
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  function isWithinWorkingHours() {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    return day >= 1 && day <= 5 && hour >= 10 && hour < 24;
  }

  async function handleWithdraw() {
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount!");
      return;
    }

    if (!isWithinWorkingHours()) {
      alert("Withdrawal request can only be made between 10 AM to 8 PM, Mon to Fri.");
      return;
    }

    const data = { amount, accountNumber, ifscCode, bankName, upiId, holderName };

    try {
      await axios.post(`${baseUrl}/api/v1/withdrawal/request`, data, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Withdrawal request submitted successfully. Status: Pending.");
      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
      console.error("Withdrawal Error:", error);
    }
  }

  return (
    <div className="bg-white min-h-screen flex flex-col items-center px-4">
      <Navbar2 />
      <div className="w-full max-w-lg mt-24 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
        <h2 className="text-gray-900 text-2xl font-semibold text-center mb-6">Withdraw Money</h2>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />

        <label className="text-gray-700 text-sm font-medium">Select Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="upi">UPI</option>
          <option value="bank">Bank</option>
        </select>

        {paymentMethod === "upi" ? (
          <input
            type="text"
            placeholder="Enter your UPI ID"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter your Account Number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Enter your IFSC Code"
              value={ifscCode}
              onChange={(e) => setIfscCode(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Enter Account Holder Name"
              value={holderName}
              onChange={(e) => setHolderName(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Enter Bank Name"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </>
        )}

        <button
          className="w-full py-3 text-white font-semibold text-lg rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-gradient-to-l transition-all ease-in-out"
          onClick={handleWithdraw}
        >
          Withdraw
        </button>
        
        <button
          className="w-full py-2 mt-4 text-gray-700 font-semibold text-lg rounded-lg border border-gray-300 hover:bg-gray-100 transition-all ease-in-out"
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default WithdrawalForm;