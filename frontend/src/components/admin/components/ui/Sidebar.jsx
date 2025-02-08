import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from "./button";
import {
    BarChart3,
    Home,
    Settings,
    Settings2,
    Star,
    Users2,
    Wallet,
  } from "lucide-react";
import { MdOutlineSportsCricket } from "react-icons/md";

function Sidebar() {
    const activeClass = "w-full justify-start gap-2 hover:text-gray-600 hover:bg-white bg-[#e0382a] text-white";
    const inactiveClass = "w-full justify-start gap-2 text-gray-600 hover:bg-gray-50";
    const [activeDashboard, setActiveDashboard] = useState(false)
    const [activeUsers, setActiveUsers] = useState(false)
    const [activeGames, setActiveGames] = useState(false)
    const [activeReports, setActiveReports] = useState(false)
    const [activePayments, setActivePayments] = useState(false)
    const [activeFeedbacks, setActiveFeedbacks] = useState(false)
    const [activeDisputes, setActiveDisputes] = useState(false)
  return (
    <div
          className="bg-opacity-0 w-64 border-r px-3 py-4 fixed flex flex-col justify-between h-[calc(100vh-4rem)]"
          style={{ backgroundColor: "#f3f4f6" }}
        >
          <div className="space-y-1 bg flex flex-col">
            <NavLink to="/admin" className={({isActive}) =>
                {if (isActive) setActiveDashboard(true);}}>
                <Button
                variant="secondary"
                className={activeDashboard ? activeClass : inactiveClass}
                >
                <Home className="h-4 w-4" />
                Dashboard
                </Button>
            </NavLink>
            <NavLink to="/admin/users" className={({isActive}) => {if (isActive) setActiveUsers(true);}}>
                <Button
                variant="secondary"
                className={activeUsers ? activeClass : inactiveClass}
                >
                <Users2 className="h-4 w-4" />
                Users
                </Button>
            </NavLink>
            <NavLink to="/admin/games" className={({isActive}) => {if (isActive) setActiveGames(true);}}>
                <Button
                variant="secondary"
                className={activeGames ? activeClass : inactiveClass}
                >
                <MdOutlineSportsCricket className="h-4 w-4" />
                Games
                </Button>
            </NavLink>
            <NavLink to="/admin/reports" className={({isActive}) => {if (isActive) setActiveReports(true);}}>                
            <Button
                variant="secondary"
                className={activeReports ? activeClass : inactiveClass}
                >
                <BarChart3 className="h-4 w-4" />
                Reports
                </Button>
            </NavLink>
            <NavLink to="/admin/payments" className={({isActive}) => {if (isActive) setActivePayments(true);}}>
                <Button
                variant="secondary"
                className={activePayments ? activeClass : inactiveClass}
                >
                <Wallet className="h-4 w-4" />
                Payments
                </Button>
            </NavLink>
            <NavLink to="/admin/feedbacks" className={({isActive}) => {if (isActive) setActiveFeedbacks(true);}}>
                <Button
                variant="secondary"
                className={activeFeedbacks ? activeClass : inactiveClass}
                >
                <Star className="h-4 w-4" />
                Feedback & Reviews
                </Button>
            </NavLink>
            <NavLink to="/admin/helpdesk" className={({isActive}) => {if (isActive) setActiveDisputes(true);}}>
                <Button
                variant="secondary"
                className={activeDisputes ? activeClass : inactiveClass}
                >
                <Users2 className="h-4 w-4" />
                User Help
                </Button>
            </NavLink>
          </div>
          <div className="mt-20 space-y-1">
            <div className="px-3 text-xs font-medium text-gray-500 ">
              Settings
            </div>
            <Button
              variant="ghost"
              className={inactiveClass}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>
            <Button
              variant="ghost"
              className={inactiveClass}
            >
              <Settings2 className="h-4 w-4" />
              Global Settings
            </Button>
          </div>
        </div>
  )
}

export default Sidebar