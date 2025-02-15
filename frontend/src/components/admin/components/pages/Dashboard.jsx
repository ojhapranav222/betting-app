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

const CardIcon = () => (
  <div className="flex items-center justify-center h-14 w-14 rounded-full bg-[#f7f7d8] absolute top-[40px] right-[50px]">
    <img src="./dollar.png" className="h-6 w-6" alt="icon" />
  </div>
);

export default function Dashboard() {
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
                    ₹10,540
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

            {/* Tables */}
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <Card className="border-none">
                <CardHeader>
                  <CardTitle>Deposit Requests</CardTitle>
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
                  </Table>
                </CardContent>
              </Card>

              <Card className="border-none">
                <CardHeader>
                  <CardTitle>Wallet Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Category</TableHead>
                      </TableRow>
                    </TableHeader>
                  </Table>
                </CardContent>
              </Card>
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <Card className="border-none">
                <CardHeader>
                  <CardTitle>Withdrawal Requests</CardTitle>
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
                  </Table>
                </CardContent>
              </Card>

              <Card className="border-none">
                <CardHeader>
                  <CardTitle>Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Balance</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
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
