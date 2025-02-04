import React, { useState, useEffect } from 'react';
import { MdOutlineFileDownload } from "react-icons/md";
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

import {
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    PieChart,
    Pie,
    Cell
  } from "recharts";
    
import axios from 'axios';
import Header from '../../ui/Header';
import Sidebar from '../../ui/Sidebar';


const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-sm bg-green-900 py-3 px-5 text-xs text-white shadow-lg">
          <p className="font-medium">{`${payload[0].value} Bookings`}</p>
          <p className="text-gray-300">{`May 22, ${label}`}</p>
        </div>
      );
    }
    return null;
};

const CustomTooltip2 = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-sm bg-blue-900 py-2 px-3 text-xs text-white shadow-lg">
          <p className="font-medium">{`${payload[0].value} Bookings`}</p>
          <p className="text-gray-300">{`May 22, ${label}`}</p>
        </div>
      );
    }
    return null;
};

function Report() {
    const activeClass = "w-full justify-start gap-2 hover:text-gray-600 hover:bg-gray-50 bg-[#e0382a] text-white";
    const inactiveClass = "w-full justify-start gap-2 text-gray-600 hover:bg-gray-50";

    const [monthlyData, setMonthlyData] = useState([]);
    const [pieData1, setPieData1] = useState([]);
    const [pieData2, setPieData2] = useState([]);
    const [hourlyData, setHourlyData] = useState([]);
    const [topCustomers, setTopCustomers] = useState([]);
    const [topServices, setTopServices] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/monthlyReports')
            .then((res) => {
                setMonthlyData(res.data);
            })
            .catch((err) => {
                console.error('Error fetching Monthly Reports:', err);
            });
    
        axios.get('http://localhost:3000/api/pieData/1')
            .then((res) => {
                setPieData1(res.data);
            })
            .catch((err) => {
                console.error('Error fetching Pie Data 1:', err);
            });
    
        axios.get('http://localhost:3000/api/pieData/2')
            .then((res) => {
                setPieData2(res.data);
            })
            .catch((err) => {
                console.error('Error fetching Pie Data 2:', err);
            });
        
        axios.get('http://localhost:3000/api/hourlydata')
            .then((res) => {
                setHourlyData(res.data);
            })
            .catch((err) => {
                console.error('Error fetching Hourly Data:', err);
            })
        
        axios.get('http://localhost:3000/api/topcustomers')
            .then((res) => {
                setTopCustomers(res.data);
            })
            .catch((err) => {
                console.error(err)
            })
        
        axios.get('http://localhost:3000/api/topservices')
            .then((res) => {
                setTopServices(res.data);
            })
            .catch((err) => {
                console.error(err)
            })
    }, []);
    

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Header Section */}
        <Header />
        <div className="flex flex-row items-start justify-between mt-16">
            {/* Sidebar */}
            <Sidebar />
            <div className="flex-1 ml-64">
                <main className="p-6">
                    <div className='flex items-center justify-between mb-6'>
                        <h1 className='text-2xl font-semibold'>Reports</h1>
                        <div className='flex gap-1 justify-around bg-[#e0382a] text-white items-center py-1 px-6 rounded-sm'>
                            <MdOutlineFileDownload />
                            Export
                        </div>
                    </div>
                    <div className='grid grid-cols-4 gap-4'>
                        <div className='col-span-4'>
                            <Card>
                                <CardHeader>
                                    <div className='flex items-center justify-between mb-0 pb-0'>
                                        <CardContent className='font-semibold text-lg'>Customer Growth</CardContent>
                                        <Select defaultValue="last12">
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select time period" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="last12">Last 12 Hours</SelectItem>
                                                <SelectItem value="last24">Last 24 Hours</SelectItem>
                                                <SelectItem value="last7">Last 7 Days</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className='text-xs text-gray-600 flex gap-3 ml-6'>
                                        <div className='flex items-center gap-2'> <div className='h-3 w-3 bg-[#D7DBEC]'></div> Returning Customers</div>
                                        <div className='flex items-center gap-2'> <div className='h-3 w-3 bg-[#e0382a]'></div> New Customers</div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[250px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={monthlyData}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                                                <XAxis 
                                                    dataKey="month"
                                                    axisLine={{strokeDasharray: "3 3"}}
                                                    tick={{fontSize:12}}
                                                />
                                                <YAxis
                                                    tick={{fontSize:12}}
                                                />
                                                <Tooltip 
                                                    cursor={{fill: "transparent"}}
                                                    content={<CustomTooltip2 />}
                                                />
                                                <Bar 
                                                    dataKey="returningCustomers"
                                                    fill="#D7DBEC"
                                                    name="Returning Customers"
                                                    radius={[10,10,10,10]}
                                                    barSize={10}
                                                />
                                                <Bar 
                                                    dataKey="newCustomers"
                                                    fill="#e0382a"
                                                    name="New Customers"
                                                    radius={[10,10,10,10]}
                                                    barSize={10}
                                                />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className='col-span-4'>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4">
                                <Card className="h-[150px] rounded-tl-lg rounded-bl-lg rounded-tr-none rounded-br-none relative border-none relative overflow-hidden">
                                    <div className="h-full w-[1.3px] bg-gray-100 absolute right-0 top-0"></div>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 relative">
                                    <CardTitle className="text-2xl font-semibold">
                                        10,540
                                    </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                    <div className="text-sem font-semibold text-gray-500 pb-2">
                                        Existing User
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
                                <Card className="rounded-none relative border-none">
                                    <div className="h-full w-[1.3px] bg-gray-100 absolute right-0 top-0"></div>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 relative">
                                    <CardTitle className="text-2xl font-semibold">
                                        1,056
                                    </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                    <div className="text-sm font-bold text-gray-500 pb-2">
                                        New User
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

                                <Card className="rounded-none relative border-none relative">
                                    <div className="h-full w-[1.3px] bg-gray-100 absolute right-0 top-0"></div>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 relative">
                                    <CardTitle className="text-2xl font-semibold">48</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                    <div className="text-sm font-semibold text-gray-500 pb-2">
                                        Total Visits
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
                                        54200
                                    </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                    <div className="text-sm font-bold text-gray-500 pb-2">
                                        Unique Visits
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
                        </div>
                        <div className='col-span-1'>
                            <Card className='h-[350px]'>
                                <CardHeader className="font-semibold">
                                    Users Goal
                                </CardHeader>
                                <CardContent className="h-[200px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={pieData1}
                                                dataKey="value"
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={65}
                                                outerRadius={80}
                                                startAngle={90}
                                                endAngle={-270}
                                                fill="#e6e9f4"
                                            >
                                                <Cell fill="#ffc700" />
                                                <Cell fill="#e6e9f4" />
                                            </Pie>
                                            {/* Center Label */}
                                            <text
                                                x="50%" 
                                                y="50%" 
                                                textAnchor="middle" 
                                                dominantBaseline="middle" 
                                                fontSize="20"
                                                fontWeight="bold"
                                            >
                                                {pieData1[0]?.value}%
                                            </text>
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className='text-sm mt-6'>
                                        <div className="flex justify-between items-center">
                                            <div className='text-gray-500'>Sold for:</div>
                                            <div className='font-semibold'>$15,000</div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className='text-gray-500'>Monthly Goal:</div>
                                            <div className='font-semibold'>$20,000</div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className='text-gray-500'>Left:</div>
                                            <div className='font-semibold'>$5,000</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className='col-span-1'>
                            <Card className='h-[350px]'>
                                <CardHeader className="font-semibold">
                                    Conversion Rate
                                </CardHeader>
                                <CardContent className="h-[200px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={pieData2}
                                                dataKey="value"
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={65}
                                                outerRadius={80}
                                                startAngle={90}
                                                endAngle={-270}
                                                fill="#e6e9f4"
                                            >
                                                <Cell fill="#1fd286" />
                                                <Cell fill="#e6e9f4" />
                                            </Pie>
                                            {/* Center Label */}
                                            <text
                                                x="50%" 
                                                y="50%" 
                                                textAnchor="middle" 
                                                dominantBaseline="middle" 
                                                fontSize="20"
                                                fontWeight="bold"
                                            >
                                                {pieData2[0]?.value}%
                                            </text>
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className='text-sm mt-6'>
                                        <div className="flex justify-between items-center">
                                            <div className='text-gray-500'>Browsing:</div>
                                            <div className='font-semibold'>35%</div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className='text-gray-500'>Checkout:</div>
                                            <div className='font-semibold'>29%</div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className='text-gray-500'>Purchase:</div>
                                            <div className='font-semibold'>25%</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="col-span-2">
                            <Card className="h-[350px]">
                                <CardHeader className="font-semibold">
                                    <div>Average Spend on Servie per month</div>
                                    <div className='text-sm text-black font-semibold flex gap-3'>
                                        <div className='flex items-center gap-2'> <div className='text-gray-600 font-normal'>This Month</div> $48.20 </div>
                                        <div className='flex items-center gap-2'> <div className='text-gray-600 font-normal'>Previous Month</div> $48.20 </div>
                                    </div>
                                </CardHeader>
                                <CardContent className='h-[250px]'>
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <LineChart data={hourlyData}>
                                            <CartesianGrid vertical={false} />
                                            <XAxis
                                                className="text-sm text-gray-200"
                                                dataKey="time"
                                                axisLine={false}
                                                tickLine={false}
                                            />
                                            <YAxis
                                                className="text-sm text-gray-200"
                                                axisLine={false}
                                                tickLine={false}
                                            />
                                            <Tooltip content={<CustomTooltip />} />{" "}
                                            {/* Integrating the custom tooltip */}
                                            <Line
                                                dataKey="bookings"
                                                stroke="#e0382a"
                                                strokeWidth={3}
                                                dot={false}
                                                activeDot={{ r: 8, fill: "#002B19" }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>
                        <div className='col-span-2'>
                            <Card className="border-none">
                            <CardHeader className='font-semibold'>Top Customers</CardHeader>
                                <CardContent>
                                <Table>
                                    <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Bookings</TableHead>
                                        <TableHead>Spent</TableHead>
                                    </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                    {topCustomers.map((service) => (
                                        <TableRow key={service.name}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                            <img
                                                alt={service.name}
                                                className="h-8 w-8 rounded-full object-cover"
                                                src={service.image}
                                            />
                                            {service.name}
                                            </div>
                                        </TableCell>
                                        <TableCell>{service.bookings}</TableCell>
                                        <TableCell>{service.price}</TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                                </CardContent>
                            </Card>
                        </div>
                        <div className='col-span-2'>
                            <Card className="border-none">
                            <CardHeader className='font-semibold'>Top Services by Units Booked</CardHeader>
                                <CardContent>
                                <Table>
                                    <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Price (Avg)</TableHead>
                                        <TableHead>No. of Bookings</TableHead>
                                    </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                    {topServices.map((service) => (
                                        <TableRow key={service.name}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                            <img
                                                alt={service.name}
                                                className="h-8 w-8 rounded-full object-cover"
                                                src={service.image}
                                            />
                                            {service.name}
                                            </div>
                                        </TableCell>
                                        <TableCell>{service.price}</TableCell>
                                        <TableCell>{service.bookings}</TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
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

export default Report