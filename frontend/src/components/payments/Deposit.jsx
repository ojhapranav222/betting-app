import React, { useState, useEffect } from 'react';
import Navbar2 from '../Navbar2';

function Deposit() {
  const [selectedNum, setSelectedNum] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [primaryBankDetails, setPrimaryBankDetails] = useState(null);
  const [screenshot, setScreenshot] = useState(null);

  // Retrieve primary bank details from localStorage
  useEffect(() => {
    const savedBankDetails = localStorage.getItem("primaryBankDetails");
    if (savedBankDetails) {
      setPrimaryBankDetails(JSON.parse(savedBankDetails));
    }
  }, []);

  // Handle the file input change for screenshot
  const handleScreenshotChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setScreenshot(previewURL);  // Set the preview URL for the uploaded screenshot
    }
  };

  // Handle Pay click action
  const handlePayClick = () => {
    if (screenshot) {
      setShowPopup(true);
    } else {
      alert("Please upload a screenshot of the payment.");
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
          {primaryBankDetails && (
            <div className='text-white'>
              <div className="mb-4">
                <p><strong>Bank Name:</strong> {primaryBankDetails.bankName}</p>
                <p><strong>Account Holder:</strong> {primaryBankDetails.accountHolderName}</p>
                <p><strong>Account Number:</strong> {primaryBankDetails.accountNumber}</p>
                <p><strong>IFSC Code:</strong> {primaryBankDetails.ifscCode}</p>
                <p><strong>UPI ID:</strong> {primaryBankDetails.upiId}</p>
              </div>
              <div className="flex justify-center mb-6">
                {/* Display the image from localStorage */}
                {primaryBankDetails.imagePath && (
                  <img 
                    src={primaryBankDetails.imagePath} 
                    alt="Bank Image" 
                    className="w-[150px] h-[150px] object-cover rounded-full"
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* File upload input for the screenshot */}
        <div className='w-full lg:w-[45%] flex flex-col gap-6 items-center'>
          <p className='text-white text-3xl font-semibold mb-6'>Let us know that you have paid!</p>
          <div className='bg-black border-b-2 border-l-2 border-white rounded-lg py-8 px-6 w-full'>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleScreenshotChange}
              className='bg-black text-white mb-6 border-b border-b-white outline-none px-4 py-2'
            />
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
            <button 
              className='px-8 py-2 w-[30%] text-white font-semibold text-xl rounded-full bg-gradient-to-r from-[#0D47A1] to-[#43A047] hover:bg-gradient-to-l transition-all ease-in-out' 
              onClick={handlePayClick}
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
                onClick={() => {
                  setShowPopup(false); 
                  alert("Payment processed!");
                }}
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
