import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import Reserv from './pages/reserv'
import Sports from './pages/sports'
import Users from './pages/users'
import Layout from './utils/layout'
import { UserProvider } from './utils/userProvider'
import AdminConfig from './pages/admin'


function App() {
  return (
    <div>
      <BrowserRouter>
        <UserProvider>
          <ToastContainer autoClose={3000} />
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="/" element={<Layout children={<Home />} />} />
            <Route path="/home" element={<Layout children={<Home />} />} />
            <Route path="/reservas" element={<Layout children={<Reserv></Reserv>} />} />
            <Route path="/users" element={<Layout children={<Users></Users>} />} />
            <Route path="/sports" element={<Layout children={<Sports />} />} />
            <Route path="/config" element={<Layout children={<AdminConfig />} />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
