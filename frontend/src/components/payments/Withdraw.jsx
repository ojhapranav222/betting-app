import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  // Function to check if the withdrawal can be made
  function isWithinWorkingHours(){
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday

    return day >= 1 && day <= 5 && hour >= 10 && hour < 24;
  };

  async function handleWithdraw(){
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount!");
      return;
    }

    // Check if the withdrawal can be made
    if (!isWithinWorkingHours()) {
      alert("Withdrawal request can only be made between 10 AM to 8 PM, Mon to Fri.");
      return;
    }

    const data = { amount, accountNumber, ifscCode, bankName,  upiId: null, holderName};

    try {
      await axios.post(`${baseUrl}/api/v1/withdrawal/request`, data, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
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

      {/* Payment Method Dropdown */}
      <div className="mb-6">
        <label className="text-white text-sm font-medium">Select Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="bg-black text-white border-b border-white outline-none px-4 py-2 w-full"
        >
          <option value="upi">UPI</option>
          <option value="bank">Bank</option>
        </select>
      </div>

      {/* Conditionally render fields based on payment method */}
      {paymentMethod === "upi" ? (
        <input
          type="text"
          placeholder="Enter your UPI ID"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          className="bg-black text-white mb-6 border-b border-white outline-none px-4 py-2 w-full"
          required
        />
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter your Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="bg-black text-white mb-6 border-b border-white outline-none px-4 py-2 w-full"
            required
          />
          <input
            type="text"
            placeholder="Enter your IFSC Code"
            value={ifscCode}
            onChange={(e) => setIfscCode(e.target.value)}
            className="bg-black text-white mb-6 border-b border-white outline-none px-4 py-2 w-full"
            required
          />
          <input
            type="text"
            placeholder="Enter Account Holder Name"
            value={holderName}
            onChange={(e) => setHolderName(e.target.value)}
            className="bg-black text-white mb-6 border-b border-white outline-none px-4 py-2 w-full"
            required
          />
          <input
            type="text"
            placeholder="Enter Bank Name"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            className="bg-black text-white mb-6 border-b border-white outline-none px-4 py-2 w-full"
            required
          />
        </>
      )}

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