import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "../../ui/button";
import axios from 'axios';
import Header from '../../ui/Header';
import Sidebar from '../../ui/Sidebar';

function AddAccount() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [bankName, setBankName] = useState("");
    const [holderName, setHolderName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [ifscCode, setIfscCode] = useState("");
    const [upiId, setUpiId] = useState("");
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("bankName", bankName);
        formData.append("accountNumber", accountNumber || null); // Allow null
        formData.append("holderName", holderName);
        formData.append("ifscCode", ifscCode);
        formData.append("upiId", upiId);

        try {
            const response = await axios.post(`${baseUrl}/api/v1/bank/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Bank added successfully:", response.data);
            alert(response.data.message);
            navigate('/admin/banks');
        } catch (error) {
            console.error("Error adding bank:", error.response.data.message);
            alert(error.response.data.message);
        }
    };
    

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Header Section */}
      <Header />
      <div className="flex flex-row items-start justify-between mt-16">
        {/* Sidebar */}
        <Sidebar />
        {/* Main */}
        <div className='flex-1 ml-64'>
            <main className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Add Account</h1>
                    <div className='flex gap-6'>
                    <Link to="/admin/banks">
                        <Button
                            variant="secondary"
                            className="w-auto bg-[white] text-[#e0382a] border-2"
                            >
                            Cancel
                        </Button>
                    </Link>
                    </div>
                </div>
                <div>
                <form 
            onSubmit={handleSubmit} 
            className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
        >
            {/* Image Upload */}
            <div className="flex flex-col">
                <label className="text-gray-700 font-semibold">Upload Image</label>
                <input type="file" onChange={handleFileChange} className="border p-2 rounded-md" required />
            </div>

            {/* Bank Name */}
            <div className="flex flex-col">
                <label className="text-gray-700 font-semibold">Bank Name</label>
                <input 
                    type="text" 
                    value={bankName} 
                    onChange={(e) => setBankName(e.target.value)} 
                    className="border p-2 rounded-md" 
                    placeholder="Enter Bank Name" 
                    required 
                />
            </div>

            {/* Account Holder Name */}
            <div className="flex flex-col">
                <label className="text-gray-700 font-semibold">Account Holder</label>
                <input 
                    type="text" 
                    value={holderName} 
                    onChange={(e) => setHolderName(e.target.value)} 
                    className="border p-2 rounded-md" 
                    placeholder="Enter Holder Name" 
                    required 
                />
            </div>

            {/* Account Number */}
            <div className="flex flex-col">
                <label className="text-gray-700 font-semibold">Account Number</label>
                <input 
                    type="text" 
                    value={accountNumber} 
                    onChange={(e) => setAccountNumber(e.target.value)} 
                    className="border p-2 rounded-md" 
                    placeholder="Enter Account Number (Optional)" 
                />
            </div>

            {/* IFSC Code */}
            <div className="flex flex-col">
                <label className="text-gray-700 font-semibold">IFSC Code</label>
                <input 
                    type="text" 
                    value={ifscCode} 
                    onChange={(e) => setIfscCode(e.target.value)} 
                    className="border p-2 rounded-md" 
                    placeholder="Enter IFSC Code" 
                    required 
                />
            </div>

            {/* UPI ID */}
            <div className="flex flex-col">
                <label className="text-gray-700 font-semibold">UPI ID</label>
                <input 
                    type="text" 
                    value={upiId} 
                    onChange={(e) => setUpiId(e.target.value)} 
                    className="border p-2 rounded-md" 
                    placeholder="Enter UPI ID" 
                    required 
                />
            </div>

            {/* Submit Button */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center">
                <button type="submit" className="bg-[#e0382a] text-white px-6 py-2 rounded-md hover:bg-red-700">
                    Add Bank
                </button>
            </div>
        </form>
                </div>
            </main>
            
        </div>
    </div>

    </div>
  )
}

export default AddAccount