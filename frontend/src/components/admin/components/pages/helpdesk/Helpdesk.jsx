import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "../../ui/button";
import { FaWhatsapp } from "react-icons/fa";
import {
    FiSearch,
    FiTrash
  } from "react-icons/fi";
import { FaArrowLeft, FaSortAlphaDown, FaArrowRight } from "react-icons/fa";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
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

const CardIcon = () => (
    <div className="flex items-center justify-center h-14 w-14 rounded-full bg-[#f7f7d8] absolute top-[40px] right-[50px]">
      <img src="./dollar.png" className="h-6 w-6" alt="icon" />
    </div>
  );

function HelpDesk() {

    const [disputeStats, setDisputeStats] = useState([]);
    const [disputesPerPage, setDisputesPerPage] = useState({});
    const [latestDispute, setLatestDispute] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [status, setStatus] = useState("");
    const [selectedDisputes, setSelectedDisputes] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/disputes/stats`)
            .then((response) => {
                setDisputeStats(response.data);
            })
            .catch((err) =>{
                console.error(err);
            })
    }, [selectedDisputes])

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/disputes`, {
                params:{
                    page: currentPage,
                    status: status
                }
            })
            .then((response) => {
                setDisputesPerPage(response.data);
                setTotalPage(response.data.totalPages)
            })
            .catch((err) => {
                console.error(err);
            })
    }, [selectedDisputes, status, currentPage]);

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/disputes/latest")
            .then((response) => {
                setLatestDispute(response.data);
            })
            .catch((err) => {
                console.error(err);
            })
    }, [])

    let result = -1;
    if (disputesPerPage.disputes && disputesPerPage.disputes.length > 0) {
        result=disputesPerPage.disputes.length;
    }

    function handleSelectAll(){
        try{
            if (selectedDisputes.length===disputesPerPage.disputes.length){
                setSelectedDisputes([]);
                setIsAllSelected(false);
            } else {
                setSelectedDisputes(disputesPerPage.disputes.map((dispute) => dispute.disputeId));
                setIsAllSelected(true);
            }
        } catch(err){
            console.error(err);
        }
    }

    function handleDisputeSelect(disputeId){
        setSelectedDisputes((prevSelectedDisputes) => {
            if (prevSelectedDisputes.includes(disputeId)){
                return prevSelectedDisputes.filter((id) => id !== disputeId);
            } else {
                return [...prevSelectedDisputes, disputeId];
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

    //bulk delete
    async function deleteSelectedDisputes(){
        if (selectedDisputes.length===0){
            alert("No user was selected");
            return;
        }

        try{
            const response = await axios.post("http://localhost:3000/api/disputes/delete", {disputeIds: selectedDisputes});
            setSelectedDisputes([]);
            alert("Selected appointments deleted");
            navigate("/appointments");
        } catch(err){
            console.error(err);
        }
    }

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
                    <h1 className="text-2xl font-semibold">Complaints</h1>
                    <div className='flex justify-evenly w-[250px]'>
                        <Link to='/disputes/chats'>
                            <Button
                                variant="secondary"
                                className="w-auto text-[white] hover:text-[#e0382a] bg-[#e0382a] hover:bg-white transition-all duration-200 border-2 flex items-center"
                                >
                                <FaWhatsapp />
                                Chat
                            </Button>   
                        </Link>
                        <Button
                            variant="secondary"
                            className="w-auto bg-[white] text-[#e0382a] border-2"
                            >
                            Export
                        </Button>
                    </div>
                </div>
                {/* Stats */}
                <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="h-[150px] rounded-tl-lg rounded-bl-lg rounded-tr-none rounded-br-none border-none relative overflow-hidden">
                        <div className="h-full w-[1.3px] bg-gray-100 absolute right-0 top-0"></div>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 relative">
                        <CardTitle className="text-2xl font-semibold">
                            {disputeStats.totalNumber}
                        </CardTitle>
                        <CardIcon /> {/* Reusable icon component */}
                        </CardHeader>
                        <CardContent>
                        <div className="text-sem font-semibold text-gray-500 pb-2">
                            Total Complaints
                        </div>
                        <div className="flex items-center   gap-4">
                            <span className="text-green-600 text-md">22.45%</span>
                            <svg
                            class="h-5 w-5 text-green-600 "
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            >
                            <path
                                d="M5 15l7-7 7 7"
                                stroke-width="3"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            </svg>
                        </div>
                        </CardContent>
                    </Card>
                    <Card className="rounded-none border-none relative">
                        <div className="h-full w-[1.3px] bg-gray-100 absolute right-0 top-0"></div>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 relative">
                        <CardTitle className="text-2xl font-semibold">
                            {disputeStats.totalNumberResolved}
                        </CardTitle>
                        <CardIcon /> {/* Reusable icon component */}
                        </CardHeader>
                        <CardContent>
                        <div className="text-sm font-semibold text-gray-500 pb-2">
                            Resolved Complaints
                        </div>
                        <div className="flex items-center text-md text-green-600 gap-4">
                            <span>15.34%</span>
                            <svg
                            class="h-5 w-5 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            >
                            <path
                                d="M5 15l7-7 7 7"
                                stroke-width="3"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            </svg>
                        </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-none border-none relative">
                        <div className="h-full w-[1.3px] bg-gray-100 absolute right-0 top-0"></div>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 relative">
                        <CardTitle className="text-2xl font-semibold">
                            {disputeStats.totalNumberInProgress}
                        </CardTitle>
                        <CardIcon /> {/* Reusable icon component */}
                        </CardHeader>
                        <CardContent>
                        <div className="text-sm font-semibold text-gray-500 pb-2">
                            Complaints In Progress
                        </div>
                        <div className="flex items-center text-md text-red-600 gap-4">
                            <span>18.25%</span>
                            <svg
                            class="h-5 w-5 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            >
                            <path
                                d="M19 9l-7 7-7-7"
                                stroke-width="3"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            </svg>
                        </div>
                        </CardContent>
                    </Card>
                    <Card className="rounded-tl-none rounded-bl-none rounded-tr-lg rounded-br-lg relative border-none">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 relative">
                        <CardTitle className="text-2xl font-semibold">
                            {disputeStats.totalNumberNew}
                        </CardTitle>
                        <CardIcon /> {/* Reusable icon component */}
                        </CardHeader>
                        <CardContent>
                        <div className="text-sm font-semibold text-gray-500 pb-2">
                            New Complaints
                        </div>
                        <div className="flex items-center text-md text-green-600 gap-4">
                            <span>10.24%</span>
                            <svg
                            class="h-5 w-5 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            >
                            <path
                                d="M5 15l7-7 7 7"
                                stroke-width="3"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            </svg>
                        </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Additional Card */}
                {latestDispute ? (
                    <div className='w-full mt-6'>
                        <Card className="border-none">
                            <CardHeader className='font-bold text-lg pb-0'>{latestDispute.disputeId}: Title - {latestDispute.subject}</CardHeader>
                            <CardContent className='flex justify-between items-center'>
                                <div>
                                    <div className='text-[#e0382a]'>Date Submitted: {latestDispute.date}</div>
                                    <div>Description: {latestDispute.description}</div>
                                    <div>From: {latestDispute.name}</div>
                                    <div>To: Partner</div>
                                </div>
                                <div>
                                    <div className='border-2 border-gray-100 p-2 rounded-lg text-center cursor-pointer hover:bg-[#e0382a] hover:text-white mb-1'>Mark as Solved</div>
                                    <div className='border-2 border-gray-100 p-2 rounded-lg text-center cursor-pointer hover:bg-[#e0382a] hover:text-[white]'>Reply</div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ):(
                    <div className='w-full mt-6'>
                        No value to display
                    </div>
                )}

                {/* Table */}
                <div className="w-full mt-6">
                    <Card className="border-none">
                        <CardHeader>
                            <div className="header flex justify-between">
                                <div className="left flex">
                                    <Select defaultValue="All" value={status} onValueChange={(newVal) => handleStatusChange(newVal)}>
                                        <SelectTrigger className="w-[180px] border-2 h-10">
                                        <SelectValue placeholder="Filter" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="New">New</SelectItem>
                                            <SelectItem value="Resolved">Resolved</SelectItem>
                                            <SelectItem value="Inprogress">Inprogress</SelectItem>
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
                                    <RiEditLine className='border-2 mx-1 h-9 w-9 p-2 rounded-md cursor-pointer' />
                                    <FiTrash className='border-2 mx-1 h-9 w-9 p-2 rounded-md cursor-pointer'
                                        onClick = {deleteSelectedDisputes}
                                    />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader className='border-b-2'>
                                <TableRow>
                                    <TableHead>
                                        <label className='flex items-center'>
                                            <input type="checkbox" className='mx-2 h-4 w-4' checked={isAllSelected} onChange={handleSelectAll} />
                                            <span>Complaint Id</span>
                                        </label>
                                    </TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Complaint Type</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date Submitted</TableHead>
                                </TableRow>
                                </TableHeader>
                                <TableBody>
                                {disputesPerPage.disputes && disputesPerPage.disputes.length>0 ? (disputesPerPage.disputes.map((dispute) => (
                                    <TableRow key={dispute.disputeId}>
                                    <TableCell className="font-medium">
                                        <label className='flex items-center'>
                                            <input 
                                            type="checkbox" 
                                            className='mx-2 h-4 w-4'
                                            checked={selectedDisputes.includes(dispute.disputeId)}
                                            onChange={() => handleDisputeSelect(dispute.disputeId)} />
                                            {dispute.disputeId}
                                        </label>
                                    </TableCell>
                                    <TableCell>{dispute.name}</TableCell>
                                    <TableCell>{dispute.subject}</TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center rounded-md px-4 py-1 text-white text-md ${
                                            dispute.status === 'Inprogress'
                                            ? 'bg-[#ffbf00]'
                                            : dispute.status === 'Resolved'
                                            ? 'bg-green-600'
                                            : 'bg-black'
                                        }`}>
                                            {dispute.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>{dispute.date}</TableCell>
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
                                    {result} results
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

export default HelpDesk