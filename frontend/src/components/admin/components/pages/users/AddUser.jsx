import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "../../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "../../ui/table";
import { Card, CardContent, CardHeader } from '../../ui/card';
import { FaArrowLeft } from 'react-icons/fa';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import axios from 'axios';
import Header from '../../ui/Header';
import Sidebar from '../../ui/Sidebar';

export default function AddUsers(){

  const [formData, setFormData] = useState({
    userId: "",
    firstName: "",
    secondName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    apartment: "",
    country: "",
    postalCode: "",
    notes: "",
    phone: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:3000/api/user/add", formData);
      navigate("/user");
      alert("User added successfully");
    } catch (error) {
      console.error("Error saving user data", error);
    }
  };

  const navigate = useNavigate();


  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <div className="flex flex-row items-start justify-between mt-16">
            {/* Sidebar */}
            <Sidebar />
            {/* Main */}
            <div className="flex-1 ml-64">
                {/* User Content */}
                <main className="p-6">
                  <form onSubmit = {handleSubmit}>
                    <div className="flex items-center justify-between text-sm">
                      <div>
                          <Link to="/admin/users" className='flex items-center text-gray-400 hover:text-black'>
                            <FaArrowLeft />
                            <span className='pl-2'>Back</span>
                          </Link>
                        <h1 className="text-2xl font-semibold">Add User</h1>
                      </div>
                    <div className='w-auto flex justify-around'>
                      <Link to="/user">
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
                                User Information
                              </div>
                              <span className='text-gray-400'>
                                Most important information about the User  
                              </span>        
                            </CardHeader>
                            <CardContent>
                              <Table>
                                <TableBody>
                                  <TableRow className='hover:bg-white'>
                                    <TableCell className='pb-10'>
                                      <label className='text-gray-400 flex flex-col pb-6'>
                                        First Name
                                        <input type="text" className='w-auto px-4 py-2 border border-gray-300 rounded-md' name='firstName' value={formData.firstName} onChange={handleInputChange}/>
                                      </label>
                                      <label className='text-gray-400 flex flex-col'>
                                        Email Address
                                        <input type="text" className='w-auto px-4 py-2 border border-gray-300 rounded-md'name='email' value={formData.email} onChange={handleInputChange}/>
                                      </label>
                                    </TableCell>
                                    <TableCell className='pb-10'>
                                      <label className='text-gray-400 flex flex-col pb-6'>
                                        Second Name
                                        <input type="text" className='w-auto px-4 py-2 border border-gray-300 rounded-md' name='secondName' value={formData.secondName} onChange={handleInputChange}/>
                                      </label>
                                      <label className='text-gray-400 flex flex-col'>
                                        Phone Number
                                        <input type="text" className='w-auto px-4 py-2 border border-gray-300 rounded-md' name='phoneNumber' value={formData.phoneNumber} onChange={handleInputChange}/>
                                      </label>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow></TableRow>
                                </TableBody>
                              </Table>
                            </CardContent>
                            <CardHeader>
                              <div className='font-bold'>
                                User Address
                              </div>
                              <span className='text-gray-400'>
                                Booking location information
                              </span>        
                            </CardHeader>
                            <CardContent>
                              <Table>
                                <TableBody>
                                  <TableRow className='hover:bg-white grid grid-cols-2'>
                                    <TableCell className='pb-10 grid grid-rows-3'>
                                      <label className='text-gray-400 flex flex-col pb-6'>
                                        Address
                                        <input type="text" className='w-auto px-4 py-2 border border-gray-300 rounded-md' name='address' value={formData.address} onChange={handleInputChange}/>
                                      </label>
                                      <label className='text-gray-400 flex flex-col'>
                                        City
                                        <input type="text" className='w-auto px-4 py-2 border border-gray-300 rounded-md' name='city' value={formData.city} onChange={handleInputChange}/>
                                      </label>
                                      <label className='text-gray-400 flex flex-col'>
                                        Phone
                                        <input type="text" className='w-auto px-4 py-2 border border-gray-300 rounded-md' name='phone' value={formData.phone} onChange={handleInputChange}/>
                                      </label>
                                    </TableCell>
                                    <TableCell className='pb-10 flex flex-col'>
                                      <label className='text-gray-400 flex flex-col pb-6'>
                                        Apartment
                                        <input type="text" className='w-auto px-4 py-2 border border-gray-300 rounded-md'/>
                                      </label>
                                      <div className='grid grid-cols-2 gap-4'>
                                        <label className='text-gray-400 flex flex-col'>
                                          Country
                                          <Select defaultValue="filter">
                                            <SelectTrigger className="w-auto border-2 h-10">
                                            <SelectValue placeholder="Country" />
                                            </SelectTrigger>
                                            <SelectContent>
                                            <SelectItem value="opt1">India</SelectItem>
                                            <SelectItem value="opt2">United States</SelectItem>
                                            <SelectItem value="opt3">Republic of Korea</SelectItem>
                                            <SelectItem value="opt4">Japan</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </label>
                                        <label className='text-gray-400 flex flex-col'>
                                          Poastal Code
                                          <input type="number" className='w-auto px-4 py-2 border border-gray-300 rounded-md'/>
                                        </label>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow></TableRow>
                                </TableBody>
                              </Table>
                            </CardContent>

                            <CardHeader>
                              <div className='font-bold'>
                                User Notes
                              </div>
                              <span className='text-gray-400'>
                                Add notes about user  
                              </span>        
                            </CardHeader>
                            <CardContent>
                              <Table>
                                <TableBody>
                                  <TableRow className='hover:bg-white'>
                                    <TableCell>
                                      <label className='text-gray-400 flex flex-col pb-6'>
                                        Notes
                                        <input type="text" placeholder='Add notes about user' className='w-auto h-[80px] px-4 border border-gray-300 rounded-md align-text-top' name='notes' value={formData.notes} onChange={handleInputChange}/>
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
                      <Link to="/user">
                        <Button
                        variant="secondary"
                        className="w-auto bg-[white] text-[#e0382a] border-2 mr-3"
                        >
                            Cancel
                        </Button>
                      </Link>
                        <Button
                        type = "submit"
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
  )
}