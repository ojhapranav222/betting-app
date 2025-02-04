import * as React from "react";
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
} from "recharts";
import axios from "axios";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useState, useEffect } from "react";
import Sidebar from "../ui/Sidebar";
import Header from "../ui/Header";

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

const bookingStatuses = [
  { status: "Confirmed", date: "Today, 12:30 PM" },
  { status: "Pending", date: "Today, 10:30 AM" },
  { status: "Pending", date: "Today, 9:30 AM" },
  { status: "Confirmed", date: "Today, 8:30 AM" },
];

const CardIcon = () => (
  <div className="flex items-center justify-center h-14 w-14 rounded-full bg-[#f7f7d8] absolute top-[40px] right-[50px]">
    <img src="./dollar.png" className="h-6 w-6" alt="icon" />
  </div>
);

export default function Dashboard() {
  const [hourlyData, setHourlyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [topServices, setTopServices] = useState([]);

  useEffect(() => {
    // Fetch hourly data
    axios
      .get("http://localhost:3000/api/hourlydata")
      .then((response) => {
        setHourlyData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // Fetch weekly data
    axios
      .get("http://localhost:3000/api/weeklydata")
      .then((response) => {
        setWeeklyData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weekly data:", error);
      });

    // Fetch recent bookings
    axios
      .get("http://localhost:3000/api/recentbookings")
      .then((response) => {
        setRecentBookings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recent bookings:", error);
      });

    // Fetch top services
    axios
      .get("http://localhost:3000/api/topservices")
      .then((response) => {
        setTopServices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching top services:", error);
      });
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header Section */}
      <Header />
      <div className="flex flex-row items-start justify-between mt-16">
        {/* Sidebar */}
        <Sidebar />
        {/* Main Content */}
        <div className="flex-1 ml-64">
          {/* Dashboard Content */}
          <main className="p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">Dashboard</h1>
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

            {/* Stats */}
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4">
              <Card className="h-[150px] rounded-tl-lg rounded-bl-lg rounded-tr-none rounded-br-none border-none relative overflow-hidden">
                <div className="h-full w-[1.3px] bg-gray-100 absolute right-0 top-0"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 relative">
                  <CardTitle className="text-2xl font-semibold">
                    $10,540
                  </CardTitle>
                  <CardIcon /> {/* Reusable icon component */}
                </CardHeader>
                <CardContent>
                  <div className="text-sem font-semibold text-gray-500 pb-2">
                    Total Deposits
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
                    1,056
                  </CardTitle>
                  <CardIcon /> {/* Reusable icon component */}
                </CardHeader>
                <CardContent>
                  <div className="text-sm font-bold text-gray-500 pb-2">
                    Users
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
                  <CardTitle className="text-2xl font-semibold">48</CardTitle>
                  <CardIcon /> {/* Reusable icon component */}
                </CardHeader>
                <CardContent>
                  <div className="text-sm font-semibold text-gray-500 pb-2">
                    KYC Requests
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
                    542
                  </CardTitle>
                  <CardIcon /> {/* Reusable icon component */}
                </CardHeader>
                <CardContent>
                  <div className="text-sm font-bold text-gray-500 pb-2">
                    Active Users
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

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              {/* Bookings Over Time Card */}
              <Card className="lg:col-span-2 w-full sm:w-[112%] border-none">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="w-full">
                    <div className="flex flex-row items-center justify-between">
                      <CardTitle>Games Over Time</CardTitle>
                      <div className="flex items-center">
                        <Select defaultValue="last12">
                          <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder="Select period" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="last12">
                              Last 12 Hours
                            </SelectItem>
                            <SelectItem value="last24">
                              Last 24 Hours
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="mt-10">
                      <div className="w-full flex flex-row items-center justify-between">
                        {/* Orders Data */}
                        <div className="flex gap-8 mb-4">
                          <div className="text-left">
                            <h3 className="text-2xl font-bold text-gray-900">
                              645
                            </h3>
                            <p className="text-sm text-gray-500">
                              Deposits on May 22
                            </p>
                          </div>
                          <div className="text-left">
                            <h3 className="text-2xl font-bold text-gray-900">
                              472
                            </h3>
                            <p className="text-sm text-gray-500">
                              Deposits on May 21
                            </p>
                          </div>
                        </div>

                        {/* Legend */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-gray-200 rounded"></div>
                            <span className="text-sm text-gray-500">
                              May 21
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-800 rounded"></div>
                            <span className="text-sm text-gray-500">
                              May 22
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="mt-10 px-0">
                  <div className="h-[250px]">
                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                      className="pr-10"
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
                  </div>
                </CardContent>
              </Card>

              {/* Last 7 Days Bookings Card */}
              <Card className="w-full sm:w-[75%] ml-auto border-none">
                <CardHeader>
                  <CardTitle className="mb-8">Last 7 Days Games</CardTitle>
                  <div className="mt-10">
                    <div className="text-2xl font-bold">1,259</div>
                    <div className="text-sm text-gray-500">Bookings</div>
                    <div className="mt-4 text-2xl font-bold">$12,546</div>
                    <div className="text-sm text-gray-500">Revenue</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[1.2px] w-full bg-gray-200 my-5"></div>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyData}>
                        <XAxis
                          dataKey="day"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis hide />
                        <Tooltip
                          cursor={{ fill: "transparent" }}
                          content={<CustomTooltip2 />}
                        />
                        <Bar
                          dataKey="revenue"
                          fill="#FF4F4F"
                          radius={[10, 10, 10, 10]}
                          barSize={10}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tables */}
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <Card className="border-none">
                <CardHeader>
                  <CardTitle>Recent Deposits</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentBookings.map((booking) => (
                        <TableRow key={booking.name}>
                          <TableCell className="font-medium">
                            {booking.name}
                          </TableCell>
                          <TableCell>{booking.date}</TableCell>
                          <TableCell>{booking.amount}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center rounded-md px-4 py-1 text-md ${
                                booking.status === "Confirmed"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {booking.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card className="border-none">
                <CardHeader>
                  <CardTitle>Top Services by Units Booked</CardTitle>
                </CardHeader>
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
          </main>
        </div>
      </div>
    </div>
  );
}
