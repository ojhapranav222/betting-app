import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from "../../ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { Card, CardContent, CardHeader } from '../../ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../../ui/table";

import axios from 'axios';
import { RiCloseFill } from 'react-icons/ri';
import Header from '../../ui/Header';
import Sidebar from '../../ui/Sidebar';

const EditUser = () => {
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState(null)
    const navigate = useNavigate();
    const [add, setAdd] = useState('');
    const [reduce, setReduce] = useState('');
    const baseUrl = import.meta.env.VITE_BACKEND_URL
    const [transaction, setTransaction] = useState(null);
    const [error, setError] = useState(null)
    
    async function fetchData() {
        if (id) {
            try {
                const response = await axios.get(`${baseUrl}/api/v1/user/admin/user-data/${id}`);
                const deposits = await axios.get(`${baseUrl}/api/v1/deposit/user/${id}`);
                setUserData(response.data);
                setTransaction(deposits.data)
            } catch (error) {
                console.error(error);
            }
        }
    }
    
    useEffect(() => {
        fetchData();
        }, [id])
        console.log(transaction)

    async function deleteTag(tagToDelete){
        try {
            await axios.delete(`http://localhost:3000/api/user/${id}/tags`, { data: { tag: tagToDelete } });
            setTags((prevTags) => prevTags.filter(tag => tag !== tagToDelete));
        } catch (error) {
            console.error("Error deleting tag:", error);
        }
    };

    function handleChange(e){
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };
    
    function toggleEdit(){setIsEditing(!isEditing)};

    async function deleteUser(id){
        try{
            const response = await axios.delete(`http://localhost:3000/api/user/${id}`);
            alert("User Deleted Successfully");
            navigate("/user");
        } catch(err) {
            console.error(err);
        }
    }

    async function handleSave(){
        try{
            await axios.patch(`http://localhost:3000/api/user/${id}`, userData);
            setIsEditing(false);
            alert("User data updated successfully");
        }catch(err){
            console.error(err);
            alert("User data was not updated due to an error");
        }
    }

    async function handleAdd() {
        if (add !== '') {
          await axios.post(`${baseUrl}/api/v1/wallet/add`, {
            userId: id,
            amount: parseFloat(add)
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
          })
          .then((response) => {
            console.log(response.data);
            setAdd('');
          })
          .catch((error) => {
            console.error(error);
          })
        }

        fetchData();
      };
      
      async function handleReduce() {
        if (reduce !== ''){ 
            await axios.post(`${baseUrl}/api/v1/wallet/deduct`, {
                userId: id,
                amount: parseFloat(reduce)
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
              })
              .then((response) => {
                console.log(response.data);
                setReduce(''); 
              })
              .catch((error) => {
                console.error(error.response.data.message);
                setError(error.response.data.message)
              })
        }
        fetchData();
      };
    
      function handleKeyPress(event){
        if (event.key === 'Enter') {
          if (event.target.id === 'addInput') {
            handleAdd();
          } else if (event.target.id === 'reduceInput') {
            handleReduce();
          }
        }
      };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <div className="flex flex-row items-start justify-between mt-16">
            {/* Sidebar */}
            <Sidebar />
            <div className="flex-1 ml-64">
                {/* User Content */}
                <main className="p-6">
                    <div className="flex items-center justify-between text-sm">
                        <div>
                            <Link to="/admin/users" className='flex items-center text-gray-400 hover:text-black'>
                                <FaArrowLeft />
                                <span className='pl-2'>Back</span>
                            </Link>
                            <h1 className="text-2xl font-semibold">User Information</h1>
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
                            onClick={handleSave}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                    <div className="w-full mt-6 pb-6 flex flex-row gap-4">
                        <div className='flex flex-col gap-4 basis-2/3'>
                            <Card>
                                <CardContent>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="flex p-8 items-center">
                                                    { userData ? (
                                                        <div className="flex items-center">
                                                        <div className="bg-[#e03820] p-4 rounded-full text-2xl h-16 w-16 flex items-center justify-center text-white font-bold mr-4">
                                                        {userData.user.name[0]}
                                                        </div>
                                                
                                                        <div>
                                                        <div className="font-bold mb-1">{userData.user.name}</div>
                                                        <div>
                                                            <div>Pincode: {userData.user.pincode}</div>
                                                            <div>State: {userData.user.state}</div>
                                                            <div>User since: {userData.user.registration_date.split("T")[0]}</div>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    ) : (<div>
                                                        Cannot fetch data: {JSON.stringify(userData)}
                                                    </div>) }
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                            <Card>
                            <CardContent>
                                <CardHeader className='font-bold'>Deposit History</CardHeader>
                                    <Table>
                                        <TableHeader className='border-b-2'>
                                        <TableRow>
                                            <TableHead>ID</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Amount</TableHead>
                                        </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                        {transaction?.deposits ? (transaction.deposits.map((order) => (
                                            <TableRow key={order.id}>
                                            <TableCell>{order.id}</TableCell>
                                            <TableCell>
                                                <span
                                                className={`inline-flex items-center rounded-md px-4 py-1 text-white text-md ${
                                                    order.status === "approved"
                                                    ? "bg-green-600"
                                                    : "bg-gray-400"
                                                }`}
                                                >
                                                {order.status}
                                                </span>
                                            </TableCell>
                                            <TableCell>${order.amount}</TableCell>
                                            
                                            <TableCell>{order.created_at.split("T")[0]}</TableCell>
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
                            </Card>
                        </div>
                        <div className='flex flex-col gap-4 basis-1/3'>
                            <Card>
                                {/* <CardContent>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="flex p-8 items-center">
                                                    {userOrderData.success ? (
                                                        <div className='w-full'>
                                                            <div className='flex justify-between w-auto'>
                                                                <div className="font-bold mb-6">Overview</div>
                                                                <div className='text-blue-600 cursor-pointer' onClick={toggleEdit}>
                                                                    {isEditing ? "Save" : "Edit"}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className='flex flex-col mb-6'>
                                                                    <span className='text-gray-400'>Address</span>
                                                                    {isEditing ? (
                                                                        <input
                                                                        type="text"
                                                                        name="address"
                                                                        value={userData.address}
                                                                        onChange={handleChange}
                                                                        className="border px-2 py-1 rounded"
                                                                        />
                                                                    ) : (
                                                                        userData.address
                                                                    )}
                                                                </div>
                                                                <div className='flex flex-col mb-6'>
                                                                    <span className='text-gray-400'>E-mail</span>
                                                                    {isEditing ? (
                                                                        <input
                                                                        type="email"
                                                                        name="email"
                                                                        value={userData.email}
                                                                        onChange={handleChange}
                                                                        className="border px-2 py-1 rounded"
                                                                        />
                                                                    ) : (
                                                                        userData.email
                                                                    )}
                                                                </div>
                                                                <div className='flex flex-col'>
                                                                    <span className='text-gray-400'>Phone</span>
                                                                    {isEditing ? (
                                                                        <input
                                                                        type="text"
                                                                        name="phoneNumber"
                                                                        value={userData.phoneNumber}
                                                                        onChange={handleChange}
                                                                        className="border px-2 py-1 rounded"
                                                                        />
                                                                    ) : (
                                                                        userData.phoneNumber
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div>Cannot fetch data: {JSON.stringify(userOrderData)}</div>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <div className='text-red-600 cursor-pointer' onClick={() => deleteUser(id)}>
                                                        Delete User
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent> */}
                            </Card>
                            <Card>
                                <CardHeader className='font-bold'>Balance</CardHeader>
                                
                                <CardContent>
                                    <div className='font-semibold text-xl mb-4'>₹{userData?.user.balance}</div>
                                    <label className='text-gray-400 flex flex-col'>
                                        Add Balance
                                        <input type='text' id='addInput' placeholder='Add balance' className='w-auto h-[60px] px-4 border rounded-sm border-gray-300' name='tags' value={add} onChange={(e) => setAdd(e.target.value)} onKeyPress ={handleKeyPress}/>
                                    </label>
                                    <label className='text-gray-400 flex flex-col mt-4'>
                                        Deduct Balance
                                        <input type='text' id='reduceInput' placeholder='Deduct balance' className='w-auto h-[60px] px-4 border rounded-sm border-gray-300' name='tags' value={reduce} onChange={(e) => setReduce(e.target.value)} onKeyPress ={handleKeyPress} />
                                        {error && <div className='text-red-600 text-sm'>{error}</div>}
                                    </label>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </div>
  )
}

export default EditUser;