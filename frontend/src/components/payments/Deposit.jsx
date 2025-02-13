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
  const baseUrl = import.meta.env.VITE_BACKEND_URL

  // Retrieve primary bank details from localStorage
  useEffect(() => {
    async function fetchData(){
      const response = await axios.get(`${baseUrl}/api/v1/bank/primary`);
      setPrimaryBankDetails(response.data);
    }

    fetchData();
  }, []);
  // Handle the file input change for screenshot
  function handleScreenshotChange(e) {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setScreenshot(previewURL);
      setFile(file)  // Set the preview URL for the uploaded screenshot
    }
  };

  // Handle Pay click action
  function handlePayClick() {
    if (screenshot) {
      setShowPopup(true);
    } else {
      alert("Please upload a screenshot of the payment.");
    }
  };

  async function handleDeposit() {
    //use api
    if (!amount || !file) {
      alert("Amount and screenshot are required.");
      return;
    }
  
    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("screenshot", file); // Sending the actual file
  
    try {
      const response = await axios.post(`${baseUrl}/api/v1/deposit/add`, formData, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
      });
      setShowPopup(false);
    } catch (error) {
      console.error("Deposit Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className='bg-black flex flex-col items-center gap-10'>
      <Navbar2 />
      <h1 className='text-white text-4xl md:text-5xl text-center font-bold mt-12 border-t border-t-white w-full pt-12'>Deposit</h1>

      <div className='flex flex-col lg:flex-row w-full justify-center gap-12 px-6 py-10'>
        {/* Display primary bank details from localStorage */}
        <div className='w-full lg:w-[45%] bg-black border-t-2 border-r-2 border-white rounded-lg py-8 px-6'>
          <p className='text-3xl font-semibold text-white mb-6'>Bank Details</p>
          {primaryBankDetails?.bank && (
            <div className='text-white'>
              <div className="mb-4">
                <p><strong>Bank Name:</strong> {primaryBankDetails.bank.bank_name}</p>
                <p><strong>Account Holder:</strong> {primaryBankDetails.bank.account_holder_name}</p>
                <p><strong>Account Number:</strong> {primaryBankDetails.bank.account_number}</p>
                <p><strong>IFSC Code:</strong> {primaryBankDetails.bank.ifsc_code}</p>
                <p><strong>UPI ID:</strong> {primaryBankDetails.bank.upi_id}</p>
              </div>
              <div className="flex justify-center mb-6">
                {/* Display the image from localStorage */}
                {primaryBankDetails.bank.image && (
                  <img 
                    src={primaryBankDetails.bank.image} 
                    alt="Bank Image" 
                    className="w-[150px] h-[150px] object-cover rounded-full cursor-pointer"
                    onClick={() => setIsOpenModal(true)}
                  />
                )}
              </div>
              {isOpenModal && (
                <div 
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                  onClick={() => setIsOpenModal(false)}
                >
                  <div 
                    className="bg-gray-900 p-4 rounded-2xl shadow-lg"
                    onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
                  >
                    <img 
                      src={primaryBankDetails?.bank.image} 
                      alt="Bank Image" 
                      className="max-h-[500px] w-auto object-cover rounded-lg cursor-pointer"
                      onClick={() => setIsOpenModal(false)}
                    />
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

        {/* File upload input for the screenshot */}
        <div className='w-full lg:w-[45%] flex flex-col gap-6 items-center'>
          <p className='text-white text-3xl font-semibold mb-6'>Let us know that you have paid!</p>
          <div className='bg-black border-b-2 border-l-2 border-white rounded-lg py-8 px-6 w-full'>

  {/* Amount Input */}
  <input 
    type="number" 
    placeholder="Enter amount" 
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
    className='bg-black text-white mb-6 border-b border-b-white outline-none px-4 py-2 w-full'
  />

  {/* File Upload */}
  <input 
    type="file" 
    accept="image/*"
    onChange={handleScreenshotChange}
    className='bg-black text-white mb-6 border-b border-b-white outline-none px-4 py-2 w-full'
  />

  {/* Screenshot Preview */}
  {screenshot && (
    <div className="mb-6">
      <p className="text-white mb-2">Uploaded Screenshot Preview:</p>
      <img 
        src={screenshot} 
        alt="Screenshot Preview" 
        className="w-[150px] h-[150px] object-cover rounded-lg"
      />
    </div>
  )}

  {/* Pay Button */}
  <button 
    className='px-8 py-2 w-[30%] text-white font-semibold text-xl rounded-full bg-gradient-to-r from-[#0D47A1] to-[#43A047] hover:bg-gradient-to-l transition-all ease-in-out' 
    onClick={handlePayClick}
    disabled={!amount || !screenshot} // Disables button if no amount or screenshot is provided
  >
    Pay
  </button>
</div>
        </div>
      </div>

      {/* Popup for confirming payment */}
      {showPopup && ( 
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-sm flex items-center justify-center"> 
          <div className="bg-white p-8 rounded-lg"> 
            <p className="text-xl font-semibold mb-4">Do you agree to our terms and conditions?</p>
            <div className="flex mt-4 gap-4">
              <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                onClick={handleDeposit}
              >
                Agree
              </button>
              <button 
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg" 
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Deposit;
