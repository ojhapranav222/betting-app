import React, { useState, useEffect } from 'react';
import Navbar2 from '../Navbar2';
import axios from 'axios';

function Deposit() {
  const [showPopup, setShowPopup] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [primaryBankDetails, setPrimaryBankDetails] = useState(null);
  const [screenshot, setScreenshot] = useState(null);
  const [amount, setAmount] = useState(null);
  const [file, setFile] = useState(null);
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${baseUrl}/api/v1/bank/primary`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPrimaryBankDetails(response.data);
    }
    fetchData();
  }, []);

  function handleScreenshotChange(e) {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setScreenshot(previewURL);
      setFile(file);
    }
  }

  function handlePayClick() {
    if (screenshot) {
      setShowPopup(true);
    } else {
      alert("Please upload a screenshot of the payment.");
    }
  }

  async function handleDeposit() {
    if (!amount || !file) {
      alert("Amount and screenshot are required.");
      return;
    }
    
    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("screenshot", file);
    
    try {
      await axios.post(`${baseUrl}/api/v1/deposit/add`, formData, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
      });
      setShowPopup(false);
      alert("Money added successfully. Refresh the page");
    } catch (error) {
      console.error("Deposit Error:", error);
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <div className='bg-white flex flex-col items-center gap-10 text-gray-900'>
      <Navbar2 />
      <h1 className='text-gray-800 text-4xl md:text-5xl text-center font-bold mt-12 border-t border-gray-300 w-full pt-12'>Deposit</h1>
      
      <div className='flex flex-col lg:flex-row w-full justify-center gap-12 px-6 py-10'>
        <div className='w-full lg:w-[45%] bg-gray-100 border border-gray-300 rounded-lg py-8 px-6 shadow-md'>
          <p className='text-3xl font-semibold text-gray-800 mb-6'>Bank Details</p>
          {primaryBankDetails?.bank && (
            <div className='text-gray-700'>
              <div className="mb-4">
                <p><strong>Bank Name:</strong> {primaryBankDetails.bank.bank_name}</p>
                <p><strong>Account Holder:</strong> {primaryBankDetails.bank.account_holder_name}</p>
                <p><strong>Account Number:</strong> {primaryBankDetails.bank.account_number}</p>
                <p><strong>IFSC Code:</strong> {primaryBankDetails.bank.ifsc_code}</p>
                <p><strong>UPI ID:</strong> {primaryBankDetails.bank.upi_id}</p>
              </div>
              {primaryBankDetails.bank.image && (
                <div className="flex justify-center mb-6">
                  <img 
                    src={primaryBankDetails.bank.image} 
                    alt="Bank QR Code" 
                    className="w-[150px] h-[150px] object-cover rounded-lg cursor-pointer border border-gray-300"
                    onClick={() => setIsOpenModal(true)}
                  />
                </div>
              )}
              {isOpenModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setIsOpenModal(false)}>
                  <div className="bg-white p-4 rounded-2xl shadow-lg" onClick={(e) => e.stopPropagation()}>
                    <img 
                      src={primaryBankDetails?.bank.image} 
                      alt="Bank QR Code" 
                      className="max-h-[500px] w-auto object-cover rounded-lg"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className='w-full lg:w-[45%] flex flex-col gap-6 items-center'>
          <p className='text-gray-800 text-3xl font-semibold mb-6'>Confirm Your Payment</p>
          <div className='bg-gray-100 border border-gray-300 rounded-lg py-8 px-6 w-full shadow-md'>
            <input 
              type="number" 
              placeholder="Enter amount" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className='bg-white text-gray-800 mb-6 border border-gray-400 outline-none px-4 py-2 w-full rounded-lg'
            />
            <input 
              type="file" 
              accept="image/*"
              onChange={handleScreenshotChange}
              className='bg-white text-gray-800 mb-6 border border-gray-400 outline-none px-4 py-2 w-full rounded-lg'
            />
            {screenshot && (
              <div className="mb-6">
                <p className="text-gray-800 mb-2">Uploaded Screenshot Preview:</p>
                <img 
                  src={screenshot} 
                  alt="Screenshot Preview" 
                  className="w-[150px] h-[150px] object-cover rounded-lg border border-gray-300"
                />
              </div>
            )}
            <button 
              className='px-8 py-2 w-full text-white font-semibold text-xl rounded-lg bg-blue-600 hover:bg-blue-700 transition-all' 
              onClick={handlePayClick}
              disabled={!amount || !screenshot}
            >
              Add Money
            </button>
          </div>
        </div>
      </div>

      {showPopup && ( 
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-sm flex items-center justify-center"> 
          <div className="bg-white p-8 rounded-lg shadow-lg"> 
            <p className="text-xl font-semibold mb-4">Do you agree to our terms and conditions?</p>
            <div className="flex mt-4 gap-4">
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg" onClick={handleDeposit}>Agree</button>
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg" onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Deposit;