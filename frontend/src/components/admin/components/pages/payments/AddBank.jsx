import React, { useState } from 'react';
import Header from '../../ui/Header';
import Sidebar from '../../ui/Sidebar';
import { Link } from 'react-router-dom';
import { Button } from "../../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "../../ui/table";
import { Card, CardContent, CardHeader } from '../../ui/card';
import { FaArrowLeft } from 'react-icons/fa';

function AddBank() {
  const [formData, setFormData] = useState({
    image: null,
    bankName: '',
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    upiId: ''
  });

  const [preview, setPreview] = useState(null);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleFileChange(e){
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imageName = `${selectedFile.name}`; // Use timestamp to avoid name conflicts
      setFormData({ ...formData, image: imageName });
      setPreview(URL.createObjectURL(selectedFile)); // Set preview
      // You can manually move the image file to a local folder (e.g., public/images) here or save the path
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if the image path is being correctly set

    // Store primary bank details in localStorage
    const primaryBankDetails = {
      ...formData,
      imagePath: `/${formData.image}`,
    };

    if (primaryBankDetails.imagePath) {
      console.log('Image Path:', primaryBankDetails.imagePath); // Check the image name/path in the console
    }

    localStorage.setItem("primaryBankDetails", JSON.stringify(primaryBankDetails));

    console.log(localStorage)

    alert("Primary bank details saved!");
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
          <main className='p-6'>
            <form onSubmit={handleSubmit}>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <Link to="/admin/payments" className='flex items-center text-gray-400 hover:text-black'>
                    <FaArrowLeft />
                    <span className='pl-2'>Back</span>
                  </Link>
                  <h1 className="text-2xl font-semibold">Add Bank</h1>
                </div>
                <div className='w-auto flex justify-around'>
                  <Link to="/admin/payments">
                    <Button
                      variant="secondary"
                      className="w-auto bg-[white] text-[#e0382a] border-2 mr-3"
                    >
                      Cancel
                    </Button>
                  </Link>

                  <Button
                    type="submit"
                    variant="secondary"
                    className="w-auto bg-[#e0382a] text-white hover:text-[#e0382a] hover:border-2 hover:bg-white"
                  >
                    Save
                  </Button>
                </div>
              </div>

              {/* Form */}
              <div className="w-full mt-6 pb-6 border-b-2">
                <Card className="border-none">
                  <CardHeader>
                    <div className='font-bold'>
                      Account Information
                    </div>
                    <span className='text-gray-400'>
                      Most important information about the Account
                    </span>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableBody>
                        <TableRow className='hover:bg-white'>
                          <TableCell className='pb-10'>
                            <label className='text-gray-400 flex flex-col pb-6'>
                              Account Holder Name
                              <input type="text" className='w-auto px-4 py-2 border border-gray-300 rounded-md' name='accountHolderName' value={formData.accountHolderName} onChange={handleInputChange} />
                            </label>
                            <label className='text-gray-400 flex flex-col'>
                              Bank Name
                              <input type="text" className='w-auto px-4 py-2 border border-gray-300 rounded-md' name='bankName' value={formData.bankName} onChange={handleInputChange} />
                            </label>
                          </TableCell>
                          <TableCell className='pb-10'>
                            <label className='text-gray-400 flex flex-col'>
                              UPI ID
                              <input type="text" className='w-auto px-4 py-2 border border-gray-300 rounded-md' name='upiId' value={formData.upiId} onChange={handleInputChange} />
                            </label>
                            <label className='text-gray-400 flex flex-col pb-6'>
                              Upload QR Code image
                              <input type="file" className='w-auto px-4 py-2 border border-gray-300 rounded-md' name='image' onChange={handleFileChange} />
                              {preview && <img src={preview} alt="Preview" style={{ width: "150px", objectFit: "cover" }} />}
                            </label>
                          </TableCell>
                          <TableCell className='pb-10'>
                            <label className='text-gray-400 flex flex-col pb-6'>
                              Account Number
                              <input type="text" className='w-auto px-4 py-2 border border-gray-300 rounded-md' name='accountNumber' value={formData.accountNumber} onChange={handleInputChange} />
                            </label>
                            <label className='text-gray-400 flex flex-col'>
                              IFSC Code
                              <input type="text" className='w-auto px-4 py-2 border border-gray-300 rounded-md' name='ifscCode' value={formData.ifscCode} onChange={handleInputChange} />
                            </label>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              <div className="flex items-center justify-end text-sm pt-6">
                <div className='w-auto flex justify-around'>
                  <Link to="/admin/payments">
                    <Button
                      variant="secondary"
                      className="w-auto bg-[white] text-[#e0382a] border-2 mr-3"
                    >
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    variant="secondary"
                    className="w-auto bg-[#e0382a] text-white hover:text-[#e0382a] hover:border-2 hover:bg-white"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AddBank;