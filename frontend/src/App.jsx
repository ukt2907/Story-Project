import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Nav from './components/navs/Nav'


const AppRoutes = () => (
  <BrowserRouter>
    <Approutes />
  </BrowserRouter>  
  );

  function Approutes(){ 
    return (
    <Routes>
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
  }

export default AppRoutes
