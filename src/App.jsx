import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/home'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path="/" element={<Home/>}/>
          <Route/>
          <Route/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
