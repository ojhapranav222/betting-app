import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Landing from './components/Landing'
import UpcomingGames from './components/UpcomingGames'
import Deposit from './components/payments/Deposit'
import Main from './components/profile/Main'
import Password from './components/profile/Password'
import Transactions from './components/profile/Transactions'
import Dashboard from './components/admin/components/pages/Dashboard'
import User from './components/admin/components/pages/users/Users'
import EditUser from './components/admin/components/pages/users/EditUser'
import AddUsers from './components/admin/components/pages/users/AddUser'
import Report from './components/admin/components/pages/report/Report'
import Payments from './components/admin/components/pages/payments/Payments'
import Feedback from './components/admin/components/pages/feedback/Feedbacks'
import AddBank from './components/admin/components/pages/payments/AddBank'
import axios from 'axios'
import HelpDesk from './components/admin/components/pages/helpdesk/Helpdesk'
import Games from './components/admin/components/pages/games/Games'
import AddGame from './components/admin/components/pages/games/AddGame'

axios.defaults.withCredentials = true;

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/upcoming' element={<UpcomingGames />} />
        <Route path='/deposit' element={<Deposit />} />
        <Route path='/profile' element={<Main />} />
        <Route path='/change-password' element={<Password />} />
        <Route path='/transactions' element={<Transactions />} />
        <Route path='/admin' element={<Dashboard />} />
        <Route path='/admin/users' element={<User />} />
        <Route path='/admin/user/edit/:id' element={<EditUser />} />
        <Route path='/admin/user/add' element={<AddUsers />} />
        <Route path='/admin/reports' element={<Report />} />
        <Route path='/admin/payments' element={<Payments />} />
        <Route path='/admin/feedbacks' element={<Feedback />} />
        <Route path='/admin/bank/add' element={<AddBank />} />
        <Route path='/admin/helpdesk' element={<HelpDesk />} />
        <Route path='/admin/games' element={<Games />} />
        <Route path='/admin/games/add' element={<AddGame />} />
      </Routes>
    </Router>
  )
}

export default App
