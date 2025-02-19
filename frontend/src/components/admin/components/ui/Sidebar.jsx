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
import { BsBank2 } from "react-icons/bs";
import { MdOutlineSportsCricket } from "react-icons/md";
import {RxHamburgerMenu} from "react-icons/rx"
import useSmallScreen from '../../../ui/SmallScreen';

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
    const [wallet, setWallet] = useState(false)
    const [withdrawals, setWithdrawals] = useState(false)
    const [activeBank, setActiveBank] = useState(false)
    const isSmallScreen = useSmallScreen();
    const [isOpen, setIsOpen] = useState(false);
  return (
    <>
    {/* Hamburger Icon */}
    {isSmallScreen && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-50 p-2 bg-white shadow-lg rounded-full"
        >
          <RxHamburgerMenu size={24} />
        </button>
      )}
      <div
        className={`sm:bg-opacity-0 bg-white z-50 w-64 border-r px-3 py-4 fixed flex flex-col justify-between h-[calc(100vh-4rem)]
          ${isSmallScreen ? (isOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"} transition-all ease-in-out`}
        style={{ backgroundColor: "#f3f4f6" }}
      >
          <div className="space-y-1 bg flex flex-col">
            {!isSmallScreen && (<NavLink to="/admin/dashboard" className={({isActive}) =>
                {if (isActive) setActiveDashboard(true);}}>
                <Button
                variant="secondary"
                className={activeDashboard ? activeClass : inactiveClass}
                >
                <Home className="h-4 w-4" />
                Dashboard
                </Button>
            </NavLink>)}
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
            <NavLink to="/admin/wallet-transactions" className={({isActive}) => {if (isActive) setWallet(true);}}>
                <Button
                variant="secondary"
                className={wallet ? activeClass : inactiveClass}
                >
                <Wallet className="h-4 w-4" />
                Bonus/Fines
                </Button>
            </NavLink>
            <NavLink to="/admin/deposits" className={({isActive}) => {if (isActive) setActivePayments(true);}}>
                <Button
                variant="secondary"
                className={activePayments ? activeClass : inactiveClass}
                >
                <Wallet className="h-4 w-4" />
                Deposits
                </Button>
            </NavLink>
            <NavLink to="/admin/withdrawals" className={({isActive}) => {if (isActive) setWithdrawals(true);}}>
                <Button
                variant="secondary"
                className={withdrawals ? activeClass : inactiveClass}
                >
                <Wallet className="h-4 w-4" />
                Withdrawals
                </Button>
            </NavLink>
            <NavLink to="/admin/banks" className={({isActive}) => {if (isActive) setActiveBank(true);}}>
                <Button
                variant="secondary"
                className={activeBank ? activeClass : inactiveClass}
                >
                <BsBank2 className="h-4 w-4" />
                Accounts
                </Button>
            </NavLink>
            {!isSmallScreen && (<NavLink to="/admin/helpdesk" className={({isActive}) => {if (isActive) setActiveDisputes(true);}}>
                <Button
                variant="secondary"
                className={activeDisputes ? activeClass : inactiveClass}
                >
                <Users2 className="h-4 w-4" />
                User Help
                </Button>
            </NavLink>)}
          </div>
        </div>
    </>
  )
}

export default Sidebar