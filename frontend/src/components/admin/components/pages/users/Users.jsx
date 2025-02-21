import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "../../ui/button";
import {
    FiSearch,
    FiPlus,
    FiTrash,
  } from "react-icons/fi";
import { FaArrowLeft, FaArrowRight, FaSortAlphaDown } from "react-icons/fa";
import {RiEditLine} from "react-icons/ri";
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
import Sidebar from '../../ui/Sidebar';
import Header from '../../ui/Header';
import useSmallScreen from '../../../../ui/SmallScreen';

const CardIcon = () => (
    <div className="flex items-center justify-center h-14 w-14 rounded-full bg-[#f7f7d8] absolute top-[40px] right-[50px]">
      <img src="./dollar.png" className="h-6 w-6" alt="icon" />
    </div>
  );

export default function User() {
    const [userData, setUserData] = useState([]);
    const [userPerPage, setUserPerPage] = useState({});
    const [totalPage, setTotalPage] = useState(0); 
    const [currentPage, setCurrentPage]= useState(1);

    const [selectedUser, setSelectedUser] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [status, setStatus] = useState("");
    const navigate = useNavigate();
    const isSmallScreen = useSmallScreen();
    const baseUrl = import.meta.env.VITE_BACKEND_URL

    function handleStatusChange(newStatus){
        setStatus(newStatus);
        setCurrentPage(1);
    }

    useEffect(() => {
        //Fetching only 10 users using pagination
        axios
            .get(`${baseUrl}/api/v1/user/admin/all`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            })
            .then((response) => {
                setUserPerPage(response.data);
                setTotalPage(response.data.totalPages);
            })
            .catch((error) => {
                console.error("Error fetching data:", error.response.data);
            })
    }, [selectedUser, currentPage, status])

    function handleSelectAll(){
        try{
            if (selectedUser.length === userPerPage.users.length) {
                setSelectedUser([]);
                setIsAllSelected(false);
            } else {
                setSelectedUser(userPerPage.users.map((user) => user.userId));
                setIsAllSelected(true);
            }
        } catch(err){
            console.error(err);
        }
    }

    function handleUserSelect(userId){
        setSelectedUser((prevSelectedUsers) => {
            if (prevSelectedUsers.includes(userId)) {
                return prevSelectedUsers.filter((id) => id !== userId);
            } else {
                return [...prevSelectedUsers, userId];
            }
        });
    }

    function handlePageChange(page){
        setCurrentPage(page);
    }
    let result = -1;
    if (userPerPage.users && userPerPage.users.length>0){
        result = userPerPage.users.length;
    }

    async function deleteSelectedUsers(){
        if (selectedUser.length===0){
            alert("No user was selected");
            return;
        }

        try{
            const response = await axios.post('http://localhost:3000/api/user/delete', {userIds: selectedUser});
            setSelectedUser([]);
            alert("Selected users deleted");
            navigate("/admin/users");
        }catch(err){
            console.error(err);
        }
    }

    function editSelectedUser(){
        if (selectedUser.length===0){
            alert("No user was selected");
            return;
        } else if (selectedUser.length>1){
            alert("More than one users selected");
            return;
        }

        const userId = selectedUser[0];
        navigate(`/admin/user/edit/${userId}`);
    }
    
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 overflow-hidden">
        <Header />
        <div className="flex flex-row items-start mt-16">
            {/* Sidebar */}
            <Sidebar />
            {/* Main Content */}
            <div className="flex-1 sm:ml-64">
                {/* User Content */}
                <main className="p-6">
                    <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Users</h1>
                    <Button
                        variant="secondary"
                        className="w-auto bg-[white] text-[#e0382a] border-2"
                        >
                            Export
                        </Button>
                        </div>

                    {/* Table */}
                    <div className="w-screen sm:w-[100%] mt-6 overflow-hidden sm:overflow-auto">
                        <Card className="border-none">
                            <CardHeader>
                                <div className="header flex justify-between">
                                    <div className="left flex">
                                        <Select defaultValue="All" value={status} onValueChange={(newVal) => handleStatusChange(newVal)}>
                                            <SelectTrigger className="w-[180px] border-2 h-10">
                                            <SelectValue placeholder="Filter" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Active">Active</SelectItem>
                                                <SelectItem value="Inactive">Inactive</SelectItem>
                                                <SelectItem value="Suspended">Suspended</SelectItem>
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
                                        <RiEditLine className='border-2 mx-1 h-9 w-9 p-2 absolute left-0 sm:static rounded-md cursor-pointer' onClick={editSelectedUser}/>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table className = 'w-[100%] overflow-x-scroll'>
                                    <TableHeader className='border-b-2'>
                                    <TableRow>
                                        <TableHead>
                                            <label className='flex items-center'>
                                                <input type="checkbox" className='mx-2 h-4 w-4' checked={isAllSelected} onChange={handleSelectAll}/>
                                                <span>User Id</span>
                                            </label>
                                        </TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Phone Number</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Balance</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Date Joined</TableHead>
                                    </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                    {userPerPage.users && userPerPage.users.length>0 ? (userPerPage.users.map((user) => (
                                        <TableRow key={user.id}>
                                        <TableCell className="font-medium">
                                            <label className='flex items-center'>
                                                <input 
                                                    type="checkbox" 
                                                    className='mx-2 h-4 w-4' 
                                                    checked={selectedUser.includes(user.id)}
                                                    onChange={() => handleUserSelect(user.id)}/>
                                                {user.id}
                                            </label>
                                        </TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.phone_number}</TableCell>
                                        <TableCell>
                                            <span
                                            className={`inline-flex items-center rounded-md px-4 py-1 text-white text-md ${
                                                user.status === "active"
                                                ? "bg-green-600"
                                                : user.status === "Inactive"
                                                ? "bg-[#ffbf00]"
                                                : "bg-red-600"
                                            }`}
                                            >
                                            {user.status}
                                            </span>
                                        </TableCell>
                                        <TableCell>{user.balance}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell>{user.registration_date?.split("T")[0]}</TableCell>
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