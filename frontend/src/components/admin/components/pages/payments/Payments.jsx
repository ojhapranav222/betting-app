import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "../../ui/button";
import {
    FiSearch,
    FiTrash,
    FiPlus
  } from "react-icons/fi";
import { FaArrowLeft, FaSortAlphaDown, FaArrowRight } from "react-icons/fa";
import { RiEditLine } from 'react-icons/ri';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../../ui/table";

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

function DepositStatusCell({ deposit, activeDropdown, setActiveDropdown, fetchDeposits }) {
    const [status, setStatus] = useState(deposit.status);
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
  
    const handleStatusUpdate = async (newStatus) => {
      try {
        await axios.put(
          `${baseUrl}/api/v1/deposit/update-status`,
          { depositId: deposit.id, status: newStatus },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
  
        setStatus(newStatus); // Update UI
        setActiveDropdown(null); // Close dropdown
      } catch (error) {
        console.error("Error updating deposit status:", error);
        alert("Failed to update deposit status. Please try again.");
      }
    };
  
    return (
      <TableCell>
        <div className="relative">
          {/* Status Display */}
          <span
            className={`cursor-pointer px-4 py-1 rounded-md text-white ${
              status === "pending"
                ? "bg-[#ffbf00]"
                : status === "approved"
                ? "bg-green-600"
                : status === "rejected"
                ? "bg-red-600"
                : "bg-black"
            }`}
            onClick={() =>
              setActiveDropdown(activeDropdown === deposit.id ? null : deposit.id)
            }
          >
            {status}
          </span>
  
          {/* Dropdown (only when clicked & not already updated) */}
          {activeDropdown === deposit.id && (
            <div className="absolute top-full left-0 mt-2 w-32 bg-gray-800 shadow-lg rounded-md">
              <button
                className="block w-full text-left px-4 py-2 text-white hover:bg-green-600"
                onClick={() => handleStatusUpdate("approved")}
              >
                ✅ Approve
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-white hover:bg-red-600"
                onClick={() => handleStatusUpdate("rejected")}
              >
                ❌ Reject
              </button>
            </div>
          )}
        </div>
      </TableCell>
    );
  }

function Appointment() {

    const [depositsPerPage, setDepositsPerPage] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [status, setStatus] = useState("");
    const [selectedDeposits, setSelectedDeposits] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const baseUrl = import.meta.env.VITE_BACKEND_URL

    useEffect(() => {
        axios
            .get(`${baseUrl}/api/v1/deposit/all`, {
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((response) => {
                setDepositsPerPage(response.data);
            })
            .catch((err) => {
                console.error(err);
            })
    }, [selectedDeposits, status, currentPage]);

    function handleSelectAll(){
        try{
            if (selectedDeposits.length===depositsPerPage.deposits.length){
                setSelectedDeposits([]);
                setIsAllSelected(false);
            } else {
                setSelectedDeposits(depositsPerPage.deposits.map((deposit) => deposit.id));
                setIsAllSelected(true);
            }
        } catch(err){
            console.error(err);
        }
    }

    function handleAppointmentSelect(id){
        setSelectedDeposits((prevSelectedAppointment) => {
            if (prevSelectedAppointment.includes(id)){
                return prevSelectedAppointment.filter((id) => id !== id);
            } else {
                return [...prevSelectedAppointment, id];
            }
        })
    }

    //changing papge
    function handlePageChange(newPage){
        setCurrentPage(newPage);
    }

    //enabling filter
    function handleStatusChange(newStatus){
        setStatus(newStatus);
        setCurrentPage(1);
    }

  return (
    <div className="flex flex-col min-h-screen w-screen overflow-x-hidden sm:w-auto bg-gray-100">
        {/* Header Section */}
      <Header />
      <div className="flex flex-row items-start justify-between mt-16">
        {/* Sidebar */}
        <Sidebar />
        {/* Main */}
        <div className='flex-1 sm:ml-64'>
            <main className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Deposit History</h1>
                    <div className='flex gap-6'>
                        <Button
                            variant="secondary"
                            className="w-auto bg-[white] text-[#e0382a] border-2"
                            >
                            Export
                        </Button>
                    </div>
                </div>
                {/* Table */}
                <div className="w-screen sm:w-full mt-6">
                    <Card className="border-none">
                        <CardHeader>
                            <div className="header flex justify-between">
                                <div className="left flex">
                                    <Select defaultValue="All" value={status} onValueChange={(newVal) => handleStatusChange(newVal)}>
                                        <SelectTrigger className="w-[180px] border-2 h-10">
                                        <SelectValue placeholder="Filter" />
                                        </SelectTrigger>
                                        <SelectContent className='z-10 bg-white'>
                                            <SelectItem value="New">Processed</SelectItem>
                                            <SelectItem value="Active">Pending</SelectItem>
                                            <SelectItem value="Scheduled">Rejected</SelectItem>
                                            <SelectItem value="All">All</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <div className='flex'>
                                        <FiSearch className="w-5 h-5 text-gray-400 relative left-8 top-2" />
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            className="w-[360px] h-10 pl-10 pr-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                                        />
                                    </div>
                                </div>
                                <div className='right flex text-[#e0382a]'>
                                    <FaSortAlphaDown className='border-2 mx-1 h-9 w-9 p-2 rounded-md'/>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table className='w-screen overflow-x-scroll sm:w-auto'>
                                <TableHeader className='border-b-2'>
                                <TableRow>
                                    <TableHead>
                                        <label className='flex items-center'>
                                            <input type="checkbox" className='mx-2 h-4 w-4' checked={isAllSelected} onChange={handleSelectAll} />
                                            <span>Id</span>
                                        </label>
                                    </TableHead>
                                    <TableHead>User Name</TableHead>
                                    <TableHead>User Id</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Payment Date</TableHead>
                                    <TableHead>Screenshot</TableHead>
                                </TableRow>
                                </TableHeader>
                                <TableBody>
                                {depositsPerPage.deposits && depositsPerPage.deposits.length>0 ? (depositsPerPage.deposits.map((deposit) => (
                                    <TableRow key={deposit.id}>
                                    <TableCell className="font-medium">
                                        <label className='flex items-center'>
                                            <input 
                                            type="checkbox" 
                                            className='mx-2 h-4 w-4'
                                            checked={selectedDeposits.includes(deposit.id)}
                                            onChange={() => handleAppointmentSelect(deposit.id)} />
                                            {deposit.id}
                                        </label>
                                    </TableCell>
                                    <TableCell>{deposit.user_name}</TableCell>
                                    <TableCell>{deposit.user_id}</TableCell>
                                    <TableCell>{deposit.amount}</TableCell>
                                    <DepositStatusCell
                                        deposit={deposit}
                                        activeDropdown={activeDropdown}
                                        setActiveDropdown={setActiveDropdown}
                                    />
                                    <TableCell>{deposit.created_at.split("T")[0]}</TableCell>
                                    <TableCell>
                                        <img 
                                            src={deposit.screenshot} 
                                            alt="Deposit Screenshot"
                                            className="h-20 cursor-pointer"
                                            onClick={() => {setIsOpen(deposit.screenshot)
                                                console.log(deposit.screenshot)
                                            }}
                                        />
                                    </TableCell>
                                    </TableRow>

                                ))
                                ) : (
                                    <TableRow>
                                        <TableCell colspan={6} align='center'>
                                            No data available
                                        </TableCell>
                                    </TableRow>
                                )}
                                </TableBody>
                            </Table>
                            {isOpen && (
                                <div
                                    className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
                                    onClick={() => setIsOpen(null)}
                                >
                                    <div className="p-4 bg-white rounded-lg shadow-lg">
                                        <img src={isOpen} alt="Deposit Screenshot" className="max-h-screen" />
                                    </div>
                                </div>
                            )}
                        </CardContent>
                        <CardContent>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center'>
                                    <FaArrowLeft 
                                        onClick={() => setCurrentPage((prevPage) => Math.max(prevPage-1, 1))}
                                        className='cursor-pointer hover:text-gray-400'
                                    />
                                    {[...Array(totalPage)].map((_, index) => (
                                        <Button
                                        key={index + 1}
                                        variant={index + 1 === currentPage ? "contained" : "outlined"}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={`mx-1 ${index+1 === currentPage
                                            ? "bg-blue-100 text-blue-600"
                                            : "bg-white text-gray-400"
                                        }`}
                                        >
                                        {index + 1}
                                        </Button>
                                    ))}
                                    <FaArrowRight 
                                        onClick={() => setCurrentPage((nextPage) => Math.min(nextPage+1, totalPage))}
                                        className='cursor-pointer hover:text-gray-400'
                                    />
                                </div>
                                <div>
                                    10 results
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
            
        </div>
    </div>

    </div>
  )
}

export default Appointment