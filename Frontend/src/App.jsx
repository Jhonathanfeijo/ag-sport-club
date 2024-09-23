import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserProvider } from './utils/userProvider'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import './index.css'

function App() {
  return (
    <div>
      <ToastContainer autoClose={3000} />
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="/" element={ <Home />} />
            <Route path="/home" element={<Home/>} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
