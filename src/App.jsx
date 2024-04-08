import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/home'
import Reserv from './pages/reserv'
import { UserProvider } from './utils/userProvider'
import Layout from './utils/layout'
import Register from './pages/register'


function App() {
  return (
    <div>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="/" element={<Layout children={<Home />} />} />
            <Route path="/home" element={<Layout children={<Home />} />} />
            <Route path="/reservas" element={<Layout children={<Reserv></Reserv>} />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
